import { chromium } from "@playwright/test";
import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
const browser = await chromium.launch({ headless: true });
const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync("themes");
mkdirSync(".qa", { recursive: true });
const report = [];
for (const slug of slugs) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const errors = [];
  const failedAssets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().endsWith("favicon.ico"))
      failedAssets.push({ url: response.url(), status: response.status() });
  });
  await page.goto(`http://localhost:5173/elseform/themes/${slug}/`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll(async (imgs) => {
    await Promise.all(
      imgs.map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => undefined);
      }),
    );
  });
  await page.screenshot({ path: `.qa/${slug}-desktop.png`, fullPage: true });
  await page.screenshot({ path: `.qa/${slug}-preview.png` });
  const desktop = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    brokenImages: [...document.images]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.src),
    title: document.title,
    h1: document.querySelector("h1")?.textContent,
  }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `.qa/${slug}-mobile.png`, fullPage: true });
  const mobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    width: document.documentElement.scrollWidth,
    culprits: [...document.querySelectorAll("body *")]
      .filter(
        (e) =>
          e.getBoundingClientRect().right > innerWidth + 3 &&
          getComputedStyle(e).position !== "absolute" &&
          getComputedStyle(e).position !== "fixed",
      )
      .slice(0, 6)
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        right: e.getBoundingClientRect().right,
      })),
  }));
  report.push({ slug, desktop, mobile, errors, failedAssets });
  await page.close();
}
writeFileSync(".qa/report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
