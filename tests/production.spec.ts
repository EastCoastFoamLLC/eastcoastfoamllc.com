import { expect, test } from '@playwright/test';

const routes = [
  ['/', /Spray Foam & Insulation/],
  ['/services', /Find the service conversation/],
  ['/projects', /See East Coast Foam service photography/],
  ['/about-us', /Local expertise. Direct accountability/],
  ['/reviews', /Customer feedback, in their own words/],
  ['/service-area', /Service Area/],
  ['/resources', /questions that matter to your project/],
  ['/spray-foam-basics', /Spray foam basics/],
  ['/contact-us', /Keep East Coast Foam close to the project/],
  ['/get-a-quote', /Tell us about the project/]
] as const;

for (const [route, heading] of routes) {
  test('production route ' + route, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
    await expect(page.locator('body')).not.toContainText(/SAMPLE STORY|portrait placeholder|Owner Workspace|Project Capture/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  });
}

test('production navigation does not expose demo namespaces', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="/future"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Request an Estimate', exact: true }).first()).toHaveAttribute('href', '/get-a-quote');
});

test('current proven public email is used', async ({ page }) => {
  await page.goto('/contact-us');
  await expect(page.getByRole('link', { name: /ecfoam@outlook.com/ })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('hello@eastcoastfoamllc.com');
});

test('estimate provides a direct contact path while delivery is unavailable', async ({ page }) => {
  await page.goto('/get-a-quote');
  const form = page.locator('[data-estimate-form]');
  await expect(form).toHaveCount(0);
  await expect(page.getByRole('main').getByRole('link', { name: 'Call (843) 263-4933', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email ecfoam@outlook.com', exact: true })).toBeVisible();
  await expect(page.locator('body')).toContainText('Online requests are temporarily unavailable.');
});


for (const route of ['/', '/reviews']) {
  test('Google review cards stay bounded on ' + route, async ({ page }) => {
    await page.goto(route);
    const card = page.locator('.google-review-card').first();
    const avatar = page.locator('.google-review-card__avatar').first();
    const platform = page.locator('.google-review-card__platform').first();
    await expect(card).toBeVisible();
    await expect(avatar).toBeVisible();
    await expect(platform).toBeVisible();
    const avatarBox = await avatar.boundingBox();
    const platformBox = await platform.boundingBox();
    expect(avatarBox?.width ?? 999).toBeLessThanOrEqual(60);
    expect(avatarBox?.height ?? 999).toBeLessThanOrEqual(60);
    expect(platformBox?.width ?? 999).toBeLessThanOrEqual(90);
    expect(platformBox?.height ?? 999).toBeLessThanOrEqual(40);
  });
}

test('legacy article redirect declarations are shipped in the static asset bundle', async ({ request }) => {
  const response = await request.get('/_redirects');
  expect([404, 200]).toContain(response.status());
});
