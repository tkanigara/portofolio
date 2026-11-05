import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const routes = [
  "/",
  "/projects/",
  "/projects/mai-analytics/",
  "/projects/nimonspedia/",
  "/projects/feedforward-neural-network/",
  "/projects/little-alchemy/",
  "/projects/resume-screening/",
  "/projects/luma-osjang/",
  "/resume/",
  "/404.html",
];
for (const theme of ["light", "dark"] as const) {
  for (const width of [375, 768, 1280, 1440]) {
    test(`${width}px ${theme}: routes, media, accessibility and layout`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width, height: 950 },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await mkdir(".local-backup/qa/screenshots", { recursive: true });
      for (const route of routes) {
        const response = await page.goto(`http://127.0.0.1:4321${route}`, {
          waitUntil: "networkidle",
        });
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        expect(await page.locator("html").getAttribute("data-theme")).toBe(
          theme,
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBeTruthy();
        await expect(page.locator("h1")).toBeVisible();
        for (const image of await page.locator("img").all()) {
          await image.scrollIntoViewIfNeeded();
          await expect(image).toHaveJSProperty("complete", true);
          await expect(image).not.toHaveJSProperty("naturalWidth", 0);
        }
        await page.evaluate(() => scrollTo(0, 0));
        const badImages = await page.locator("img").evaluateAll((elements) =>
          elements
            .filter(
              (image): image is HTMLImageElement =>
                image instanceof HTMLImageElement,
            )
            .filter((image) => !image.complete || !image.naturalWidth)
            .map((image) => image.src),
        );
        expect(badImages).toEqual([]);
        if (
          [
            "/",
            "/projects/",
            "/projects/nimonspedia/",
            "/projects/mai-analytics/",
            "/resume/",
          ].includes(route)
        ) {
          const accessibility = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(
            accessibility.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => n.target),
            })),
          ).toEqual([]);
          const name =
            route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
          await page.screenshot({
            path: `.local-backup/qa/screenshots/${name}-${width}-${theme}.png`,
            fullPage: true,
          });
        }
      }
      expect(errors).toEqual([]);
      await context.close();
    });
  }
}

test("Theme persistence, filters, keyboard menu, anchors, PDF view/download", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const initial = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: "Switch to" }).click();
  const changed = await page.locator("html").getAttribute("data-theme");
  expect(changed).not.toBe(initial);
  await page.reload();
  expect(await page.locator("html").getAttribute("data-theme")).toBe(changed);
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.setViewportSize({ width: 375, height: 812 });
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#main-navigation a").first()).toBeFocused();
  await page.screenshot({
    path: ".local-backup/qa/screenshots/mobile-menu.png",
  });
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Experience" })
    .click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.goto("/projects/");
  await page.getByRole("button", { name: "AI & ML", exact: true }).click();
  await expect(page.locator(".project-entry:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Systems", exact: true }).click();
  await expect(page.locator(".project-entry:visible")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("searchbox").fill("React");
  await expect(page.locator(".project-entry:visible")).toHaveCount(2);
  await page.getByRole("searchbox").fill("no-such-project");
  await expect(page.locator(".empty-projects")).toBeVisible();
  await page.goto("/resume/");
  const views = page.getByRole("link", { name: /^View .*resume PDF$/ });
  await expect(views).toHaveCount(3);
  for (const link of await views.all()) {
    const response = await context.request.get(
      (await link.getAttribute("href"))!,
    );
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  const download = page.waitForEvent("download");
  await page
    .getByRole("link", {
      name: "Download Fullstack / Software Engineer resume PDF",
    })
    .click();
  expect((await download).suggestedFilename()).toBe(
    "Muhammad-Timur-Kanigara-Fullstack.pdf",
  );
});

test("Progressive enhancement without JavaScript; system theme follows preference", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/projects/");
  await expect(page.locator(".project-entry")).toHaveCount(6);
  await expect(page.locator("#main-navigation")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await context.close();
  const auto = await browser.newContext({ colorScheme: "light" });
  const autoPage = await auto.newPage();
  await autoPage.goto("http://127.0.0.1:4321/");
  await autoPage.emulateMedia({ colorScheme: "dark" });
  await expect(autoPage.locator("html")).toHaveAttribute("data-theme", "dark");
  await auto.close();
});
