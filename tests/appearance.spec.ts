import { test, expect } from "@playwright/test";

test("appearance follows the system and persists an explicit choice", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("./");
  const root = page.locator("html");
  const appearance = page.getByLabel("Appearance", { exact: true });
  await expect(appearance).toHaveValue("system");
  await expect(root).toHaveAttribute("data-theme", "dark");
  await appearance.selectOption("light");
  await page.reload();
  await expect(appearance).toHaveValue("light");
  await expect(root).toHaveAttribute("data-theme", "light");
  await appearance.selectOption("system");
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(root).toHaveAttribute("data-theme", "light");
  await appearance.selectOption("dark");
  await page
    .getByRole("button", { name: "Discover Orbit", exact: true })
    .click();
  await expect(page.frameLocator("iframe").locator("h1")).toBeVisible();
  await expect(page.frameLocator("iframe").locator("html")).not.toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator(".preview-toolbar")).toHaveCSS(
    "background-color",
    "rgb(28, 41, 64)",
  );
});

test("stored dark appearance is applied before the app bundle loads", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() =>
    localStorage.setItem("elseform-appearance", "dark"),
  );
  await page.route("**/*", (route) =>
    route.request().resourceType() === "script"
      ? route.abort()
      : route.continue(),
  );
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#0c1320",
  );
  await expect(page.locator("#root")).toBeEmpty();
});

test("appearance remains usable when storage is unavailable and on a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await page.getByLabel("Appearance", { exact: true }).selectOption("light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByLabel("Appearance", { exact: true }).selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
  expect(errors).toEqual([]);
});
