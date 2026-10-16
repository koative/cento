import { test, expect } from "@playwright/test";

test("Ballast releases selected trains independently and searches the board", async ({
  page,
}) => {
  await page.goto("themes/ballast/");
  await page
    .getByRole("button", { name: "Release departure", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("BL 204 cleared");
  await page.getByRole("button", { name: /BL 318/ }).click();
  await expect(
    page.getByRole("button", { name: "Release departure", exact: true }),
  ).toBeEnabled();
  await page.getByRole("searchbox").fill("Hamburg");
  await expect(page.locator(".train")).toHaveCount(1);
  await expect(page.locator(".train")).toContainText("BL 406");
});
test("Delta calculates a catchment scenario from rainfall and area", async ({
  page,
}) => {
  await page.goto("themes/delta/");
  await page.getByLabel("Catchment").selectOption("West gardens");
  await page.getByLabel("Rainfall").fill("40");
  await expect(page.locator(".water-reading")).toContainText("22,304");
  await page.getByRole("button", { name: "Save this scenario" }).click();
  await expect(page.getByRole("status")).toContainText(
    "West gardens: 22,304 litres",
  );
});
test("Strata keeps independent geological field notes", async ({ page }) => {
  await page.goto("themes/strata/");
  await page.getByRole("button", { name: /Sandstone/ }).click();
  await expect(page.locator(".detail-heading h3")).toHaveText("Sandstone");
  await page
    .getByRole("button", { name: "Save field note", exact: true })
    .click();
  await page.getByRole("button", { name: /Shale/ }).click();
  await page
    .getByRole("button", { name: "Save field note", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(
    "2 horizons in your field notebook.",
  );
  await page.getByRole("button", { name: "Remove field note" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "1 horizon in your field notebook.",
  );
});
test("Cadence filters candidates and shortlists the selected person", async ({
  page,
}) => {
  await page.goto("themes/cadence/");
  await page.getByLabel("Filter by role").selectOption("Frontend engineer");
  await expect(page.locator(".person")).toHaveCount(2);
  await page.getByRole("button", { name: /Taylor Brooks/ }).click();
  await page.getByRole("button", { name: "Add to shortlist" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Taylor Brooks is on your local shortlist",
  );
  await page.getByLabel("Search candidates").fill("nobody");
  await expect(page.locator(".empty")).toBeVisible();
});
test("Conduit traces the chosen event and exposes the selected retry policy", async ({
  page,
}) => {
  await page.goto("themes/conduit/");
  await page.getByLabel("Event type").selectOption("customer.updated");
  await page.getByLabel("Retry limit").selectOption("5");
  await page.getByRole("button", { name: "Run test event" }).click();
  await expect(page.getByRole("status")).toContainText(
    "customer.updated delivered",
  );
  await page.getByRole("button", { name: "Response", exact: true }).click();
  await expect(page.locator("pre")).toContainText('"retry_limit": 5');
  await expect(page.locator("pre")).toContainText('"accepted": true');
});
test("Lumenary configures finish, light temperature and quantity", async ({
  page,
}) => {
  await page.goto("themes/lumenary/");
  await page.getByRole("button", { name: "Ochre finish" }).click();
  await page.getByRole("button", { name: "Add one light" }).click();
  await page.getByRole("button", { name: "Warm light · 2700K" }).click();
  await expect(
    page.getByRole("button", { name: "Cool light · 4000K" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add to concept list" }).click();
  await expect(page.getByRole("status")).toContainText("2 Arc lights in Ochre");
  await expect(page.getByRole("status")).toContainText("Total €490");
});
test("Waypoint derives route duration and saves the practice inputs", async ({
  page,
}) => {
  await page.goto("themes/waypoint/");
  await page.getByRole("button", { name: /Valley crossing/ }).click();
  await page.getByLabel("Cruise speed").fill("120");
  await expect(page.locator(".flight-plan dl")).toContainText("34 min");
  await expect(page.locator(".flight-plan dl")).toContainText("30 L");
  await page.getByRole("button", { name: "Save practice plan" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Valley crossing saved: 34 minutes at 120 knots",
  );
});
test("Torque totals only selected workshop jobs", async ({ page }) => {
  await page.goto("themes/torque/");
  await page.getByRole("button", { name: /Chain service/ }).click();
  await page.getByLabel("Motorcycle type").selectOption("Classic");
  await expect(page.locator(".estimate>strong")).toHaveText("€150");
  await page.getByRole("button", { name: "Save service plan" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Classic service saved: 2 tasks, €150, 75 minutes",
  );
  await page.getByRole("button", { name: /Oil & filter/ }).click();
  await expect(page.locator(".estimate>strong")).toHaveText("€55");
});
test("Verdant models the crop yield and bed area", async ({ page }) => {
  await page.goto("themes/verdant/");
  await page.getByRole("button", { name: "Summer tomatoes" }).click();
  await page.getByLabel("Number of raised beds").fill("4");
  await expect(page.locator(".harvest dl")).toContainText("36.0");
  await expect(page.locator(".harvest dl")).toContainText("8square metres");
  await page.getByRole("button", { name: "Save my patch" }).click();
  await expect(page.getByRole("status")).toContainText(
    "4 beds of summer tomatoes",
  );
});
test("Parcel validates weight and calculates a destination-specific label", async ({
  page,
}) => {
  await page.goto("themes/parcel/");
  await page.getByLabel("Destination").selectOption("International");
  await page.getByLabel("Package weight (kg)").fill("3");
  await page.getByRole("radio", { name: /Express/ }).check();
  await expect(page.locator(".rate strong")).toHaveText("€23.60");
  await page.getByRole("button", { name: "Create demo label" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Express demo label created for a 3 kg international package",
  );
  await page.getByLabel("Package weight (kg)").fill("31");
  await expect(
    page.getByRole("button", { name: "Create demo label" }),
  ).toBeDisabled();
});
test("Beacon preserves checked items across filters and saves household size", async ({
  page,
}) => {
  await page.goto("themes/beacon/");
  await page.getByRole("checkbox", { name: /Drinking water/ }).check();
  await page.getByRole("checkbox", { name: /First-aid kit/ }).check();
  await page.getByRole("button", { name: "Equipment", exact: true }).click();
  await expect(page.getByRole("checkbox")).toHaveCount(2);
  await page.getByLabel("People in your household").selectOption("4");
  await page.getByRole("button", { name: "Save household checklist" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Checklist saved for 4 people: 2 of 6 items ready",
  );
});
test("Keystone recalculates span-to-depth for the selected material", async ({
  page,
}) => {
  await page.goto("themes/keystone/");
  await page.getByRole("button", { name: "Steel", exact: true }).click();
  await page.getByLabel("Clear span").fill("9");
  await expect(page.locator(".study-output")).toContainText("375");
  await page.getByRole("button", { name: "Save this study" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Steel concept saved: 9 m span, 375 mm",
  );
});
