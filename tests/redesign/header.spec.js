import { test, expect } from '@playwright/test';
import urls from '../../config/urls';
import {handleCookiesBanner} from '../../config/utils'

test('headerNav', {tag: ['@redesign']}, async ({ page}, testInfo) => {
  
  if (testInfo.project.name === 'iPhone 12 Pro') {
    test.skip(); // or: test.skip(true, 'Not supported on mobile');
  }

  await page.goto(urls.base);
  await handleCookiesBanner(page);
  await expect(page.getByRole('link', { name: 'Submit a Case', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'JAMS Access Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'JAMS Pathways' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'JAMS Logo' })).toBeVisible();
  await expect(page.getByLabel('Neutrals').getByRole('link', { name: 'Neutrals' })).toBeVisible();
  await expect(page.getByLabel('Locations').getByRole('link', { name: 'Locations' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open search' })).toBeVisible();
    
})

test('headerUI', {tag: ['@redesign']}, async ({ page }) => {

    await page.goto(urls.base);
    await handleCookiesBanner(page);
    const header = await page.locator('header[data-component-name="header"]');  
    await expect(header).toHaveScreenshot('header.png', {
      maxDiffPixelRatio: 0.02
    });
});