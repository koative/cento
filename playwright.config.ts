import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  use: { baseURL: "http://localhost:4173/templates/", headless: true },
  webServer: {
    command: "bun run preview --port 4173",
    url: "http://localhost:4173/templates/",
    reuseExistingServer: true,
  },
  reporter: "list",
});
