import { test, expect } from '@playwright/test';
import urls from '../config/urls';

test.skip('headerNav', async ({ page }) => {
  await page.goto(urls.preview.home);
  await page.getByText('MENU Neutrals Rules & Clauses').click();
  await expect(page.getByLabel('Neutrals').getByRole('link', { name: 'Neutrals' })).toBeVisible();
  await expect(page.getByLabel('Primary Navigation Menu').getByRole('link', { name: 'Rules & Clauses' })).toBeVisible();
  await expect(page.getByLabel('Locations').getByRole('link', { name: 'Locations' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ADR Services' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Practice Areas & Industries' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'News & Insights' })).toBeVisible();
  await expect(page.getByLabel('Primary Navigation Menu').getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Search keyword' })).toBeVisible();
  await expect(page.locator('.logo')).toBeVisible();
    
})

test.skip('headerUI', async ({ page }) => {

    await page.goto(urls.preview.home);
    const header = await page.locator('header');  
    await expect(header).toHaveScreenshot('header.png', {maxDiffPixelRatio: 0.01});
});