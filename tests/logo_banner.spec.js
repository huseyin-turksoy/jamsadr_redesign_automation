import { test, expect } from '@playwright/test';

test('logo_banner', async ({ page }) => {
  await page.goto('https://nmq-digital.gitlab.io/crownpeak/jams-adr/jams-adr-redesign-frontend-v2/practices/practice-banner/');
  await expect(page.locator('.practice-banner-title').first()).toBeVisible();

  await expect(page.locator('.practice-banner-list-item-image').first()).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-image').nth(1)).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-image').nth(2)).toBeVisible();

  await expect(page.locator('.practice-banner-list-item-title').first()).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-title').nth(1)).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-title').nth(2)).toBeVisible();

  await expect(page.locator('.practice-banner-list-item-description').first()).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-description').nth(1)).toBeVisible();
  await expect(page.locator('.practice-banner-list-item-description').nth(2)).toBeVisible();

  
});

test('logoBannerUI', async ({ page }) => {

  await page.goto('https://nmq-digital.gitlab.io/crownpeak/jams-adr/jams-adr-redesign-frontend-v2/practices/practice-banner/');

  const logoBanner = await page.locator('.practice-banner-container').first(); 
  
  //await page.waitForSelector('.footer-content-social-links');
  /*
  await page.evaluate(() => {
    const el = document.querySelector('.footer-content-social-links');
    
    if (el) el.style.display = 'none';
  }); */

  await expect(logoBanner).toHaveScreenshot('logoBanner.png');


});


