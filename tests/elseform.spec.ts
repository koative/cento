import { test, expect } from "@playwright/test";
import { catalog } from "../gallery/catalog";

test("Elseform shortlist persists, filters, and recovers after removing the last item", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Save Forma", exact: true }).click();
  await page.getByRole("button", { name: "Save Orbit", exact: true }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "Saved templates", exact: true })
    .click();
  await expect(page.locator(".template-entry")).toHaveCount(2);
  await page.getByRole("searchbox").fill("Aerospace");
  await expect(page.locator(".template-entry")).toHaveCount(1);
  await expect(page.locator(".template-entry")).toHaveAttribute("id", "orbit");
  await page.getByRole("searchbox").fill("");
  await page.getByRole("button", { name: "Unsave Orbit", exact: true }).click();
  await page.getByRole("button", { name: "Unsave Forma", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your shortlist starts here." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all templates" }).click();
  await expect(page.locator(".template-entry")).toHaveCount(catalog.length);
});

test("Elseform surprise opens a real template and returns keyboard focus", async ({
  page,
}) => {
  await page.goto("./");
  const surprise = page.getByRole("button", {
    name: "Surprise me",
    exact: true,
  });
  await surprise.click();
  await expect(page.locator("dialog")).toBeVisible();
  await expect(
    page.frameLocator("iframe").getByRole("heading", { level: 1 }),
  ).toBeVisible();
  expect(catalog.map((t) => t.name)).toContain(
    await page.locator(".preview-name strong").textContent(),
  );
  await page.keyboard.press("Escape");
  await expect(surprise).toBeFocused();
});

test("Elseform stays usable without WebGL or persistent browser storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: any[]
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return (getContext as Function).apply(this, args);
    } as typeof getContext;
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "something else.",
  );
  await page.getByRole("button", { name: "Save Forma", exact: true }).click();
  await page
    .getByRole("button", { name: "Saved templates", exact: true })
    .click();
  await expect(page.locator(".template-entry")).toHaveCount(1);
  await expect(
    page.getByText("For this visit", { exact: false }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
