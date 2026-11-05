import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 180000,
  workers: 2,
  reporter: [
    ["list"],
    ["json", { outputFile: ".local-backup/qa/playwright-results.json" }],
  ],
  use: {
    baseURL: process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:4321",
    browserName: "chromium",
    channel: "chrome",
    headless: true,
  },
});
