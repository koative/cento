import { test, expect } from "@playwright/test";

test("Aperture changes the film and calculates a ticket preview", async ({
  page,
}) => {
  await page.goto("./themes/aperture/");
  await page
    .getByRole("button", { name: /Saturday 17 October A place to disappear/ })
    .click();
  await page.getByRole("button", { name: "Add ticket", exact: true }).click();
  await page.getByRole("button", { name: "Preview tickets · £24" }).click();
  await expect(page.locator(".ticket-strip .status")).toContainText(
    "2 seats for A place to disappear at 18:15 — £24",
  );
});
test("Tempo filters class styles and selects a class", async ({ page }) => {
  await page.goto("./themes/tempo/");
  await page.getByRole("button", { name: "Contemporary", exact: true }).click();
  await expect(page.locator(".class-list article")).toHaveCount(2);
  await page.getByRole("button", { name: "Choose Contemporary flow" }).click();
  await expect(page.locator(".timetable .status")).toContainText(
    "Contemporary flow is on your plan",
  );
});
test("Summit filters routes and records a completed climb", async ({
  page,
}) => {
  await page.goto("./themes/summit/");
  await page.getByRole("button", { name: "V3", exact: true }).click();
  await expect(page.locator(".routes>button")).toHaveCount(1);
  await page.getByRole("button", { name: "Mark as climbed" }).click();
  await expect(page.locator(".route-detail .status")).toHaveText(
    "1 of 3 demo routes completed",
  );
  await page.getByRole("button", { name: "Remove from tick list" }).click();
  await expect(page.locator(".route-detail .status")).toHaveText(
    "0 of 3 demo routes completed",
  );
});
test("Chapter opens episode notes and manages a listening list", async ({
  page,
}) => {
  await page.goto("./themes/chapter/");
  await page.getByRole("button", { name: "Read episode notes" }).click();
  await expect(page.locator(".notes")).toContainText(
    "Lena talks about keeping a notebook",
  );
  await page
    .getByRole("button", { name: "Save A room of our making", exact: true })
    .click();
  await expect(page.locator(".listening-list .status")).toContainText(
    "1 episode saved",
  );
  await page.locator(".queued").getByRole("button", { name: "Remove" }).click();
  await expect(page.locator(".listening-list .status")).toHaveText(
    "Your list is quiet for now.",
  );
});
test("Ink filters flash and prepares a placement brief", async ({ page }) => {
  await page.goto("./themes/ink/");
  await page.getByRole("button", { name: "Linework", exact: true }).click();
  await expect(page.locator(".flash")).toHaveCount(2);
  await page.getByRole("button", { name: /STUDY \/ 02 Undertow/ }).click();
  await page.getByLabel("Placement").selectOption("Ankle");
  await page
    .getByRole("button", { name: "Preview consultation brief" })
    .click();
  await expect(page.locator(".consultation .status")).toContainText(
    "Undertow on your ankle",
  );
});
test("Proof adds bakery items and produces an itemized total", async ({
  page,
}) => {
  await page.goto("./themes/proof/");
  await page
    .getByRole("button", { name: "Add Country sourdough", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add Morning croissant", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add Morning croissant", exact: true })
    .click();
  await page.getByLabel("Collection window").selectOption("10:00–11:00");
  await page.getByRole("button", { name: "Preview your bakery bag" }).click();
  await expect(page.locator(".order-sheet .status")).toContainText(
    "2 × Morning croissant",
  );
  await expect(page.locator(".order-sheet .status")).toContainText(
    "Collection 10:00–11:00 · Total £14.00",
  );
});
test("Grove shows seasonal produce and calculates a farm share", async ({
  page,
}) => {
  await page.goto("./themes/grove/");
  await page.getByRole("button", { name: "View Jul harvest" }).click();
  await expect(page.locator(".harvest-result")).toContainText("Tomatoes");
  await page.getByRole("button", { name: /Family share/ }).click();
  await page.getByLabel("Add six pasture eggs").check();
  await page.getByRole("button", { name: "More weeks" }).click();
  await page.getByRole("button", { name: "Preview my share · £66" }).click();
  await expect(page.locator(".share-builder .status")).toContainText(
    "Family share with eggs for 2 weeks: £66",
  );
});
test("Palette mixes colors and saves the resulting specimen", async ({
  page,
}) => {
  await page.goto("./themes/palette/");
  await page.getByLabel("First pigment").selectOption("0");
  await page.getByLabel("Second pigment").selectOption("1");
  await page.getByLabel("Mix balance", { exact: true }).fill("50");
  await expect(page.getByLabel("Mixed color")).toHaveText("#8E4D6F");
  await page.getByRole("button", { name: "Save this mix" }).click();
  await expect(page.locator(".your-palette [role=status]")).toContainText(
    "1 color saved",
  );
  await page.getByRole("button", { name: "Remove #8e4d6f" }).click();
  await expect(page.locator(".your-palette [role=status]")).toContainText(
    "No colors saved yet",
  );
});
test("Drift selects a lesson level and calculates the crew total", async ({
  page,
}) => {
  await page.goto("./themes/drift/");
  await page
    .getByRole("button", { name: /A little experience Find your line/ })
    .click();
  await page.getByLabel("Your crew").selectOption("3");
  await page.getByLabel("Your day").selectOption("Sunday 18 Oct");
  await page.getByRole("button", { name: "Preview lesson · £210" }).click();
  await expect(page.locator(".lesson-detail .status")).toContainText(
    "Find your line for 3 people on Sunday 18 Oct: £210",
  );
});
test("Chroma builds a service and stylist appointment preview", async ({
  page,
}) => {
  await page.goto("./themes/chroma/");
  await page.getByRole("button", { name: /Lived-in color/ }).click();
  await page.getByLabel("Who would you like to see?").selectOption("Robin");
  await page.getByRole("button", { name: "12:30", exact: true }).click();
  await page.getByRole("button", { name: "Preview my appointment" }).click();
  await expect(page.locator(".booking .status")).toContainText(
    "Lived-in color at 12:30 with robin — 150 minutes, £140",
  );
});
test("Encore selects seats and sums row-specific ticket prices", async ({
  page,
}) => {
  await page.goto("./themes/encore/");
  await expect(
    page.getByRole("button", { name: "Seat A3, unavailable" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Seat A1, £32", exact: true }).click();
  await page.getByRole("button", { name: "Seat C3, £24", exact: true }).click();
  await page.getByRole("button", { name: "Preview tickets" }).click();
  await expect(page.locator(".ticket-summary .status")).toContainText(
    "seats A1, C3 — £56",
  );
  await page
    .getByLabel("Choose a performance")
    .selectOption("Sunday 18 Oct · 14:30");
  await expect(
    page.getByRole("button", { name: "Preview tickets" }),
  ).toBeDisabled();
});
test("Field filters match results and previews a training signup", async ({
  page,
}) => {
  await page.goto("./themes/field/");
  await page.getByRole("button", { name: "Results", exact: true }).click();
  await page.getByLabel("Filter by team").selectOption("Women");
  await expect(page.locator(".fixture-list article")).toHaveCount(1);
  await expect(page.locator(".fixture-list")).toContainText("2 — 2");
  await page.getByLabel("Your first name").fill("Jordan");
  await page
    .getByLabel("Choose a session")
    .selectOption("Saturday · Walking football");
  await page.getByRole("button", { name: "Preview my place" }).click();
  await expect(page.locator(".join-form .status")).toContainText(
    "Jordan, you are on the demo list for Saturday · Walking football",
  );
});
