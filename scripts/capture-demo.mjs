import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("https://tubes2-jumbo-uncut.vercel.app/", {
  waitUntil: "networkidle",
});
await page.mouse.click(720, 650);
await page.waitForTimeout(18000);
console.log((await page.locator("body").innerText()).slice(0, 5000));
console.log(
  await page.locator("input, button, select").evaluateAll((elements) =>
    elements.map((element) => ({
      tag: element.tagName,
      text: element.textContent,
      placeholder: element.getAttribute("placeholder"),
    })),
  ),
);
await mkdir(".local-backup/media", { recursive: true });
await page.screenshot({
  path: ".local-backup/media/little-alchemy.png",
  fullPage: true,
});
await writeFile(
  ".local-backup/research/demo-errors.json",
  JSON.stringify(errors, null, 2),
);
await browser.close();
