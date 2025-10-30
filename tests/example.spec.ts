import { test, expect } from '@playwright/test';

test.describe.only('initial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('has title', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.fail('navigation', async ({ page }) => {
  await page.goto('https://www.letskodeit.com/practice');
  await page.getByRole('button', { name: 'Open Window' }).click();
  await page.locator('#benzradio').check();
  await page.locator('#checkbox-example-div').screenshot({ path: 'screenshots/screenshotFile1.png' });

  // Go back to previous page
  await page.goBack();

  await page.goForward();

});


test('selector test', {
  annotation: {
    type: 'issue',
    description: 'description',
  },
}, async ({ page }) => {
  await page.goto('https://www.letskodeit.com/practice');
  await page.getByRole('button', { name: 'Open Window' }).click();
  await page.locator('#benzradio').check();

  //best practice, dont add waits
  //await page.waitForSelector('#bmwradio', { state: 'visible' });
  //await expect(page.getByRole('button', { name: 'Open Window' })).toBeVisible();

  await page.getByRole('button', { name: 'Open Window' });
  await page.locator('#checkbox-example-div').screenshot({ path: 'screenshots/screenshotFile1.png' });

  //await page.waitForSelector('#bmwradio', { state: 'visible' });
  //await expect(page.getByRole('button', { name: 'Open Window' })).toBeVisible();
  //await page.getByRole('button', { name: 'Open Window' });

});

test.fixme('Switching tabs and Windows Test', async ({ page }) => {

  await page.goto('https://www.letskodeit.com/practice');

  const [newTab] = await Promise.all([
    page.waitForEvent('popup'), //wait for the new tab to open
    await page.getByRole('link', { name: 'Open Tab' }).click()
  ]);

  await newTab.waitForLoadState();
  console.log('New tab url: ', newTab.url());
  await newTab.getByRole('textbox', { name: 'Search Course' }).fill('Course example');

});
test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, 'Home page not working in mobile yet');

  await page.goto('https://www.letskodeit.com/practice');
});
test.only('tab test @slow', async ({ page }) => {

  await page.goto('https://www.letskodeit.com/practice');
  const newTab = page.waitForEvent('popup');
  await page.locator('#opentab').click();
  const popup = await newTab;

  await expect(popup).toHaveURL('https://www.letskodeit.com/courses');
  await popup.getByRole('textbox', { name: 'Search Course' }).fill('Course example');

});
test.afterEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, 'Home page not working in mobile yet');

  await page.goto('https://www.letskodeit.com/practice');
});

test.describe('group iframe & selector', {
  tag: '@report',
}, () => {
  test('iFrame example', async ({ page }) => {

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
  test('selector test', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice');
    await page.getByRole('button', { name: 'Open Window' }).click();
    await page.locator('#benzradio').check();
  });
});

