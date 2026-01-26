import { test, expect } from '@playwright/test';

test('footer', async ({ page }) => {
  await page.goto('https://nmq-digital.gitlab.io/crownpeak/jams-adr/jams-adr-redesign-frontend-v2/');
  await expect(page.getByRole('contentinfo').getByRole('img', { name: 'JAMS Logo' })).toBeVisible();
  await expect(page.getByText('Stay updated on the latest in')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Subscribe' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Footer Menu' })).toBeVisible();
  await expect(page.locator('.footer-content-social-links')).toBeVisible();
  await expect(page.locator('section').filter({ hasText: 'Disclaimer This website is' })).toBeVisible();
  

});


test('footerUI', async ({ page }) => {

  await page.goto('https://nmq-digital.gitlab.io/crownpeak/jams-adr/jams-adr-redesign-frontend-v2/');

  const footer = await page.locator('footer'); 
  
  /** to hide an element for test purpose */
   await page.evaluate(() => {
  document.querySelector('.footer-content-social-links')?.classList.add('hidden');
  }); 

  await expect(footer).toHaveScreenshot('footer.png', { maxDiffPixelRatio: 0.005 });


});