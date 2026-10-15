import { test, expect } from "@playwright/test";

test("Still starts, advances, pauses, and restarts its breathing practice", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("themes/still/");
  const practice = page.locator("#practice");
  await expect(
    practice.getByText("A moment of still", { exact: true }),
  ).toBeVisible();

  await practice
    .getByRole("button", { name: "Take a breath", exact: true })
    .click();
  await expect(practice.getByText("Breathe in", { exact: true })).toBeVisible();
  await expect(practice.getByText("4 seconds", { exact: true })).toBeVisible();
  await page.clock.runFor(4000);
  await expect(
    practice.getByText("Breathe out", { exact: true }),
  ).toBeVisible();
  await expect(practice.getByText("6 seconds", { exact: true })).toBeVisible();

  await practice
    .getByRole("button", { name: "Pause breathing", exact: true })
    .click();
  await expect(
    practice.getByText("A moment of still", { exact: true }),
  ).toBeVisible();
  await page.clock.runFor(3000);
  await expect(
    practice.getByText("A moment of still", { exact: true }),
  ).toBeVisible();
  await practice
    .getByRole("button", { name: "Take a breath", exact: true })
    .click();
  await expect(practice.getByText("Breathe in", { exact: true })).toBeVisible();
  await expect(practice.getByText("4 seconds", { exact: true })).toBeVisible();
});

test("Still filters class days and confirms the chosen demo class locally", async ({
  page,
}) => {
  await page.goto("themes/still/");
  const classes = page.locator("#classes");
  await expect(
    classes.getByRole("heading", { name: "A softer start", exact: true }),
  ).toBeVisible();
  await classes.getByRole("button", { name: "Tuesday", exact: true }).click();
  await expect(
    classes.getByRole("button", { name: "Tuesday", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    classes.getByRole("heading", { name: "A softer start", exact: true }),
  ).toHaveCount(0);
  await expect(
    classes.getByRole("heading", { name: "Find your grounding", exact: true }),
  ).toBeVisible();
  await expect(
    classes.getByRole("heading", { name: "The quiet hour", exact: true }),
  ).toBeVisible();

  await classes
    .getByRole("button", { name: "Choose The quiet hour", exact: true })
    .click();
  await classes
    .getByLabel("Your email", { exact: true })
    .fill("alex@example.com");
  await classes
    .getByRole("button", { name: "Confirm demo place", exact: true })
    .click();
  await expect(classes.getByRole("status")).toContainText(
    "You're on the demo list",
  );
  await expect(classes.getByRole("status")).toContainText("The quiet hour");
  await expect(classes.getByRole("status")).toContainText(
    "Nothing has been booked or sent.",
  );
  await expect(classes.getByLabel("Your email", { exact: true })).toHaveCount(
    0,
  );
});

test("Roast selects coffee variants and keeps bag quantities and totals consistent", async ({
  page,
}) => {
  await page.goto("themes/roast/");
  const shop = page.locator("#shop");
  await expect(
    shop.getByRole("button", { name: "Decrease quantity", exact: true }),
  ).toBeDisabled();
  await shop.getByRole("button", { name: /^High Noon/ }).click();
  await expect(
    shop.getByRole("heading", { name: "High Noon", exact: true }),
  ).toBeVisible();
  await expect(shop.getByText("Bergamot", { exact: true })).toBeVisible();
  await shop.getByRole("button", { name: "1 kg", exact: true }).click();
  await expect(
    shop.getByRole("button", { name: "1 kg", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await shop
    .getByLabel("Your grind", { exact: true })
    .selectOption("French press");
  await shop
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await shop
    .getByRole("button", { name: "Add to bag · $149.60", exact: true })
    .click();
  await expect(shop.getByRole("status")).toContainText("Sample bag updated.");

  await page.getByRole("button", { name: /Your bag/ }).click();
  const bag = page.getByRole("region", {
    name: "Your shopping bag",
    exact: true,
  });
  await expect(bag).toBeVisible();
  await expect(
    bag.getByRole("heading", { name: "High Noon", exact: true }),
  ).toBeVisible();
  await expect(bag).toContainText("1 kg · French press");
  await expect(bag.locator(".cart-total strong")).toHaveText("$149.60");
  await bag
    .getByRole("button", { name: "Add one High Noon", exact: true })
    .click();
  await expect(bag.locator(".cart-total strong")).toHaveText("$224.40");
  await bag
    .getByRole("button", { name: "Remove one High Noon", exact: true })
    .click();
  await expect(bag.locator(".cart-total strong")).toHaveText("$149.60");
  await bag
    .getByRole("button", { name: "Remove one High Noon", exact: true })
    .click();
  await expect(bag.locator(".cart-total strong")).toHaveText("$74.80");
  await bag
    .getByRole("button", { name: "Remove one High Noon", exact: true })
    .click();
  await expect(
    bag.getByRole("heading", { name: "A little empty in here.", exact: true }),
  ).toBeVisible();
  await expect(bag.locator(".cart-item")).toHaveCount(0);
  await bag
    .getByRole("button", { name: "Close shopping bag", exact: true })
    .click();
  await expect(bag).toHaveCount(0);
});
