import { test, expect } from "@playwright/test";

test("Frame filters the contact sheet, switches layout, and changes featured photograph", async ({
  page,
}) => {
  await page.goto("themes/frame/");
  await page
    .getByRole("button", { name: "Next photograph", exact: true })
    .click();
  await expect(page.locator(".feature h2")).toHaveText("After the last train");
  await page.getByRole("button", { name: "Portrait", exact: true }).click();
  await expect(page.locator(".projects .project")).toHaveCount(1);
  await page.getByRole("button", { name: "List layout", exact: true }).click();
  await expect(page.locator(".projects")).toHaveClass("projects list");
  await page.locator(".projects .project").click();
  await expect(page.locator(".feature h2")).toHaveText("In her own light");
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".projects .project")).toHaveCount(3);
});

test("Monograph filters topics, expands a story, and confirms a local subscription", async ({
  page,
}) => {
  await page.goto("themes/monograph/");
  await page.getByRole("button", { name: "Books", exact: true }).click();
  await expect(page.locator(".story")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Read A room of borrowed lives", exact: true })
    .click();
  await expect(page.locator(".reading")).toContainText(
    "The best bookshops are maps drawn by people.",
  );
  await page.getByRole("button", { name: "Close story", exact: true }).click();
  await expect(page.locator(".reading")).toHaveCount(0);
  await page
    .getByLabel("A place for the Sunday letter")
    .fill("reader@example.com");
  await page
    .getByRole("button", {
      name: "Subscribe to the Sunday letter",
      exact: true,
    })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "No email was sent or saved to a server.",
  );
});

test("Index searches books and adds and removes a book from the local bag", async ({
  page,
}) => {
  await page.goto("themes/index/");
  await page.getByLabel("Search books", { exact: true }).fill("noticing");
  await expect(page.locator(".book-entry")).toHaveCount(1);
  await page.locator(".book-entry").click();
  await expect(
    page.getByRole("article", { name: "Book details" }),
  ).toContainText("Ada Hart");
  await page
    .getByRole("button", { name: "Add to book bag", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("1 in your book bag");
  await page.getByRole("button", { name: "Book bag 1", exact: true }).click();
  await expect(
    page.getByRole("complementary", { name: "Book bag" }),
  ).toContainText("€24");
  await page
    .getByRole("button", { name: "Remove The Art of Noticing", exact: true })
    .click();
  await expect(
    page.getByRole("complementary", { name: "Book bag" }),
  ).toContainText("Your book bag is empty.");
  await page.getByLabel("Search books", { exact: true }).fill("unfindable");
  await expect(page.locator(".empty")).toContainText("No books match");
});

test("Bloom calculates arrangement pricing and confirms the selected local request", async ({
  page,
}) => {
  await page.goto("themes/bloom/");
  await page
    .getByRole("button", { name: "The little gesture", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Something generous €52", exact: true })
    .click();
  await expect(page.locator(".builder-total strong")).toHaveText("€52");
  await page.getByLabel("Your name", { exact: true }).fill("Alex");
  await page.getByLabel("A little note").fill("Just because.");
  await page
    .getByRole("button", { name: "Create my request", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "The little gesture, something generous, €52",
  );
  await expect(page.getByRole("status")).toContainText("Just because.");
  await expect(page.getByRole("status")).toContainText(
    "No order was placed or message sent.",
  );
  await page.getByRole("button", { name: "The daydream", exact: true }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.locator(".builder-total strong")).toHaveText("€65");
});
