import { test, expect } from "@playwright/test";

const upcomingDate = () =>
  new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

test("Forma changes perspectives and filters expandable project details", async ({
  page,
}) => {
  await page.goto("themes/forma/");
  await page
    .getByRole("button", { name: "02 Rooms for living", exact: true })
    .click();
  await expect(
    page.getByRole("img", { name: "Rooms for living architectural concept" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Interiors", exact: true }).click();
  await expect(page.locator(".project-list article")).toHaveCount(1);
  await expect(page.locator(".project-list")).toContainText("Rooms for living");
  await expect(page.locator(".project-list")).not.toContainText(
    "The quiet house",
  );
  const project = page.locator(".project-row");
  await project.click();
  await expect(project).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Antwerp, BE · Concept project")).toBeVisible();
  await project.click();
  await expect(page.getByText("Antwerp, BE · Concept project")).toHaveCount(0);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-list article")).toHaveCount(3);
});

test("Forma inquiry produces an honest local confirmation", async ({
  page,
}) => {
  await page.goto("themes/forma/");
  await page.getByLabel("Your name", { exact: true }).fill("Alex Example");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page
    .getByLabel("A little about your project")
    .fill("A light-filled home with a garden.");
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your concept inquiry is ready.",
  );
  await expect(page.getByRole("status")).toContainText("sends no message");
});

test("Muse cycles looks, selects a size, and adds and clears a demo bag", async ({
  page,
}) => {
  await page.goto("themes/muse/");
  await page.getByRole("button", { name: "Next look", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "An everyday kind of extraordinary" }),
  ).toBeVisible();
  await expect(page.locator(".product-meta")).toContainText("€180");
  await page
    .getByRole("button", { name: "Previous look", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "The art of becoming" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "L", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "L", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Add to your edit", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Added, size L — add another" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Bag (1)", exact: true }).click();
  await expect(
    page.getByRole("complementary", { name: "Shopping bag" }),
  ).toContainText("1 selected piece");
  await page.getByRole("button", { name: "Clear bag", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Bag (0)", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("complementary", { name: "Shopping bag" }),
  ).toContainText("Your bag is waiting");
});

test("Ember changes menus and confirms the chosen demo reservation", async ({
  page,
}) => {
  await page.goto("themes/ember/");
  await page.getByRole("button", { name: "Small plates", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /Burrata & the season/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /The good margherita/ }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Sweet endings", exact: true })
    .click();
  await expect(page.locator(".dishes article")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: /One more tiramisu/ }),
  ).toBeVisible();
  const date = upcomingDate();
  await page.getByLabel("Your day", { exact: true }).fill(date);
  await page
    .getByLabel("Your people", { exact: true })
    .selectOption("4 guests");
  await page.getByRole("button", { name: "18:30", exact: true }).click();
  await page.getByLabel("Your name", { exact: true }).fill("Jamie Example");
  await page
    .getByRole("button", { name: "Save me a seat", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    `4 guests · ${date} · 18:30`,
  );
  await expect(page.getByRole("status")).toContainText(
    "No table has been reserved.",
  );
  await page.getByRole("button", { name: "20:00", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Save me a seat", exact: true }),
  ).toBeVisible();
});

test("Haven calculates stays and reconciles room capacity with party size", async ({
  page,
}) => {
  await page.goto("themes/haven/");
  await page.getByRole("button", { name: "Alpine room", exact: true }).click();
  await expect(page.locator(".stay-details h3")).toHaveText("Alpine room");
  await expect(page.getByLabel("Your space", { exact: true })).toHaveValue("1");
  await expect(page.locator(".booking-total strong")).toHaveText("€540");
  await page
    .getByRole("button", { name: "One more night", exact: true })
    .click();
  await expect(page.locator(".booking-total strong")).toHaveText("€720");
  await page
    .getByLabel("Your company", { exact: true })
    .selectOption("4 guests");
  await expect(page.getByLabel("Your space", { exact: true })).toHaveValue("2");
  await expect(page.locator(".stay-details h3")).toHaveText("The summit suite");
  await expect(page.locator(".booking-total strong")).toHaveText("€1280");
  await page.getByLabel("Your space", { exact: true }).selectOption("0");
  await expect(page.getByLabel("Your company", { exact: true })).toHaveValue(
    "2 guests",
  );
  await expect(page.locator(".booking-total strong")).toHaveText("€960");
  const date = upcomingDate();
  await page.getByLabel("Arrive", { exact: true }).fill(date);
  await page
    .getByRole("button", { name: "Imagine yourself here", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    `Forest hideaway, arriving ${date}`,
  );
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been booked.",
  );
});
