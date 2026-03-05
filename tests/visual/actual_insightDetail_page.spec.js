import{test, expect} from '@playwright/test';
import urls from '../../config/urls';
import { hideElement } from '../../config/utils'; 

test('actual_insightDetail_page', {tag: ['@visual']}, async ({ page }, testInfo) => {
  
    const url = urls.base +"/insight/2026/when-arbitration-agreements-go-too-far-lessons-from-cook-and-ramirez";

  await page.goto(url);

  ////await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.waitFor();
  await oneTrust.click();

  await hideElement(page, '.header');
  //await hideElement(page, '.subscribe-banner-container');
  await hideElement(page, '[data-component-name="footer"]');

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
  const screenshotName = `${projectName}-insightDetailPage.png`;

  await expect(page.locator('//main')).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.02,
    fullPage: true,
  });

});