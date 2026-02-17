import{test, expect} from '@playwright/test';
import urls from '../config/urls';

const uris =['/locations/phoenix', 
             '/locations/centurycity',
             '/locations/sacramento'            
            ];


uris.forEach((uri) => {

test('actual_location_details_page_' + uri.split('/')[2], {tag: ['@actual']}, async ({ page }, testInfo) => {
  
    const url = urls.base + uri;

  await page.goto(url);

  ////await page.waitForLoadState('networkidle');

  const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
  await oneTrust.waitFor();
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
  const screenshotName = `${projectName}-locationDetails-${uri.split('/')[2]}.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.01,
    fullPage: true,
  });

});

});