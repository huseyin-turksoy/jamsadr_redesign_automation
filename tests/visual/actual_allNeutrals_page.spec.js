import{test, expect} from '@playwright/test';
import urls from '../../config/urls';
import { hideElement } from '../../config/utils'; 

test('actual_allNeutrals_page', {tag: ['@visual']}, async ({ page }, testInfo) => {

  const url = urls.base +"/neutrals";

    await page.goto(url);

    //await page.waitForLoadState('networkidle');
    
    

    try {
      const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
      await oneTrust.click();

      await hideElement(page, '.header');
      //await hideElement(page, '.subscribe-banner-container');
      await hideElement(page, '[data-component-name="footer"]');    
    } catch (e) {
      console.log('OneTrust cookie banner not found, proceeding without clicking.');
    }
    
       
    // Sayfanın tamamen yüklenmesini bekle
    ////await page.waitForLoadState('networkidle');
  
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-fullAllNeutralsPage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    maxDiffPixelRatio: 0.02,
    fullPage: false, //take only visible area screenshot
  });

  

});