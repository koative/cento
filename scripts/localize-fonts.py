"""Bundle Latin Google Fonts subsets and their licenses in standalone themes."""

import hashlib
import json
from pathlib import Path
import re
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
SOURCES = ROOT / "scripts/font-sources.json"
records = json.loads(SOURCES.read_text()) if SOURCES.exists() else []


def download(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def bundle_license(family, directory):
    slug = re.sub(r"[^a-z0-9]", "", family.lower())
    # google/fonts keeps each family under its license: ofl/, apache/ (e.g. Roboto Slab) or ufl/.
    choices = [("ofl", "OFL.txt", "OFL"), ("apache", "LICENSE.txt", "LICENSE"), ("ufl", "UFL.txt", "UFL")]
    license_file = next(
        (ROOT / "licenses/fonts" / f"{slug}-{suffix}.txt" for _, _, suffix in choices
         if (ROOT / "licenses/fonts" / f"{slug}-{suffix}.txt").exists()),
        None,
    )
    for folder, name, suffix in choices if license_file is None else []:
        try:
            content = download(f"https://raw.githubusercontent.com/google/fonts/main/{folder}/{slug}/{name}").decode()
        except urllib.error.HTTPError:
            continue
        license_file = ROOT / "licenses/fonts" / f"{slug}-{suffix}.txt"
        license_file.parent.mkdir(parents=True, exist_ok=True)
        license_file.write_text("\n".join(line.rstrip() for line in content.splitlines()) + "\n")
        break
    if license_file is None:
        raise SystemExit(f"No license found in google/fonts for {family} ({slug})")
    (directory / license_file.name).write_text(license_file.read_text())


stylesheets = [ROOT / "gallery/styles.css", *sorted((ROOT / "themes").glob("*/src/styles.css"))]
for stylesheet in stylesheets:
    original = stylesheet.read_text()
    content = original
    imports = list(re.finditer(r"@import url\(['\"](https://fonts.googleapis.com/[^'\"]+)['\"]\);", content))
    for imported in imports:
        css = download(imported.group(1)).decode()
        blocks = re.findall(r"/\* latin \*/\s*(@font-face\s*\{.*?\})", css, re.S)
        if not blocks:
            blocks = re.findall(r"(@font-face\s*\{.*?\})", css, re.S)
        directory = stylesheet.parent / "assets/fonts"
        directory.mkdir(parents=True, exist_ok=True)
        faces = []
        for block in blocks:
            source = re.search(r"url\((https://[^)]+)\)", block).group(1)
            family = re.search(r"font-family:\s*['\"]([^'\"]+)", block).group(1)
            slug = re.sub(r"[^a-z0-9]+", "-", family.lower())
            suffix = hashlib.sha256(source.encode()).hexdigest()[:8]
            filename = f"{slug}-{suffix}.woff2"
            target = directory / filename
            if not target.exists():
                target.write_bytes(download(source))
            bundle_license(family, directory)
            faces.append(block.replace(source, f"./assets/fonts/{filename}"))
            records.append({"family": family, "file": str(target.relative_to(ROOT)), "source": source})
        content = content.replace(imported.group(0), "\n".join(dict.fromkeys(faces)))
        print(f"{stylesheet.relative_to(ROOT)}: {len(faces)} font faces")
    if content != original:
        stylesheet.write_text(content)

unique = {record["file"]: record for record in records if (ROOT / record["file"]).exists()}
known_files = {Path(record["file"]).name: record for record in records}
for font in (ROOT / "themes").glob("*/src/assets/fonts/*.woff2"):
    relative = str(font.relative_to(ROOT))
    if relative not in unique and font.name in known_files:
        unique[relative] = {**known_files[font.name], "file": relative}
SOURCES.write_text(json.dumps(list(unique.values()), indent=2) + "\n")
