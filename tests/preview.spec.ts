import { test, expect } from "@playwright/test";
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 900, height: 700 },
  { width: 1920, height: 1080 },
  { width: 390, height: 844 },
]) {
  test(`preview stays centered at ${viewport.width}px, including after scrolling`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("./");
    const trigger = page.getByRole("button", {
      name: "Preview Orbit",
      exact: true,
    });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const dialog = page.locator("dialog");
    await expect(dialog).toBeVisible();
    async function centered(selector: string) {
      await expect
        .poll(async () => {
          const r = await page.locator(selector).boundingBox();
          return r ? Math.abs(r.x + r.width / 2 - viewport.width / 2) : 999;
        })
        .toBeLessThan(1);
    }
    await centered("dialog");
    const r = await dialog.boundingBox();
    expect(Math.abs(r!.y + r!.height / 2 - viewport.height / 2)).toBeLessThan(
      1,
    );
    if (viewport.width > 680) {
      await centered(".device-controls");
      for (const device of ["mobile", "tablet", "desktop"]) {
        await page
          .getByRole("button", { name: `${device} preview`, exact: true })
          .click();
        await centered(".preview-canvas iframe");
      }
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}
