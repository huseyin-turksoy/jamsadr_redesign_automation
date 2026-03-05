import{test, expect} from '@playwright/test';
import urls from '../../config/urls';
import { hideElement } from '../../config/utils'; 

test('actual_home_page', {tag: ['@visual']}, async ({ page }, testInfo) => {
  
    const url = urls.base;

  await page.goto(url);

  //await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.waitFor();
  await oneTrust.click();

  await hideElement(page, '.header');
  //await hideElement(page, '.subscribe-banner-container');
  await hideElement(page, '[data-component-name="footer"]');

  // Lazy loaded görselleri yüklemek için sayfayı scroll et
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

  // Sayfanın tamamen yüklenmesini bekle
  ////await page.waitForLoadState('networkidle');

  // Proje adına göre farklı screenshot ismi ver (ör. Firefox, Mobile)
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-fullHomePage.png`;

  await expect(page.locator('//main')).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.02,
    fullPage: true,
  });

});