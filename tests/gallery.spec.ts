import { test, expect } from "@playwright/test";
const slugs = [
  "forma",
  "muse",
  "ember",
  "haven",
  "pulse",
  "orbit",
  "atelier",
  "terrain",
  "ledger",
  "signal",
  "still",
  "roast",
];
for (const slug of slugs) {
  test(`${slug}: static deployment and responsive layout`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`themes/${slug}/`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("body")).toContainText(/fictional|demo|concept/i);
    await page.setViewportSize({ width: 390, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
    const broken = await page
      .locator("img")
      .evaluateAll(
        (imgs) =>
          imgs.filter(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth === 0,
          ).length,
      );
    expect(broken).toBe(0);
  });
}
test("gallery filters, empty state, preview and device controls", async ({
  page,
}) => {
  await page.goto("./");
  await expect(page.locator(".template-entry")).toHaveCount(12);
  await page.getByRole("button", { name: "Technology", exact: true }).click();
  await expect(page.locator(".template-entry")).toHaveCount(3);
  await page.getByRole("searchbox").fill("not-a-template");
  await expect(page.getByText("No match, yet.")).toBeVisible();
  await page.getByRole("button", { name: "Show all templates" }).click();
  await expect(page.locator(".template-entry")).toHaveCount(12);
  await page
    .getByRole("button", { name: "Preview Orbit", exact: true })
    .click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.getByRole("button", { name: "mobile preview" }).click();
  await expect(page.locator(".preview-canvas")).toHaveClass(/mobile/);
  await expect(
    page.frameLocator("iframe").getByRole("heading", { level: 1 }),
  ).toContainText("perspective");
  await page.getByRole("button", { name: "Close preview" }).click();
  await expect(page.locator("dialog")).not.toBeVisible();
});
test("Orbit mission and motion controls", async ({ page }) => {
  await page.goto("themes/orbit/");
  await page.getByRole("tab", { name: /Lumen/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("1,200");
  await page.getByRole("button", { name: "Pause orbit animation" }).click();
  await expect(
    page.getByRole("button", { name: "Play orbit animation" }),
  ).toBeVisible();
});
test("Ledger local card controls", async ({ page }) => {
  await page.goto("themes/ledger/");
  await page.getByRole("button", { name: "Freeze card", exact: true }).click();
  await expect(page.getByText("Your card is paused")).toBeVisible();
  await page.getByRole("button", { name: "Unfreeze", exact: true }).click();
  await expect(page.getByText("Your everyday card")).toBeVisible();
});
test("Signal search and downloadable CSV", async ({ page }) => {
  await page.goto("themes/signal/");
  await page.getByRole("textbox", { name: "Search pages" }).fill("contact");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download CSV" }).click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toMatch(/signal-pages/);
  await page.getByLabel("Reporting period").selectOption("7 days");
  await expect(page.getByText("6,961", { exact: true })).toBeVisible();
});
