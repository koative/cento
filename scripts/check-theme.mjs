// Crawl every page of one or more themes on a running dev server, report defects and save screenshots.
// Usage: bun scripts/check-theme.mjs <slug...> [--no-shots]   (CENTO_URL defaults to http://localhost:5173/)
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";

const base = process.env.CENTO_URL ?? "http://localhost:5173/";
const args = process.argv.slice(2);
const shots = !args.includes("--no-shots");
const slugs = args.filter((a) => !a.startsWith("--"));
const browser = await chromium.launch();
let failed = false;

for (const slug of slugs) {
  const meta = JSON.parse(readFileSync(`themes/${slug}/cento.json`, "utf8"));
  const queue = meta.pages.map((p) => p.path);
  const seen = new Set(queue);
  const problems = [];
  if (shots) mkdirSync(`.qa/${slug}`, { recursive: true });

  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on(
      "response",
      (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`),
    );
    await page.goto(`${base}themes/${slug}/`, { waitUntil: "networkidle" });

    const pageByRoute = new Map(); // "title | h1" → first route that rendered it
    for (let i = 0; i < queue.length; i++) {
      const route = queue[i];
      errors.length = 0;
      await page.evaluate((r) => (location.hash = r), "#" + route);
      await page.waitForTimeout(300);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map(
            (img) => ((img.loading = "eager"), img.decode().catch(() => {})),
          ),
        );
      });
      const r = await page.evaluate(() => ({
        identity: `${document.title} | ${document.querySelector("h1")?.textContent?.trim()}`,
        notFound: !!document.querySelector("[data-not-found]"),
        h1: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth - innerWidth,
        broken: [...document.images]
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
        deadHrefs: [...document.querySelectorAll("a")].filter((a) =>
          ["", "#"].includes(a.getAttribute("href") ?? ""),
        ).length,
        routes: [...document.querySelectorAll('a[href^="#/"]')].map(
          (a) => a.getAttribute("href").slice(1).split("?")[0],
        ),
        height: document.documentElement.scrollHeight,
      }));
      const tag = `${route} @${width}`;
      const same = pageByRoute.get(r.identity);
      if (same && same !== route)
        problems.push(
          `${tag}: renders the same page as ${same} (${r.identity}) — routing broken or titles not unique`,
        );
      else pageByRoute.set(r.identity, route);
      if (r.notFound)
        problems.push(
          `${tag}: renders the 404 page (linked from somewhere or listed in cento.json)`,
        );
      if (r.h1 !== 1) problems.push(`${tag}: ${r.h1} <h1> elements`);
      if (r.overflow > 1)
        problems.push(`${tag}: horizontal overflow ${r.overflow}px`);
      if (r.broken.length)
        problems.push(`${tag}: broken images ${r.broken.join(", ")}`);
      if (r.deadHrefs)
        problems.push(`${tag}: ${r.deadHrefs} links with empty or "#" href`);
      if (errors.length)
        problems.push(`${tag}: ${[...new Set(errors)].join(" | ")}`);
      for (const next of r.routes)
        if (!seen.has(next)) (seen.add(next), queue.push(next));
      if (shots) {
        const name =
          route === "/" ? "home" : route.slice(1).replaceAll("/", "_");
        await page.screenshot({
          path: `.qa/${slug}/${name}-${width}.png`,
          fullPage: true,
        });
      }
    }
    await page.close();
  }
  const routes = [...seen];
  console.log(
    `\n${slug}: ${routes.length} routes crawled${shots ? `, screenshots in .qa/${slug}/` : ""}`,
  );
  if (problems.length) {
    failed = true;
    for (const p of problems) console.log("  ✗ " + p);
  } else console.log("  ✓ no defects found");
}
await browser.close();
process.exit(failed ? 1 : 0);
