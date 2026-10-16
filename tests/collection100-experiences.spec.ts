import { test, expect } from "@playwright/test";
const open = async (page: any, slug: string) => {
  await page.goto(`themes/${slug}/index.html`);
};
test("Aurora updates cabin price and saves a stay", async ({ page }) => {
  await open(page, "aurora");
  await page.getByRole("button", { name: "The Pine House" }).click();
  await page.getByRole("button", { name: "More nights" }).click();
  await expect(
    page.getByRole("button", { name: "Plan this stay · €1360" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Plan this stay · €1360" }).click();
  await expect(page.getByText("4 nights in The Pine House.")).toBeVisible();
});
test("Reel filters films and operates visual screening", async ({ page }) => {
  await open(page, "reel");
  await page.getByRole("button", { name: "People", exact: true }).click();
  await expect(page.locator(".film-row")).toHaveCount(2);
  await page.getByRole("button", { name: /Between buildings/ }).click();
  await page.getByRole("button", { name: "Start visual screening" }).click();
  await expect(
    page.getByRole("button", { name: "Pause visual screening" }),
  ).toBeVisible();
  await expect(page.locator(".screen h2")).toHaveText("Between buildings");
});
test("Botanica selects a trail and saves its duration", async ({ page }) => {
  await open(page, "botanica");
  await page.getByRole("button", { name: /The wild meadow/ }).click();
  await page.getByRole("button", { name: "Add this walk to my day" }).click();
  await expect(
    page.getByText("Your 60 minutes walk is saved for this visit."),
  ).toBeVisible();
  await expect(page.getByText("Centaurea cyanus")).toBeVisible();
});
test("Cove updates route, crew and local voyage total", async ({ page }) => {
  await open(page, "cove");
  await page.getByRole("button", { name: /The blue escape/ }).click();
  await page.getByLabel("Your crew").selectOption("4");
  await page.getByRole("button", { name: "Build my voyage" }).click();
  await expect(
    page.getByText("3 days for 4 guests. Illustrative total €5000."),
  ).toBeVisible();
  await expect(page.getByText("Spetses", { exact: true })).toBeVisible();
});
test("Fable filters family programme and builds a day", async ({ page }) => {
  await open(page, "fable");
  await page.getByRole("button", { name: "7–11", exact: true }).click();
  await expect(page.locator(".session")).toHaveCount(2);
  await page
    .locator(".session")
    .first()
    .getByRole("button", { name: "Add to our day" })
    .click();
  await expect(page.locator(".day-plan")).toContainText(
    "Build a better moon base",
  );
  await page.getByRole("button", { name: "More visitors" }).click();
  await expect(page.locator(".total")).toContainText("£36");
});
test("Cadence House controls console and session estimate", async ({
  page,
}) => {
  await open(page, "cadencehouse");
  await page.getByRole("button", { name: "Console on" }).click();
  await expect(page.locator(".console")).toHaveClass(/off/);
  await page
    .getByRole("button", { name: "The writing room", exact: true })
    .click();
  await page.getByRole("button", { name: "Longer session" }).click();
  await expect(page.locator(".price")).toContainText("€330");
  await page.getByRole("button", { name: "Plan a session" }).click();
  await expect(page.getByText(/6 hours in the writing room/)).toBeVisible();
});
test("Pour builds and removes a wine case", async ({ page }) => {
  await open(page, "pour");
  await page.getByRole("button", { name: "Add Cloud Study to case" }).click();
  await page.getByRole("button", { name: "Add Soft Landing to case" }).click();
  await expect(page.locator(".case-total")).toContainText("€52");
  await page.getByRole("button", { name: "Remove one Cloud Study" }).click();
  await expect(page.locator(".case-total")).toContainText("€28");
  await page.getByRole("button", { name: "Orange", exact: true }).click();
  await expect(page.locator(".wine")).toHaveCount(1);
});
test("Ascent selects a course and preferred season", async ({ page }) => {
  await open(page, "ascent");
  await page.getByRole("button", { name: /Learn to fly/ }).click();
  await page.getByLabel("When are you thinking?").selectOption("September");
  await page.getByRole("button", { name: "Plan my flight" }).click();
  await expect(
    page.getByText(
      "Learn to fly in September. A sample adventure, not a confirmed flight.",
    ),
  ).toBeVisible();
  await expect(page.locator(".price")).toContainText("€690");
});
test("Emberlight selects scent, quantity and candle state", async ({
  page,
}) => {
  await open(page, "emberlight");
  await page.getByRole("button", { name: "Extinguish the candle" }).click();
  await expect(
    page.getByRole("button", { name: "Light the candle" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /The last light/ }).click();
  await page.getByRole("button", { name: "More candles" }).click();
  await page.getByRole("button", { name: "Add to my ritual · €64" }).click();
  await expect(
    page.getByText("2 × The last light. Saved locally for this visit."),
  ).toBeVisible();
});
test("Sanctuary explores animal stories and volunteering", async ({ page }) => {
  await open(page, "sanctuary");
  await page.getByRole("button", { name: /Ash Tawny owl/ }).click();
  await expect(page.getByText("Flight rehabilitation")).toBeVisible();
  await page
    .getByLabel("A day that sounds like you")
    .selectOption("Garden & grounds");
  await page.getByRole("button", { name: "Add to my volunteer plan" }).click();
  await expect(
    page.getByText(
      "Garden & grounds is in your sample plan. No application has been sent.",
    ),
  ).toBeVisible();
});
test("Kinetic switches care pathway and visit preference", async ({ page }) => {
  await open(page, "kinetic");
  await page
    .getByRole("button", { name: "Back to sport", exact: true })
    .click();
  await expect(page.getByText("Plan a gradual return")).toBeVisible();
  await page.getByLabel("What suits your day?").selectOption("Evening");
  await page.getByRole("button", { name: "Plan my first visit" }).click();
  await expect(
    page.getByText(
      "Sport & performance · evening preference. Saved locally; no appointment booked.",
    ),
  ).toBeVisible();
});
test("Horizon filters, reads and saves an article", async ({ page }) => {
  await open(page, "horizon");
  await page.getByRole("button", { name: "Space", exact: true }).click();
  await expect(page.locator(".story-list article")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "What do we mean by empty space?",
      exact: true,
    })
    .click();
  await expect(page.locator(".reader")).toContainText("what remains");
  await page.getByRole("button", { name: "Save for later" }).click();
  await expect(page.locator(".reading")).toContainText(
    "What do we mean by empty space?",
  );
  await page
    .getByRole("button", {
      name: "Remove saved What do we mean by empty space?",
    })
    .click();
  await expect(page.locator(".reading")).toContainText(
    "Your collection will be here",
  );
});
