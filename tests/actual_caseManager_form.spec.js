import{test, expect} from '@playwright/test';
import urls from '../config/urls';

test('actual_caseManager_form', {tag: ['@actual', '@forms']}, async ({ page }, testInfo) => {
  
    const url = urls.base +"/neutrals/abbott";

  await page.goto(url);

  //await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.waitFor();
  await oneTrust.click();

  await page.locator('.case-manager-cta').first().click();
  await page.getByText('JAMS Neutral Inquiry').waitFor({ timeout: 60000 });

  const modalPopup = page.locator('.modal-case-manager');


  // naming the screenshot based on the project name (e.g. Firefox, Mobile)
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-caseManagerForm.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.01,
    fullPage: false,
  });

});