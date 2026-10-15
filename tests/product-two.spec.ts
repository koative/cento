import { test, expect } from "@playwright/test";

test("Kiln filters its collection and adjusts the local bag total", async ({
  page,
}) => {
  await page.goto("themes/kiln/");
  await page.getByRole("button", { name: "Objects", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "The daily cup", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Add Still life vessel", exact: true })
    .click();
  await page.getByRole("button", { name: "Bag (1)", exact: true }).click();
  const bag = page.getByRole("region", { name: "Your sample bag" });
  await expect(bag.locator(".total")).toHaveText("Sample total $74");
  await bag
    .getByRole("button", { name: "Add one Still life vessel", exact: true })
    .click();
  await expect(bag.locator(".total")).toHaveText("Sample total $148");
  await bag
    .getByRole("button", { name: "Remove one Still life vessel", exact: true })
    .click();
  await bag
    .getByRole("button", { name: "Remove one Still life vessel", exact: true })
    .click();
  await expect(bag).toContainText("Your bag is empty.");
});

test("Aura builds a routine from preferences and handles local newsletter signup", async ({
  page,
}) => {
  await page.goto("themes/aura/");
  await page.getByRole("button", { name: /01.*Cleanse/ }).click();
  await expect(
    page.getByRole("heading", { name: "A clean beginning.", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Evening", exact: true }).click();
  await page
    .getByLabel("Preferred texture")
    .selectOption("Rich and comforting");
  await page.getByRole("button", { name: "Build my sample ritual" }).click();
  await expect(page.locator("#finder").getByRole("status")).toContainText(
    "Your evening edit",
  );
  await expect(page.locator("#finder").getByRole("status")).toContainText(
    "Dew facial oil",
  );
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page.getByRole("button", { name: "Join the demo newsletter" }).click();
  await expect(page.locator(".newsletter").getByRole("status")).toContainText(
    "Nothing has been sent or stored.",
  );
});

test("Tide changes cleanup location and confirms only the selected local signup", async ({
  page,
}) => {
  await page.goto("themes/tide/");
  await page.getByRole("button", { name: "Bristol harbourside" }).click();
  await expect(
    page.getByRole("heading", { name: "Bristol harbourside" }),
  ).toBeVisible();
  await page.getByLabel("Your name", { exact: true }).fill("Alex");
  await page.getByLabel("Your email", { exact: true }).fill("alex@example.com");
  await page.getByRole("button", { name: "Join this demo cleanup" }).click();
  await expect(page.getByRole("status")).toContainText("Bristol harbourside");
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been booked or sent.",
  );
  await page.getByRole("button", { name: "Cornwall coast" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
});

test("Relay filters, tracks, downloads CSV, and recovers from an empty search", async ({
  page,
}) => {
  await page.goto("themes/relay/");
  await page.getByRole("button", { name: "Attention", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Track RL-2050", exact: true })
    .click();
  const detail = page.getByRole("article", { name: "Selected shipment" });
  await expect(detail).toContainText("Transfer needs review");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export shipments" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("relay-sample-shipments.csv");
  await expect(page.getByRole("status")).toContainText(
    "Exported 1 sample shipments.",
  );
  await page.getByLabel("Search shipments").fill("no-such-shipment");
  await expect(
    page.getByRole("heading", { name: "No matching shipments" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(6);
  await page.getByLabel("Search shipments").fill("Warsaw");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.locator("tbody")).toContainText("RL-2052");
});
