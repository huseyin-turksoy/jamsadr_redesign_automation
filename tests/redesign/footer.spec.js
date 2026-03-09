import { test, expect } from '@playwright/test';
import urls from '../../config/urls';
import {handleCookiesBanner} from '../../config/utils'

test('footer', {tag: ['@redesign']}, async ({ page }) => {

  await page.goto(urls.base);
  await handleCookiesBanner(page);
  await expect(page.getByText('Need to submit a case with').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Need to submit a case with' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go to Home Page' })).toBeVisible();
  await expect(page.getByText('Stay updated on the latest in')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Footer Menu' })).toBeVisible();
  await expect(page.locator('section').filter({ hasText: 'Disclaimer This website is' })).toBeVisible();
  

});


test('footerUI', {tag: ['@redesign']}, async ({ page }) => {

  await page.goto(urls.base);
  await handleCookiesBanner(page);

  const footer = page.locator('footer[data-component-name="footer"]'); 
  
  await page.waitForSelector('.footer-content-social-links');
  /*
  await page.evaluate(() => {
    const el = document.querySelector('.footer-content-social-links');
    
    if (el) el.style.display = 'none';
  }); */

  await expect(footer).toHaveScreenshot('footer.png', {
    maxDiffPixelRatio: 0.02,
    //mask: [page.locator('.footer-content-social-links')]
  });


});