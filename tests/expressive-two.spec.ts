import { test, expect } from "@playwright/test";

test("Velo configures the frame and saves the chosen build", async ({
  page,
}) => {
  await page.goto("themes/velo/");
  await page.getByRole("button", { name: "All-road", exact: true }).click();
  await page.getByRole("button", { name: "Forest", exact: true }).click();
  await page.getByRole("button", { name: "L", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "Forest all-road bicycle geometry preview" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Save this build" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "All-road · Forest · L saved for this visit.",
  );
  await page.getByRole("button", { name: "The considered details" }).click();
  await expect(page.locator("#spec-panel")).toContainText("45 mm");
  await page.getByRole("button", { name: "Road", exact: true }).click();
  await expect(page.locator("#spec-panel")).toContainText("32 mm");
  await expect(page.getByRole("status")).toContainText("No purchase");
});

test("Prism filters its agenda and calculates ticket totals", async ({
  page,
}) => {
  await page.goto("themes/prism/");
  await page.getByRole("tab", { name: "Saturday, May 15" }).click();
  await page.getByLabel("Program track").selectOption("Making");
  await expect(page.getByRole("tabpanel").locator("article")).toHaveCount(2);
  await expect(page.getByRole("tabpanel")).toContainText(
    "Building with happy accidents",
  );
  await expect(page.getByRole("tabpanel")).not.toContainText("Small studios");
  await page.getByLabel("Ticket type").selectOption("Friday only");
  await expect(
    page.getByRole("button", { name: "Remove one ticket" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Add one ticket" }).click();
  await expect(page.locator(".ticket-total")).toContainText("€190");
  await page.getByRole("button", { name: "Choose this experience" }).click();
  await expect(page.locator(".ticket-status")).toContainText(
    "2 friday only passes selected",
  );
});

test("Nocturne selects records, simulates playback, and requests a demo table", async ({
  page,
}) => {
  await page.goto("themes/nocturne/");
  await page.getByRole("button", { name: "Select Soft corners" }).click();
  await expect(page.locator(".now-playing")).toContainText("Yuna Quartet");
  await page.getByRole("button", { name: "Play simulation" }).click();
  await expect(page.locator(".vinyl")).toHaveClass(/spinning/);
  await page.getByRole("button", { name: "Pause simulation" }).click();
  await expect(page.locator(".vinyl")).not.toHaveClass(/spinning/);
  await page.getByRole("button", { name: "Next record" }).click();
  await expect(page.locator(".now-playing")).toContainText("Between stations");
  await page.getByLabel("Your name").fill("Alex");
  await page.getByLabel("Your evening").fill("2027-05-14");
  await page.getByLabel("Number of guests").selectOption("3");
  await page.getByLabel("Arrival time").selectOption("20:00");
  await page.getByRole("button", { name: "Request a little space" }).click();
  await expect(page.locator(".request-status")).toContainText(
    "Alex, your table for 3 on 2027-05-14 at 20:00 is selected.",
  );
  await expect(page.locator(".request-status")).toContainText(
    "no request was sent",
  );
});

test("Arcade supports keyboard play, matches pairs, and resets the random board", async ({
  page,
}) => {
  await page.goto("themes/arcade/");
  const cards = page.locator(".game-card");
  const symbols = await cards.evaluateAll((elements) =>
    elements.map((el) => el.getAttribute("data-symbol")),
  );
  const firstMatch = symbols.findIndex(
    (value, index) => index > 0 && value === symbols[0],
  );
  await cards.nth(0).focus();
  await page.keyboard.press("Enter");
  await expect(cards.nth(0)).toHaveAttribute("aria-pressed", "true");
  await cards.nth(firstMatch).click();
  await expect(page.locator(".game-card.matched")).toHaveCount(2);
  await expect(page.locator(".game-stats")).toContainText("1/6");
  await page.getByRole("button", { name: "Start over" }).click();
  await expect(page.locator(".game-card.matched")).toHaveCount(0);
  await expect(page.locator(".game-card.revealed")).toHaveCount(0);
  await expect(page.locator(".game-stats")).toContainText("00");
  const reshuffled = await cards.evaluateAll((elements) =>
    elements.map((el) => el.getAttribute("data-symbol")),
  );
  const different = reshuffled.findIndex((value) => value !== reshuffled[0]);
  await cards.nth(0).click();
  await cards.nth(different).click();
  await expect(page.getByRole("status").first()).toContainText("Not quite");
  await expect(page.locator(".game-card.revealed")).toHaveCount(0);
  await page.getByRole("button", { name: "Read the concept" }).first().click();
  await expect(
    page.getByText(/Plan a route between tiny planets/),
  ).toBeVisible();
});
