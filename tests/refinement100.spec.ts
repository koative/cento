import { test, expect } from "@playwright/test";
test("Grid links time, panel count and generation in its model", async ({
  page,
}) => {
  await page.goto("themes/grid/");
  await expect(page.locator(".panel.installed")).toHaveCount(10);
  await page.getByLabel("Time of day").fill("6");
  await expect(page.locator(".generation strong")).toContainText("0.0");
  await page.getByLabel("Time of day").fill("12");
  await expect(page.locator(".generation strong")).toContainText("3.4");
  await page.getByRole("button", { name: "Add solar panel" }).click();
  await expect(page.locator(".panel.installed")).toHaveCount(11);
  await expect(page.locator(".generation strong")).toContainText("3.7");
});
test("Helix changes representation and keeps selected-study context", async ({
  page,
}) => {
  await page.goto("themes/helix/");
  await page.getByRole("button", { name: "Surface", exact: true }).click();
  await expect(page.getByRole("img", { name: /surface view/ })).toBeVisible();
  await page.getByRole("button", { name: /H-027 Cellular repair/ }).click();
  await expect(
    page.getByRole("img", { name: /Cellular repair/ }),
  ).toHaveAttribute("aria-label", /surface/);
});
test("Campus observation lens updates the example without losing lesson notes", async ({
  page,
}) => {
  await page.goto("themes/campus/");
  await page.getByLabel("Lesson notes").fill("The windows form a rhythm.");
  await page.getByRole("button", { name: "Rhythm", exact: true }).click();
  await expect(page.locator(".observation-guide p")).toContainText(
    "repeated windows",
  );
  await expect(page.getByLabel("Lesson notes")).toHaveValue(
    "The windows form a rhythm.",
  );
});
test("Palette specimens and proportion ramp produce the expected endpoints", async ({
  page,
}) => {
  await page.goto("themes/palette/");
  await page
    .getByRole("button", { name: "Select pigment Viridian", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Set mix to 0 percent", exact: true })
    .click();
  await expect(page.getByLabel("Mixed color")).toHaveText("#3B8674");
  await page
    .getByRole("button", { name: "Set mix to 100 percent", exact: true })
    .click();
  await expect(page.getByLabel("Mixed color")).toHaveText("#E8BA37");
});
test("Circuit offers reversible exploded and assembled hardware views", async ({
  page,
}) => {
  await page.goto("themes/circuit/");
  await page.getByRole("button", { name: "Assemble device" }).click();
  await expect(
    page.getByRole("img", { name: "Assembled phone model" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore inside" }).click();
  await expect(
    page.getByRole("img", { name: /Exploded phone model/ }),
  ).toBeVisible();
});
test("Heirloom manual rotation pauses automatic motion", async ({ page }) => {
  await page.goto("themes/heirloom/");
  await page.getByLabel("Rotate ring").fill("45");
  await expect(page.locator(".ring")).not.toHaveClass(/rotating/);
  await page.getByRole("button", { name: "Resume rotation" }).click();
  await expect(page.locator(".ring")).toHaveClass(/rotating/);
});
test("Summit route walkthrough respects the first and last hold", async ({
  page,
}) => {
  await page.goto("themes/summit/");
  await expect(
    page.getByRole("button", { name: "Previous hold" }),
  ).toBeDisabled();
  for (let i = 0; i < 5; i++)
    await page.getByRole("button", { name: "Next hold" }).click();
  await expect(page.locator(".route-walkthrough")).toContainText("Hold 6 / 6");
  await expect(page.getByRole("button", { name: "Next hold" })).toBeDisabled();
});
test("Flux skips actions after a failed budget condition, and reset restores it", async ({
  page,
}) => {
  await page.goto("themes/flux/");
  await page
    .getByLabel("Sample project budget (€)", { exact: true })
    .fill("2500");
  await page.getByRole("button", { name: "Test workflow" }).click();
  await expect(page.locator(".success")).toContainText("Condition not met");
  await expect(page.locator(".activity")).toContainText(
    "Create project brief — skipped",
  );
  await expect(page.locator(".activity")).toContainText(
    "Notify the team — skipped",
  );
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.getByRole("button", { name: "Test workflow" }).click();
  await expect(page.locator(".success")).toHaveText("All 4 steps completed.");
});
