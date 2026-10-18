// Capture the first viewport of each template into public/previews/<slug>.webp (1200×750),
// then tile every preview into public/previews/collection.webp for the README.
// Usage: bun scripts/capture-previews.mjs [slug...]   (CENTO_URL defaults to http://localhost:5180/cento/)
import { chromium } from "@playwright/test";
import {
  existsSync,
  readdirSync,
  readFileSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { execFileSync } from "node:child_process";

const base = process.env.CENTO_URL ?? "http://localhost:5180/cento/";
const all = readdirSync("themes").filter((s) =>
  existsSync(`themes/${s}/cento.json`),
);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : all;
const tmp = ".qa/previews";
mkdirSync(tmp, { recursive: true });
mkdirSync("public/previews", { recursive: true });

const browser = await chromium.launch();
const queue = [...slugs];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    for (let slug = queue.shift(); slug; slug = queue.shift()) {
      await page.goto(`${base}themes/${slug}/`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map(
            (i) => ((i.loading = "eager"), i.decode().catch(() => {})),
          ),
        );
      });
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${tmp}/${slug}.png` });
      console.log("captured", slug);
    }
    await page.close();
  }),
);
await browser.close();

// Contact sheet: 10 columns of 320×200 thumbnails in collection order.
const ordered = all
  .filter((s) => slugs.includes(s) || existsSync(`public/previews/${s}.webp`))
  .map((s) => ({
    s,
    n: JSON.parse(readFileSync(`themes/${s}/cento.json`, "utf8")).number,
  }))
  .sort((a, b) => a.n - b.n)
  .map(({ s }) => s);
// ffmpeg builds here lack a WebP encoder; Pillow (python3) has one.
execFileSync(
  "python3",
  [
    "-c",
    `
import sys
from pathlib import Path
from PIL import Image
tmp, *order = sys.argv[1:]
for png in Path(tmp).glob("*.png"):
    im = Image.open(png).convert("RGB")
    im.thumbnail((1200, 1200), Image.LANCZOS)
    im.save(f"public/previews/{png.stem}.webp", "WEBP", quality=82, method=6)
cols, w, h, gap = 10, 320, 200, 8
rows = -(-len(order) // cols)
sheet = Image.new("RGB", (cols * (w + gap) - gap, rows * (h + gap) - gap), "#e4e8ec")
for i, slug in enumerate(order):
    thumb = Image.open(f"public/previews/{slug}.webp").convert("RGB").resize((w, h), Image.LANCZOS)
    sheet.paste(thumb, ((i % cols) * (w + gap), (i // cols) * (h + gap)))
sheet.save("public/previews/collection.webp", "WEBP", quality=80, method=6)
`,
    tmp,
    ...ordered,
  ],
  { stdio: "inherit" },
);
rmSync(tmp, { recursive: true });
console.log(`previews written; contact sheet of ${ordered.length} templates`);
