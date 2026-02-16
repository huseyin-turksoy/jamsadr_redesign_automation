import { test, expect } from '@playwright/test';
import urls from '../config/urls';

test('logo_banner', async ({ page }) => {
  await page.goto(urls.preview.practiceBanner);
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

  await page.goto(urls.preview.practiceBanner);

  const logoBanner = page.locator('.practice-banner-container').first(); 
  
  //await page.waitForSelector('.footer-content-social-links');
  /*
  await page.evaluate(() => {
    const el = document.querySelector('.footer-content-social-links');
    
    if (el) el.style.display = 'none';
  }); */

  await expect(logoBanner).toHaveScreenshot('logoBanner.png', {
    maxDiffPixelRatio: 0.01,
    mask: [page.locator('.practice-banner-list-item img').first(), page.locator('.practice-banner-list-item img').nth(1), page.locator('.practice-banner-list-item img').nth(2)]
    
  });


});


