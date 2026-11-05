import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const previewURL = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:4321";

test("Hero visibly separates title, description, actions and portrait", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "load" });
  await expect
    .poll(() =>
      page
        .locator("[data-intro]")
        .evaluateAll(
          (elements) =>
            elements.flatMap((element) => element.getAnimations()).length,
        ),
    )
    .toBe(4);
  const stages = await page.locator("[data-intro]").evaluateAll((elements) =>
    elements.map((element) => {
      const animation = element.getAnimations()[0];
      animation.pause();
      animation.currentTime = 300;
      return Number(getComputedStyle(element).opacity);
    }),
  );
  expect(stages[0]).toBeGreaterThan(stages[1]);
  expect(stages[1]).toBeGreaterThan(stages[2]);
  expect(stages[2]).toBe(0);
  expect(stages[3]).toBe(0);
  await mkdir(".local-backup/qa/hero-stagger", { recursive: true });
  await page.screenshot({ path: ".local-backup/qa/hero-stagger/300ms.png" });
  await page.locator("[data-intro]").evaluateAll((elements) =>
    elements.forEach((element) => {
      element.getAnimations()[0].currentTime = 700;
    }),
  );
  await page.screenshot({ path: ".local-backup/qa/hero-stagger/700ms.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
  await expect(page.locator(".portrait")).toHaveCSS("opacity", "1");
});

for (const theme of ["light", "dark"] as const) {
  for (const width of [375, 768, 1280, 1440]) {
    test(`Motion at ${width}px ${theme} stays readable and accessible`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width, height: 950 },
        colorScheme: theme,
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(previewURL, { waitUntil: "load" });
      await expect
        .poll(() =>
          page
            .locator("[data-intro]")
            .evaluateAll(
              (elements) =>
                elements.flatMap((element) => element.getAnimations()).length,
            ),
        )
        .toBeGreaterThan(0);
      await expect
        .poll(() =>
          page
            .locator("[data-intro]")
            .evaluateAll(
              (elements) =>
                elements.flatMap((element) => element.getAnimations()).length,
            ),
        )
        .toBe(0);
      await expect(page.locator("h1")).toHaveCSS("opacity", "1");
      for (const diagram of await page.locator("[data-diagram]").all()) {
        const play = diagram.getByRole("button");
        await play.scrollIntoViewIfNeeded();
        await play.focus();
        await page.keyboard.press("Enter");
        await expect
          .poll(() =>
            diagram.evaluate(
              (element) => element.getAnimations({ subtree: true }).length,
            ),
          )
          .toBeGreaterThan(0);
        await expect
          .poll(() =>
            diagram.evaluate(
              (element) => element.getAnimations({ subtree: true }).length,
            ),
          )
          .toBe(0);
      }
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
      }
      await page.evaluate(() => scrollTo(0, 0));
      await expect
        .poll(() => page.evaluate(() => document.getAnimations().length))
        .toBe(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(audit.violations.map((item) => item.id)).toEqual([]);
      await mkdir(".local-backup/qa/motion", { recursive: true });
      await page.screenshot({
        path: `.local-backup/qa/motion/home-${width}-${theme}.png`,
        fullPage: true,
      });
      expect(errors).toEqual([]);
      await context.close();
    });
  }
}

test("Reveals run once; reduced-motion cancels traces and leaves content visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const experience = page.locator(".main-experience");
  await experience.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      experience.evaluate((element) => element.getAnimations().length),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      experience.evaluate((element) => element.getAnimations().length),
    )
    .toBe(0);
  await page.locator("h1").scrollIntoViewIfNeeded();
  await experience.scrollIntoViewIfNeeded();
  expect(
    await experience.evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  const diagram = page.locator('[data-diagram="ffnn"]');
  const button = diagram.getByRole("button");
  await button.scrollIntoViewIfNeeded();
  await button.focus();
  await page.keyboard.press("Space");
  await expect
    .poll(() =>
      diagram.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
  await expect(page.locator("h1")).toHaveCSS("opacity", "1");
  await expect(experience).toHaveCSS("opacity", "1");
  await page.reload();
  await expect(page.locator(".diagram-play:visible")).toHaveCount(0);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});
