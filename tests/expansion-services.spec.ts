import { test, expect } from "@playwright/test";

test("Solace prepares the selected appointment without booking", async ({
  page,
}) => {
  await page.goto("themes/solace/");
  await page.getByLabel("What brings you in?").selectOption("Follow-up visit");
  await page.getByRole("button", { name: "Tuesday 20 Oct" }).click();
  await page.getByRole("button", { name: "14:30", exact: true }).click();
  await page.getByRole("button", { name: "Preview my visit" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Follow-up visit · Tuesday, 20 Oct at 14:30",
  );
  await expect(page.getByRole("status")).toContainText(
    "No appointment was booked",
  );
});

test("Counsel changes practice content and creates a local enquiry brief", async ({
  page,
}) => {
  await page.goto("themes/counsel/");
  await page
    .getByRole("button", { name: "Property & place", exact: true })
    .click();
  await expect(page.locator(".practice-detail")).toContainText(
    "Property transactions",
  );
  await page.getByLabel("Your name").fill("Alex Demo");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Brief prepared for Alex Demo: Property & place",
  );
});

test("Meridian saves, filters and prepares a property viewing", async ({
  page,
}) => {
  await page.goto("themes/meridian/");
  await page
    .getByLabel("Neighborhood", { exact: true })
    .selectOption("Old Town");
  await expect(page.locator(".listing article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Save A loft above the city", exact: true })
    .click();
  await page.getByRole("button", { name: "Saved (1)", exact: true }).click();
  await expect(page.locator(".listing article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Plan a viewing", exact: true })
    .click();
  await page.getByRole("button", { name: "Preview viewing request" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Viewing request prepared for A loft above the city",
  );
});

test("Campus records lesson progress and keeps separate lesson notes", async ({
  page,
}) => {
  await page.goto("themes/campus/");
  await page
    .getByLabel("Lesson notes")
    .fill("Observe the object before drawing it.");
  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Note saved for “Notice the ordinary”",
  );
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.locator(".progress")).toContainText(
    "1 of 4 lessons complete",
  );
  await page.getByRole("button", { name: "Next lesson" }).click();
  await expect(page.getByLabel("Lesson notes")).toHaveValue("");
  await page.getByRole("button", { name: "Notice the ordinary" }).click();
  await expect(page.getByLabel("Lesson notes")).toHaveValue(
    "Observe the object before drawing it.",
  );
});

test("Civic searches services and records a local issue report", async ({
  page,
}) => {
  await page.goto("themes/civic/");
  await page.getByLabel("Search town services").fill("recycling");
  await expect(page.locator(".service-list article")).toHaveCount(1);
  await page.getByRole("button", { name: "Bins & recycling" }).click();
  await expect(page.locator(".service-detail")).toBeVisible();
  await page.getByLabel("Location", { exact: true }).fill("Demo Lane");
  await page.getByRole("button", { name: "Create demo report" }).click();
  await expect(page.getByRole("status")).toContainText(
    "CW-1042 created for Demo Lane",
  );
});

test("Vow updates celebration style and builds a personal brief", async ({
  page,
}) => {
  await page.goto("themes/vow/");
  await page.getByRole("button", { name: "City celebration" }).click();
  await page.getByLabel("Your names").fill("Alex & Jamie");
  await page.getByLabel("Guest count").press("End");
  await page.getByRole("button", { name: "Create our brief" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Alex & Jamie: city celebration for 180 guests",
  );
});

test("Kindred filters cats and prepares a fictional meeting", async ({
  page,
}) => {
  await page.goto("themes/kindred/");
  await page.getByRole("button", { name: "Cats", exact: true }).click();
  await expect(page.locator(".pet-grid article")).toHaveCount(1);
  await page.getByRole("button", { name: "Get to know Clover" }).click();
  await expect(page.locator(".pet-about")).toContainText("curious cat");
  await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.getByRole("button", { name: "Prepare a hello" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your demo hello for Clover is ready",
  );
});

test("Odyssey combines activities across days and updates packing", async ({
  page,
}) => {
  await page.goto("themes/odyssey/");
  await page
    .getByRole("button", {
      name: "Add A slow morning in the old town",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Day 2" }).click();
  await page
    .getByRole("button", {
      name: "Add Coastal path to the lighthouse",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Save this itinerary" }).click();
  await expect(page.getByRole("status")).toContainText("2-stop demo itinerary");
  await page.getByLabel("A reusable water bottle").check();
  await expect(page.locator(".packed-count")).toHaveText("1 of 4 ready to go");
});

test("Lumen preserves a configured frame in the demo bag", async ({ page }) => {
  await page.goto("themes/lumen/");
  await page.getByRole("button", { name: "Clay frame", exact: true }).click();
  await page.getByRole("button", { name: "Large", exact: true }).click();
  await page.getByLabel("Lens tint").selectOption("Amber");
  await page.getByRole("button", { name: "Add to demo bag" }).click();
  await page.getByRole("button", { name: "Ocean frame", exact: true }).click();
  await expect(page.locator(".bag")).toContainText("Clay, Large, Amber");
  await expect(page.getByRole("status")).toContainText(
    "1 frame in your demo bag",
  );
  await page.getByRole("button", { name: "Clear demo bag" }).click();
  await expect(page.locator(".bag")).toContainText("Your demo bag is empty");
});

test("Heirloom previews selected metal, ring size and engraving", async ({
  page,
}) => {
  await page.goto("themes/heirloom/");
  await page.getByRole("button", { name: "Soft silver", exact: true }).click();
  await page.getByLabel("Ring size").selectOption("8");
  await page.getByLabel("Personal inscription").fill("our story");
  await expect(page.locator(".engraving-plate")).toHaveText("our story");
  await page.getByRole("button", { name: "Preview your piece" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Soft silver, size 8, engraved “our story”",
  );
  await expect(page.locator(".price")).toContainText("$260");
});

test("Saffron calculates quantities, category filters and pickup summary", async ({
  page,
}) => {
  await page.goto("themes/saffron/");
  await page
    .getByRole("button", { name: "Add Heirloom tomatoes", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add Heirloom tomatoes", exact: true })
    .click();
  await page.getByRole("button", { name: "Bakery", exact: true }).click();
  await expect(page.locator(".produce-list article")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Add Sourdough loaf", exact: true })
    .click();
  await expect(page.locator(".total")).toContainText("$15.00");
  await page.getByLabel("Pickup window").selectOption("Sunday · 10:00–12:00");
  await page.getByRole("button", { name: "Preview my basket" }).click();
  await expect(page.locator(".basket-status")).toContainText(
    "3 items · $15.00 · Sunday",
  );
});

test("Nest changes its age-based schedule and prepares a visit", async ({
  page,
}) => {
  await page.goto("themes/nest/");
  await page.getByRole("button", { name: "Big wonderers" }).click();
  await expect(page.locator(".timetable")).toContainText("Morning circle");
  await expect(page.locator(".timetable")).not.toContainText("A gentle hello");
  await page.getByLabel("Your name", { exact: true }).fill("Alex Demo");
  await page.getByLabel("Preferred visit").selectOption("Friday morning");
  await page.getByRole("button", { name: "Preview our visit" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Alex Demo. Your demo visit: Big wonderers, friday morning",
  );
});
