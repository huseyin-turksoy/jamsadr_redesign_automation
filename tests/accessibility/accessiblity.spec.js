import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import urls from '../../config/urls';


test.skip('accessibility test', {tag: ['@accessibility']}, async ({ page }, testInfo) => { 

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
      }

    await page.goto(urls.base+'/neutrals/search');
    await page.getByRole('button', { name: 'Accept All Cookies' }).click();
    
    const accessibilityScan = await new AxeBuilder({ page }).analyze();

    console.log(accessibilityScan);

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScan, null, 2),
        contentType: 'application/json'
      });

    expect(accessibilityScan.violations).toEqual([]);

});