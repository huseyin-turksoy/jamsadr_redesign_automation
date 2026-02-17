import{test, expect} from '@playwright/test';
import urls from '../config/urls';

test('actual_contactUs_page', {tag: ['@actual','@forms']}, async ({ page }, testInfo) => {
  
    const url = urls.base +"/contact";

  await page.goto(url);

  //await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.click();

  // scroll the page to load lazy loaded images
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let scrolls = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, window.innerHeight);
        scrolls++;
        if (scrolls >= 12) {
          clearInterval(interval);
          window.scrollTo(0, 0);
          resolve(null);
        }
      }, 250);
    });
  });


  // naming the screenshot based on the project name (e.g. Firefox, Mobile)
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-contactUsPage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.01,
    fullPage: true,
  });

   


});


test('actual_newCaseInquiry_page', {tag: ['@actual','@forms']}, async ({ page }, testInfo) => {

    const url = urls.base +"/contact";

  await page.goto(url);

  //await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.waitFor();
  await oneTrust.click();

  await page.getByText('New Case Inquiry Request').click();
  await page.getByRole('textbox', { name: 'First Name* First Name* First' }).click();
  await page.getByRole('textbox', { name: 'First Name* First Name* First' }).fill('testuser');
  await page.getByRole('textbox', { name: 'Last Name* Last Name* Last' }).click();
  await page.getByRole('textbox', { name: 'Last Name* Last Name* Last' }).fill('lastname');
  await page.getByRole('textbox', { name: 'Company Company Company' }).click();
  await page.getByRole('textbox', { name: 'Company Company Company' }).fill('nmq');
  await page.getByRole('textbox', { name: 'Email* Email* Email* Email*' }).click();
  await page.getByRole('textbox', { name: 'Email* Email* Email* Email*' }).fill('testeruser@nmqdigital.com');
  await page.locator('#state-select').first().selectOption('Alabama');
  await page.getByRole('textbox', { name: 'City* City* City* City*' }).click();
  await page.getByRole('textbox', { name: 'City* City* City* City*' }).fill('test city');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('Primary JAMS Location')).toBeVisible();

  // scroll the page to load lazy loaded images
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let scrolls = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, window.innerHeight);
        scrolls++;
        if (scrolls >= 12) {
          clearInterval(interval);
          window.scrollTo(0, 0);
          resolve(null);
        }
      }, 250);
    });
  });

  // naming the screenshot based on the project name (e.g. Firefox, Mobile)
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-newCaseInquiryPage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.01,
    fullPage: true,
  });


});