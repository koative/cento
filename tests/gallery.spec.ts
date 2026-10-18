import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync, existsSync } from "node:fs";

const catalog = readdirSync("themes")
  .filter((slug) => existsSync(`themes/${slug}/cento.json`))
  .map((slug) => ({
    slug,
    ...JSON.parse(readFileSync(`themes/${slug}/cento.json`, "utf8")),
  }))
  .sort((a, b) => a.number - b.number);
const cards = ".grid > li";

test("category chips and search filter the grid, with an empty state that recovers", async ({
  page,
}) => {
  await page.goto("./");
  await expect(page.locator(cards)).toHaveCount(catalog.length);
  const category = catalog[0].category;
  await page.locator(".chips .chip", { hasText: category }).click();
  await expect(page.locator(cards)).toHaveCount(
    catalog.filter((t) => t.category === category).length,
  );
  const search = page.locator(".bar").getByRole("searchbox");
  await search.fill("zzz-not-a-template");
  await expect(page.locator(cards)).toHaveCount(0);
  await page
    .locator(".empty")
    .getByRole("button", { name: /^Show all/ })
    .click();
  await expect(page.locator(cards)).toHaveCount(catalog.length);
  await expect(search).toHaveValue("");
  await expect(
    page.locator(".chips .chip", { hasText: "All" }).first(),
  ).toHaveAttribute("aria-pressed", "true");
});

test("the featured rail changes the featured template", async ({ page }) => {
  await page.goto("./");
  const rail = page.getByRole("group", { name: "Featured templates" });
  const buttons = rail.getByRole("button");
  const names = await rail.locator("span").allTextContents();
  await expect(page.locator(".feature-name")).toHaveText(names[0]);
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".feature-name")).toHaveText(names[1]);
});

test("saving persists across a reload and the Saved filter shows it", async ({
  page,
}) => {
  await page.goto("./");
  const first = page.locator(cards).first();
  const save = first.getByRole("button", { name: `Save ${catalog[0].name}` });
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await page
    .locator(".bar")
    .getByRole("button", { name: /^Saved/ })
    .click();
  await expect(page.locator(cards)).toHaveCount(1);
  await expect(page.locator(cards).first().locator("h3")).toHaveText(
    catalog[0].name,
  );
});

test("preview opens the live template and the Page select changes its route", async ({
  page,
}) => {
  const t = catalog[0];
  await page.goto("./");
  await page
    .locator(cards)
    .first()
    .getByRole("button", { name: `Preview ${t.name}` })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: t.name })).toBeVisible();
  const frame = page.frameLocator(`iframe[title="${t.name} live preview"]`);
  await expect(frame.locator("h1")).toBeVisible();
  const second = t.pages[1];
  await dialog.getByLabel("Page").selectOption(second.path);
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    new RegExp(`#${second.path}$`),
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("appearance follows the choice, persists, and System follows the OS", async ({
  page,
}) => {
  const appearance = page.getByRole("radiogroup", { name: "Appearance" });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await appearance.getByRole("radio", { name: "Dark" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await appearance.getByRole("radio", { name: "System" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the category rail reveals hidden categories with its scroll buttons", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await expect(
    page.getByRole("button", { name: "Show previous categories" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Show more categories" }).click();
  await expect(
    page.getByRole("button", { name: "Show previous categories" }),
  ).toBeVisible();
});

test("the mobile menu reaches every section and closes on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.getByRole("navigation", { name: "Menu" });
  await expect(menu.getByRole("link", { name: "How to use" })).toBeVisible();
  await expect(menu.getByRole("link", { name: /Docs/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
});
