"""Download Latin Google Fonts subsets next to each standalone theme."""
import re, pathlib, urllib.request, hashlib, json
ROOT=pathlib.Path(__file__).resolve().parents[1]
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
records=json.loads((ROOT/'scripts/font-sources.json').read_text()) if (ROOT/'scripts/font-sources.json').exists() else []
for p in [ROOT/'gallery/styles.css',*sorted((ROOT/'themes').glob('*/src/styles.css'))]:
    text=p.read_text()
    matches=list(re.finditer(r"@import url\(['\"](https://fonts.googleapis.com/[^'\"]+)['\"]\);",text))
    for m in matches:
        url=m.group(1)
        css=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':UA}),timeout=30).read().decode()
        blocks=re.findall(r'/\* latin \*/\s*(@font-face\s*\{.*?\})',css,re.S)
        if not blocks: blocks=re.findall(r'(@font-face\s*\{.*?\})',css,re.S)
        out=[];folder=p.parent/'assets/fonts';folder.mkdir(parents=True,exist_ok=True)
        for block in blocks:
            remote=re.search(r'url\((https://[^)]+)\)',block).group(1)
            family=re.search(r"font-family:\s*['\"]([^'\"]+)",block).group(1)
            name=re.sub(r'[^a-z0-9]+','-',family.lower())+'-'+hashlib.sha256(remote.encode()).hexdigest()[:8]+'.woff2'
            dest=folder/name
            if not dest.exists(): dest.write_bytes(urllib.request.urlopen(remote,timeout=30).read())
            out.append(block.replace(remote,'./assets/fonts/'+name))
            records.append({'family':family,'file':str(dest.relative_to(ROOT)),'source':remote})
        text=text.replace(m.group(0),'\n'.join(dict.fromkeys(out)))
        print(p.relative_to(ROOT),len(out),'font faces')
    p.write_text(text)
(ROOT/'scripts/font-sources.json').write_text(json.dumps(records,indent=2)+'\n')
