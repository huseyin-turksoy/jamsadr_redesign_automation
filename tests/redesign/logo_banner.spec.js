import { test, expect } from '@playwright/test';
import urls from '../../config/urls';

test.skip('logo_banner', {tag: ['@redesign']}, async ({ page }) => {

  await page.goto(urls.dev+"/test");

  await expect(page.getByRole('heading', { name: 'JAMS serves as the arbitral' }).first()).toBeVisible();
  await expect(page.locator('li:nth-child(1) > .coh-container > .coh-link').first()).toBeVisible();
  await expect(page.locator('li:nth-child(2) > .coh-container > .coh-link').first()).toBeVisible();
  await expect(page.locator('li:nth-child(3) > .coh-container > .coh-link').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'US Center for SafeSport' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Horseracing Integrity &' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Women’s Tennis Association' }).first()).toBeVisible();
  await expect(page.getByText('The US Center for SafeSport').first()).toBeVisible();
  await expect(page.getByText('The Horseracing Integrity &').first()).toBeVisible();
  await expect(page.getByText('The Women\'s Tennis').first()).toBeVisible();
  
});

test('logoBannerUI', {tag: ['@redesign']}, async ({ page }) => {

  await page.goto(urls.dev+"/test");

  const logoBanner = page.locator('section[data-component-name="practice-banner"]').first(); 
  
  //await page.waitForSelector('.footer-content-social-links');
  /*
  await page.evaluate(() => {
    const el = document.querySelector('.footer-content-social-links');
    
    if (el) el.style.display = 'none';
  }); */

  await expect(logoBanner).toHaveScreenshot('logoBanner.png', {
    maxDiffPixelRatio: 0.02,
    //mask: [page.locator('.practice-banner-list-item img').first(), page.locator('.practice-banner-list-item img').nth(1), page.locator('.practice-banner-list-item img').nth(2)]
    
  });


});


