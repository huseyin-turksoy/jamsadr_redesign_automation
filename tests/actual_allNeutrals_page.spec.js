import{test, expect} from '@playwright/test';
import urls from '../config/urls';

test('actual_allNeutrals_page', {tag: ['@actual']}, async ({ page }, testInfo) => {

  const url = urls.base +"/neutrals";

    await page.goto(url);

    await page.waitForLoadState('networkidle');
    
    

    try {
      const oneTrust = page.locator('#onetrust-accept-btn-handler').first();
      await oneTrust.click();    
    } catch (e) {
      console.log('OneTrust cookie banner not found, proceeding without clicking.');
    }
    
       
    // Sayfanın tamamen yüklenmesini bekle
    //await page.waitForLoadState('networkidle');
  
  const projectName = (testInfo.project && testInfo.project.name) ? testInfo.project.name : 'unknown';
  const screenshotName = `${projectName}-fullAllNeutralsPage.png`;

  await expect(page).toHaveScreenshot(screenshotName, {
    //maxDiffPixelRatio: 0.01,
    fullPage: false, //take only visible area screenshot
  });

  

});