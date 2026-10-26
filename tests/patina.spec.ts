import { test, expect } from "@playwright/test";

// Six bentwood chairs are on the floor; every finish draws on the same six.
test("patina: finish lines share one piece's stock", async ({ page }) => {
  await page.goto("themes/patina/#/shop/bentwood-cafe-chair");
  const more = page.getByRole("button", { name: "More — chairs", exact: true });
  for (const finish of [/As photographed/, /re-caned/]) {
    await page.getByRole("radio", { name: finish }).check();
    await more.click();
    await more.click();
    await page.getByRole("button", { name: "Add to cart" }).click();
  }

  await page.goto("themes/patina/#/cart");
  const qty = page.locator(".cart-line output");
  await expect(qty).toHaveText(["3", "3"]);
  for (const button of await page
    .getByRole("button", { name: /^More — chairs of/ })
    .all())
    await expect(button).toBeDisabled();

  // A cart saved before the fix (4 + 3 against six) is trimmed on restore.
  await page.evaluate(() =>
    localStorage.setItem(
      "patina-cart",
      JSON.stringify([
        { id: "bentwood-cafe-chair", option: "as-shown", qty: 4 },
        { id: "bentwood-cafe-chair", option: "recaned", qty: 3 },
      ]),
    ),
  );
  await page.reload();
  await expect(qty).toHaveText(["4", "2"]);
});
