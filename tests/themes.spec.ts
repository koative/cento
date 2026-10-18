import { test, expect, type Page } from "@playwright/test";
import { readdirSync, readFileSync, existsSync } from "node:fs";

type Meta = { name: string; pages: { path: string; title: string }[] };
const themes = readdirSync("themes")
  .filter((slug) => existsSync(`themes/${slug}/cento.json`))
  .map((slug) => ({
    slug,
    meta: JSON.parse(readFileSync(`themes/${slug}/cento.json`, "utf8")) as Meta,
  }));

async function visit(page: Page, route: string) {
  await page.evaluate((hash) => (location.hash = hash), "#" + route);
  await page.waitForTimeout(150);
  return page.evaluate(() => ({
    identity: `${document.title} | ${document.querySelector("h1")?.textContent?.trim()}`,
    notFound: !!document.querySelector("[data-not-found]"),
    h1: document.querySelectorAll("h1").length,
    overflow: document.documentElement.scrollWidth - innerWidth,
    broken: [...document.images].filter(
      (i) => i.complete && i.naturalWidth === 0,
    ).length,
    dead: [...document.querySelectorAll("a")].filter((a) =>
      ["", "#"].includes(a.getAttribute("href") ?? ""),
    ).length,
    links: [...document.querySelectorAll('a[href^="#/"]')].map(
      (a) => a.getAttribute("href")!.slice(1).split("?")[0],
    ),
  }));
}

for (const { slug, meta } of themes) {
  test(`${slug}: every linked route renders its own page without errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`themes/${slug}/`);
    const queue = meta.pages.map((p) => p.path);
    const seen = new Set(queue);
    const identities = new Map<string, string>();
    for (let i = 0; i < queue.length; i++) {
      const route = queue[i];
      const r = await visit(page, route);
      expect.soft(r.notFound, `${route} renders the 404 page`).toBe(false);
      expect.soft(r.h1, `${route} <h1> count`).toBe(1);
      expect.soft(r.broken, `${route} broken images`).toBe(0);
      expect.soft(r.dead, `${route} links with an empty or "#" href`).toBe(0);
      expect
        .soft(
          identities.get(r.identity) ?? route,
          `${route} renders the same page as another route`,
        )
        .toBe(route);
      identities.set(r.identity, route);
      for (const next of r.links)
        if (!seen.has(next)) (seen.add(next), queue.push(next));
    }
    expect(errors).toEqual([]);
  });

  test(`${slug}: pages reflow at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`themes/${slug}/`);
    for (const { path } of meta.pages) {
      const r = await visit(page, path);
      expect
        .soft(r.overflow, `${path} horizontal overflow at 390px`)
        .toBeLessThanOrEqual(1);
    }
  });

  test(`${slug}: unknown routes fall back to the 404 page`, async ({
    page,
  }) => {
    await page.goto(`themes/${slug}/#/no-such-page-anywhere`);
    await expect(page.locator("[data-not-found]")).toBeVisible();
  });
}
