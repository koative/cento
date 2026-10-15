import { test, expect } from "@playwright/test";

test("Pulse changes the lineup by day and calculates selected ticket totals", async ({
  page,
}) => {
  await page.goto("themes/pulse/");
  const schedule = page.getByRole("tabpanel");
  await expect(schedule).toContainText("VELVET STATIC");
  await page.getByRole("tab", { name: "SAT 18" }).click();
  await expect(schedule).toContainText("CIRCUIT BREAK");
  await expect(schedule).not.toContainText("VELVET STATIC");

  await expect(
    page.getByRole("button", { name: "Remove one pass" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Saturday", exact: true }).click();
  await page.getByRole("button", { name: "Add one pass" }).click();
  await page
    .getByRole("button", { name: "Select passes · €130", exact: true })
    .click();
  await expect(
    page.getByText(
      "2 saturday passes selected. Demo only — no booking or payment was made.",
    ),
  ).toBeVisible();

  await page.getByRole("button", { name: "Weekend", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Select passes · €298", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Demo ticket selector. No real tickets are sold."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove one pass" }).click();
  await expect(
    page.getByRole("button", { name: "Select pass · €149", exact: true }),
  ).toBeVisible();
});

test("Atelier filters projects and opens the chosen project story", async ({
  page,
}) => {
  await page.goto("themes/atelier/");
  await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(4);
  await page
    .getByRole("button", { name: "Brand identity", exact: true })
    .click();
  await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Explore Form & Field", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Explore Common Ground", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Explore OFFBEAT", exact: true }),
  ).toHaveCount(0);

  await page
    .getByRole("button", { name: "Explore Form & Field", exact: true })
    .click();
  const projectStory = page.getByText(
    /A new perspective on everyday objects\./,
  );
  await expect(projectStory).toBeVisible();
  await page
    .getByRole("button", { name: "Explore Form & Field", exact: true })
    .click();
  await expect(projectStory).toHaveCount(0);
  await page.getByRole("button", { name: "Everything", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(4);
});

test("Terrain changes trip details and lets visitors keep a local shortlist", async ({
  page,
}) => {
  await page.goto("themes/terrain/");
  const trip = page.getByRole("tabpanel");
  await expect(
    trip.getByRole("heading", { name: "Above the ordinary" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: /Challenging/ }).click();
  await expect(
    trip.getByRole("heading", { name: "The wild edge" }),
  ).toBeVisible();
  await expect(trip).toContainText("LYNGEN ALPS, NORWAY");
  await expect(trip).toContainText("72 km");
  await expect(
    page.getByText("August 16–22, 2027 · EXAMPLE DEPARTURE"),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "See the itinerary", exact: true })
    .click();
  await expect(trip.getByRole("listitem")).toHaveCount(7);
  await expect(trip).toContainText("Tromsø arrival · Expedition briefing");
  await page.getByRole("button", { name: "Save trip", exact: true }).click();
  await expect(
    page.getByText("Added to your shortlist for this visit."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await expect(
    page.getByText("Added to your shortlist for this visit."),
  ).not.toBeVisible();

  await page.getByRole("tab", { name: /Easy/ }).click();
  await expect(
    trip.getByRole("heading", { name: "The quiet way" }),
  ).toBeVisible();
  await expect(trip).toContainText("28 km");
  await expect(
    page.getByRole("button", { name: "See the itinerary", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "See the itinerary", exact: true })
    .click();
  await expect(trip.getByRole("listitem")).toHaveCount(3);
});
