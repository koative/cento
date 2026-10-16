import { test, expect } from "@playwright/test";

test("Helix selects research, maintains a reading list and filters the library", async ({
  page,
}) => {
  await page.goto("themes/helix/");
  await page.getByRole("button", { name: /H-027 Cellular repair/ }).click();
  await expect(page.locator(".study-detail h3")).toHaveText("Cellular repair");
  await page.getByRole("button", { name: "Save to reading list" }).click();
  await expect(page.locator(".study-detail .status")).toContainText(
    "1 study in your reading list",
  );
  await page.getByRole("button", { name: "Translation", exact: true }).click();
  await expect(page.locator(".library-row")).toHaveCount(1);
  await expect(page.locator(".library-row")).toContainText("Cellular repair");
  await page.getByRole("button", { name: "Remove from reading list" }).click();
  await expect(page.locator(".study-detail .status")).toContainText(
    "0 studies",
  );
});

test("Grid recalculates a system and saves the selected local concept", async ({
  page,
}) => {
  await page.goto("themes/grid/");
  await page.getByRole("button", { name: "Add solar panel" }).click();
  await expect(page.getByLabel("Solar panel count")).toHaveText("11");
  await expect(page.locator(".energy-chip strong")).toHaveText("4.4 kW");
  await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "Save my concept" }).click();
  await expect(page.locator(".controls .status")).toContainText(
    "11-panel concept is saved",
  );
  await expect(page.locator(".estimate")).toContainText("66% modeled coverage");
});

test("Forge calculates a material batch and downloads its specification", async ({
  page,
}) => {
  await page.goto("themes/forge/");
  await page
    .getByLabel("Material", { exact: true })
    .selectOption("Titanium Grade 5");
  await page.getByLabel("Batch quantity").selectOption("100");
  await expect(page.locator(".quote")).toContainText("€71");
  await expect(page.locator(".quote")).toContainText("€7,100");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download specification" }).click();
  expect((await pending).suggestedFilename()).toBe("forge-specification.txt");
  await expect(page.locator(".config-form .status")).toContainText(
    "100 units in Titanium Grade 5",
  );
});

test("Vector changes the trim and finish and saves a local configuration", async ({
  page,
}) => {
  await page.goto("themes/vector/");
  await page.getByRole("button", { name: /Performance €92,500/ }).click();
  await page.getByRole("button", { name: "Copper finish" }).click();
  await expect(page.locator(".specs")).toContainText("420");
  await page.getByRole("button", { name: "Engineering", exact: true }).click();
  await expect(page.locator(".engineering")).toContainText(
    "MODULAR ENERGY PLATFORM",
  );
  await page.getByRole("button", { name: "Save this configuration" }).click();
  await expect(page.locator(".config-options .status")).toContainText(
    "V.01 Performance, Copper",
  );
});

test("Cipher records independent access decisions for selected identities", async ({
  page,
}) => {
  await page.goto("themes/cipher/");
  await page
    .getByRole("button", { name: "Revoke access", exact: true })
    .click();
  await expect(page.locator('.review-detail [role="status"]')).toContainText(
    "Alex Morgan: Revoke access",
  );
  await page
    .getByRole("button", { name: /SR Sam Rivera Design library/ })
    .click();
  await page.getByRole("button", { name: "Keep access", exact: true }).click();
  await expect(page.locator('.review-detail [role="status"]')).toContainText(
    "Sam Rivera: Keep access",
  );
  await expect(page.locator(".review-nav")).toContainText("2 of 3 reviewed");
});

test("Stack navigates search results and simulates a named event", async ({
  page,
}) => {
  await page.goto("themes/stack/");
  await page.getByLabel("Search documentation").fill("webhook");
  await page.getByRole("button", { name: "Webhooks", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Let your services talk.",
  );
  await page.getByRole("button", { name: "npm", exact: true }).click();
  await expect(page.locator(".installation pre")).toContainText(
    "npm install @stack/client",
  );
  await page.getByLabel("Event name", { exact: true }).fill("order.completed");
  await page.getByRole("button", { name: "Send sample event" }).click();
  await expect(page.locator('#playground [role="status"]')).toContainText(
    "order.completed",
  );
  await expect(page.locator('#playground [role="status"]')).toContainText(
    "local-simulation",
  );
});

test("Flux adds and edits a step, simulates the workflow and resets it", async ({
  page,
}) => {
  await page.goto("themes/flux/");
  await page.getByRole("button", { name: "Add a step", exact: true }).click();
  await page
    .getByRole("button", { name: "Send an email", exact: true })
    .click();
  await page
    .getByLabel("Step name", { exact: true })
    .fill("Send welcome email");
  await page.getByRole("button", { name: "Test workflow" }).click();
  await expect(page.locator(".success")).toHaveText("All 5 steps completed.");
  await expect(page.locator(".activity")).toContainText(
    "Send welcome email — completed",
  );
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.getByRole("button", { name: "Builder", exact: true }).click();
  await expect(page.locator(".node")).toHaveCount(4);
});

test("Loom filters textiles and creates an editable sample collection", async ({
  page,
}) => {
  await page.goto("themes/loom/");
  await page.getByRole("button", { name: "Linen", exact: true }).click();
  await expect(page.locator(".material")).toHaveCount(1);
  await page.locator(".material").click();
  await expect(page.locator(".material-story h2")).toHaveText("Natural linen");
  await page.getByRole("button", { name: "Add to sample box" }).click();
  await expect(page.locator(".chosen-samples")).toContainText("Natural linen");
  await page.getByRole("button", { name: "Prepare sample request" }).click();
  await expect(page.locator(".sample-box .status")).toContainText(
    "1-material sample request",
  );
  await page
    .getByRole("button", { name: "Remove Natural linen", exact: true })
    .click();
  await expect(page.locator(".sample-box .empty")).toBeVisible();
});

test("Vault adjusts cover preferences and saves a selected local plan summary", async ({
  page,
}) => {
  await page.goto("themes/vault/");
  await page.getByLabel("Your home", { exact: true }).selectOption("House");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /The whole picture/ }).click();
  await page.getByRole("button", { name: "Save plan summary" }).click();
  await expect(page.locator(".saved")).toContainText(
    "the whole picture summary",
  );
  await expect(page.locator(".saved")).toContainText("€33/month");
  await expect(page.locator(".plan-summary")).toContainText("House");
});

test("Harbor filters vessels, acknowledges a handover and exports the manifest", async ({
  page,
}) => {
  await page.goto("themes/harbor/");
  await page.getByRole("button", { name: "Inbound", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Pacific Meridian", exact: true })
    .click();
  await expect(page.locator(".vessel-detail h2")).toHaveText(
    "Pacific Meridian",
  );
  await page.getByRole("button", { name: "Acknowledge handover" }).click();
  await expect(page.locator(".handover-status")).toContainText(
    "Pacific Meridian: handover acknowledged locally.",
  );
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export manifest" }).click();
  expect((await pending).suggestedFilename()).toBe("harbor-demo-manifest.csv");
  await page.getByLabel("Search vessels").fill("missing");
  await expect(page.locator(".empty")).toContainText("No vessels match");
});

test("Alloy explores a project stage and prepares a validated local project brief", async ({
  page,
}) => {
  await page.goto("themes/alloy/");
  await page
    .getByRole("button", { name: /Residential A quieter interior/ })
    .click();
  await expect(page.locator(".project-caption h2")).toHaveText(
    "A quieter interior",
  );
  await page.getByRole("button", { name: "3 Build", exact: true }).click();
  await expect(page.locator(".stage-content h3")).toHaveText(
    "Turn decisions into places.",
  );
  await page
    .getByLabel("Project type", { exact: true })
    .selectOption("Adaptive reuse");
  await page
    .getByLabel("Your email", { exact: true })
    .fill("hello@example.com");
  await page.getByRole("button", { name: "Prepare project brief" }).click();
  await expect(page.locator(".brief .status")).toContainText(
    "adaptive reuse brief",
  );
  await expect(page.locator(".brief .status")).toContainText(
    "No message has been sent.",
  );
});

test("Circuit completes a three-step local repair plan and starts again", async ({
  page,
}) => {
  await page.goto("themes/circuit/");
  await page.getByRole("button", { name: "Laptop", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("button", { name: "Battery trouble", exact: true })
    .click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("button", { name: "Friday, 11:00", exact: true })
    .click();
  await expect(page.locator(".repair-price")).toContainText("€89");
  await page.getByRole("button", { name: "Prepare repair plan" }).click();
  await expect(page.locator('.confirmed [role="status"]')).toContainText(
    "laptop repair plan for friday, 11:00",
  );
  await page.getByRole("button", { name: "Start another repair" }).click();
  await expect(page.locator(".device-grid")).toBeVisible();
});
