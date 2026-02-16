import{test, expect} from '@playwright/test';
import urls from '../config/urls';

test('actual_subscribeForm_page', {tag: ['@actual', '@forms']}, async ({ page }, testInfo) => {
  
    const url = urls.base +"/subscribe";

  await page.goto(url);

  await page.waitForLoadState('networkidle');

  try {
      const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
      await oneTrust.click();    
    } catch (e) {
      console.log('OneTrust cookie banner not found, proceeding without clicking.');
    }

    if(!(await page.locator('.hbspt-form fieldset').first().isVisible())) {
        await page.reload();
        await page.waitForLoadState('networkidle');
    }

    //await page.locator('.hbspt-form fieldset').first().waitFor({ timeout: 60000 });
  

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
  const screenshotName = `${projectName}-subscribeFormPage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    //maxDiffPixelRatio: 0.01,
    fullPage: true,
  });

});