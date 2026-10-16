import { test, expect } from "@playwright/test";
test("Brine filters catches and prepares a basket", async ({ page }) => {
  await page.goto("themes/brine/");
  await page.getByRole("button", { name: "Shellfish", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Day-boat cod" })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Add Hand-dived scallops" }).click();
  await page.getByRole("button", { name: "Prepare pickup note" }).click();
  await expect(page.locator("p[role=status]")).toContainText("basket is ready");
});
test("Folio switches and saves an original edition", async ({ page }) => {
  await page.goto("themes/folio/");
  await page.getByRole("button", { name: "View Blue hour, no. 4" }).click();
  await page.getByRole("button", { name: "Save this edition" }).click();
  await expect(page.locator("p[role=status]")).toContainText("saved");
  await page.getByRole("button", { name: "Risograph", exact: true }).click();
  await expect(page.locator(".edition-grid .edition")).toHaveCount(2);
});
test("Patina selects a decade and shortlists an object", async ({ page }) => {
  await page.goto("themes/patina/");
  await page.getByLabel("Browse by decade").selectOption("1960s");
  await page.getByRole("button", { name: /1960s A good sideboard/ }).click();
  await page.getByRole("button", { name: "Add to shortlist" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "A good sideboard",
  );
});
test("Nectar updates flavor, quantity and total", async ({ page }) => {
  await page.goto("themes/nectar/");
  await page.getByRole("button", { name: "Woodland", exact: true }).click();
  await page.getByRole("button", { name: "More jars" }).click();
  await page.getByRole("button", { name: "Add to demo basket" }).click();
  await expect(page.locator("p[role=status]")).toContainText("2 woodland jars");
  await expect(page.locator("p[role=status]")).toContainText("£34");
});
test("Alpine rental estimate responds to equipment and boots", async ({
  page,
}) => {
  await page.goto("themes/alpine/");
  await page.getByRole("button", { name: "Explore £58 / day" }).click();
  await page.getByLabel("Include boots").uncheck();
  await expect(page.locator(".estimate strong")).toHaveText("£174");
  await page.getByRole("button", { name: "Save rental plan" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Explore setup for 3 days",
  );
});
test("Sonnet builds a language course plan", async ({ page }) => {
  await page.goto("themes/sonnet/");
  await page.getByLabel("I'd like to speak").selectOption("2");
  await page.getByRole("button", { name: "Thursday", exact: true }).click();
  await page.getByRole("button", { name: "Save my plan" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Spanish on Thursday",
  );
});
test("Mosaic saves materials to a room brief", async ({ page }) => {
  await page.goto("themes/mosaic/");
  await page.getByRole("button", { name: "Walnut", exact: true }).click();
  await page.getByRole("button", { name: "Add to moodboard" }).click();
  await page
    .getByLabel("Which space are we imagining?")
    .selectOption("Bedroom");
  await page.getByRole("button", { name: "Save room brief" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Bedroom brief saved with Limestone, Walnut",
  );
});
test("Lacquer composes a shade and finish", async ({ page }) => {
  await page.goto("themes/lacquer/");
  await page.getByRole("button", { name: "Poolside", exact: true }).click();
  await page.getByRole("button", { name: "Matte", exact: true }).click();
  await expect(page.locator(".appointment dd").last()).toHaveText(
    "Poolside / Matte",
  );
  await page.getByRole("button", { name: "Save this look" }).click();
  await expect(page.locator("p[role=status]")).toContainText("saved locally");
});
test("Truffle requires six pieces before saving a gift box", async ({
  page,
}) => {
  await page.goto("themes/truffle/");
  for (let i = 0; i < 6; i++)
    await page.getByRole("button", { name: "Add Sea salt caramel" }).click();
  await expect(
    page.getByRole("button", { name: "Add Dark ganache" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Save your chocolate box" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "six-piece demo box is complete",
  );
  await page
    .getByRole("button", { name: "Remove piece 1", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Choose 1 more piece" }),
  ).toBeDisabled();
});
test("Score plays a phrase and saves a lesson", async ({ page }) => {
  await page.goto("themes/score/");
  await page.getByRole("button", { name: "Play C", exact: true }).click();
  await page.getByRole("button", { name: "Play E", exact: true }).click();
  await expect(page.locator(".phrase output")).toContainText("C  ·  E");
  await page.getByLabel("I'd like to learn").selectOption("Guitar");
  await page.getByRole("button", { name: "Save session plan" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Guitar plan saved",
  );
});
test("Sprout finds shade plants and saves a growing plan", async ({ page }) => {
  await page.goto("themes/sprout/");
  await page
    .getByRole("button", { name: "Shady A softer, sheltered spot" })
    .click();
  await page.getByRole("button", { name: "Add Fern", exact: true }).click();
  await page.getByLabel("My growing space").selectOption("Patio");
  await page.getByRole("button", { name: "Save my growing plan" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Patio plan saved with Fern",
  );
});
test("Ripple recovers an empty timetable and saves a lesson", async ({
  page,
}) => {
  await page.goto("themes/ripple/");
  await page.getByLabel("Who's making a splash?").selectOption("Children");
  await page.getByRole("button", { name: "Sunday", exact: true }).click();
  await expect(
    page.getByText("No example lessons for this combination."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show Saturday lessons" }).click();
  await page.getByRole("button", { name: /09:00 Little ripples/ }).click();
  await page.getByRole("button", { name: "Save lesson plan" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Little ripples saved locally",
  );
});
