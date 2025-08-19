import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('selector test', async ({ page }) => {
  await page.goto('https://www.letskodeit.com/practice');
  await page.getByRole('button', { name: 'Open Window' }).click();
  await page.locator('#bmwradio').check();
  //best practice, dont add waits

  //await page.waitForSelector('#bmwradio', { state: 'visible' });
  //await expect(page.getByRole('button', { name: 'Open Window' })).toBeVisible();
  await page.getByRole('button', { name: 'Open Window' });
  await page.locator('#checkbox-example-div').screenshot({ path: 'screenshots/screenshotFile1.png' });

  //await page.waitForSelector('#bmwradio', { state: 'visible' });
  //await expect(page.getByRole('button', { name: 'Open Window' })).toBeVisible();
  //await page.getByRole('button', { name: 'Open Window' });

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
