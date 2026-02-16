import{test, expect} from '@playwright/test';
import urls from '../config/urls';

test('actual_home_page', {tag: ['@actual']}, async ({ page }, testInfo) => {
  
    const url = urls.base;

  await page.goto(url);

  await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.click();

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
  //await page.waitForLoadState('networkidle');

  // Proje adına göre farklı screenshot ismi ver (ör. Firefox, Mobile)
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-fullHomePage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.01,
    fullPage: true,
  });

});