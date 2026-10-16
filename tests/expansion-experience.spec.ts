import { test, expect } from "@playwright/test";
test("Equinox switches the sky and creates a local visit plan", async ({
  page,
}) => {
  await page.goto("themes/equinox/");
  await page.getByRole("tab", { name: "The Lyre" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("bright imagination");
  await page.getByLabel("Showtime").selectOption("21:00");
  await page.getByLabel("Visitors").selectOption("3");
  await expect(page.locator(".total")).toContainText("€54");
  await page.getByRole("button", { name: "Create a visit plan" }).click();
  await expect(page.getByRole("status")).toContainText("3 visitors at 21:00");
});
test("Atlas calculates a route, swaps endpoints and handles the same station", async ({
  page,
}) => {
  await page.goto("themes/atlas/");
  await page.getByRole("button", { name: "Find my route" }).click();
  await expect(page.getByRole("status")).toContainText("19 min");
  await expect(page.getByRole("status").locator("li")).toHaveCount(5);
  await page.getByRole("button", { name: "Swap stations" }).click();
  await expect(page.getByLabel("From station")).toHaveValue("4");
  await page.getByLabel("To station").selectOption("4");
  await page.getByRole("button", { name: "Find my route" }).click();
  await expect(page.getByRole("status")).toContainText("You're already here");
  await page.getByRole("button", { name: "Departures", exact: true }).click();
  await expect(page.locator(".departures")).toContainText("Harbor");
});
test("Commons connects floorplan selection to day-pass pricing", async ({
  page,
}) => {
  await page.goto("themes/commons/");
  await page.getByRole("tab", { name: /The Garden/ }).click();
  await page.getByRole("button", { name: "Add a day" }).click();
  await expect(page.locator(".price")).toContainText("€50");
  await page.getByRole("button", { name: "Plan my workday" }).click();
  await expect(page.locator(".confirmed")).toContainText(
    "2 days in The Garden",
  );
  await page.getByLabel("Your space").selectOption("1");
  await expect(page.locator(".price")).toContainText("€44");
  await expect(page.locator(".confirmed")).toHaveCount(0);
});
test("Gavel updates only the selected lot and keeps a local watchlist", async ({
  page,
}) => {
  await page.goto("themes/gavel/");
  await page.getByRole("button", { name: "Add to watchlist" }).click();
  await expect(page.locator(".watch-count")).toContainText("1");
  await page.getByRole("button", { name: "Raise bid" }).click();
  await page.getByRole("button", { name: "Place a demo bid" }).click();
  await expect(page.getByRole("status")).toContainText("€285");
  await expect(page.locator(".current")).toContainText("€285");
  await page.getByRole("tab", { name: /015/ }).click();
  await expect(page.locator(".current")).toContainText("€130");
  await page.getByRole("tab", { name: /014/ }).click();
  await expect(page.locator(".current")).toContainText("€285");
  await expect(
    page.getByRole("button", { name: "Remove from watchlist" }),
  ).toHaveAttribute("aria-pressed", "true");
});
