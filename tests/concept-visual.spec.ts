import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const conceptRoute = '/concept/homeowner-education';
const visualSelector = 'img[src^="/media/education/visual-003/"]';
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'phone-430', width: 430, height: 932 },
] as const;

test('VISUAL-003 concept remains noindex and all accepted visuals render responsively', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(conceptRoute);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow,noarchive');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Start with what you're noticing/i);
    await expect(page.locator('body')).toContainText('A symptom is not a diagnosis.');
    await expect(page.locator('body')).toContainText('The appropriate next step, not the largest job.');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, viewport.name + ' horizontal overflow').toBeLessThanOrEqual(1);

    const visuals = page.locator(visualSelector);
    await expect(visuals).toHaveCount(10);
    for (let i = 0; i < 10; i += 1) {
      const image = visuals.nth(i);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('alt', /\S+/);
      await expect(image).toHaveAttribute('width', /^\d+$/);
      await expect(image).toHaveAttribute('height', /^\d+$/);
      await expect(image).toHaveAttribute('loading', 'lazy');
      const metrics = await image.evaluate((el: HTMLImageElement) => ({
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        renderedWidth: el.getBoundingClientRect().width,
      }));
      expect(metrics.naturalWidth, viewport.name + ' image natural width').toBeGreaterThan(0);
      expect(metrics.naturalHeight, viewport.name + ' image natural height').toBeGreaterThan(0);
      expect(metrics.renderedWidth, viewport.name + ' image rendered width').toBeLessThanOrEqual(viewport.width);
    }
  }
});

test('VISUAL-003 accessibility smoke has no serious or critical axe findings', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(conceptRoute);
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');
  expect(blocking).toEqual([]);
});

test('VISUAL-003 does not preload the illustration library', async ({ page }) => {
  await page.goto(conceptRoute);
  await expect(page.locator('link[rel="preload"][href*="/media/education/visual-003/"]')).toHaveCount(0);
});
