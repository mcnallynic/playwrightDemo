import { getPopperUtilityClass } from '@mui/base';
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('selector test', async ({ page }) => {
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

/*test('Switching tabs and Windows Test', async ({ page }) => {

  await page.goto('https://www.letskodeit.com/practice');

  const [newTab] = await Promise.all([
    page.waitForEvent('popup'), //wait for the new tab to open
    await page.getByRole('link', { name: 'Open Tab' }).click()
  ]);

  await newTab.waitForLoadState();
  console.log('New tab url: ', newTab.url());
  await page.getByRole('textbox', { name: 'Search Course' }).fill('Course example');

});*/

test('New tab test', async ({ page }) => {
  await page.goto('https://www.letskodeit.com/practice');
  const newTab = page.waitForEvent('popup');
  await page.locator('#opentab').click();
  const popup = await newTab;

  await expect(popup).toHaveURL('https://www.letskodeit.com/courses');
  await popup.getByRole('textbox', { name: 'Search Course' }).fill('Course example');
});


test.only('iFrame example', async ({ page }) => {

  await page.goto('https://www.letskodeit.com/practice');

  //get inside the iframe
  const frame = page.frameLocator('iframe#courses-iframe');

  //locate the search input & type into it
  await frame.locator('input[name="course"]').fill('Playwright automation test');
  await page.screenshot({ path: 'screenshots/screenshotFile.png', fullPage: true });

  //click the search button
  await frame.locator('button.find-course').click();
  await page.screenshot({ path: 'screenshots/screenshotFile2.png', fullPage: true });

});

