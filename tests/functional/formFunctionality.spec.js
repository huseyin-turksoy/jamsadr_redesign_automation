import { test, expect } from '@playwright/test';
import urls from '../../config/urls';

test('contactUs form submission - new case inquiry', { tag: ['@functional'] }, async ({ page }, testInfo) => {
    
    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

  await page.goto(urls.base +'/contact');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByText('New Case Inquiry Request').click();
  await page.getByRole('textbox', { name: 'First Name* First Name* First' }).click();
  await page.getByRole('textbox', { name: 'First Name* First Name* First' }).fill('form test');
  await page.getByRole('textbox', { name: 'Last Name* Last Name* Last' }).click();
  await page.getByRole('textbox', { name: 'Last Name* Last Name* Last' }).fill('test');
  await page.getByRole('textbox', { name: 'Company Company Company' }).click();
  await page.getByRole('textbox', { name: 'Company Company Company' }).fill('nmq');
  await page.getByRole('textbox', { name: 'Email* Email* Email* Email*' }).click();
  await page.getByRole('textbox', { name: 'Email* Email* Email* Email*' }).fill('formtest@nmqdigital.com');
  await page.locator('#state-select').first().selectOption('Maryland');
  await page.getByRole('textbox', { name: 'City* City* City* City*' }).click();
  await page.getByRole('textbox', { name: 'City* City* City* City*' }).fill('test city');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Primary JAMS Location').selectOption('Atlanta, Georgia');
  await page.getByRole('radio', { name: 'Not sure' }).check();
  await page.getByRole('radio', { name: '+ days' }).check();
  await page.getByRole('textbox', { name: 'Please use this space to' }).click();
  await page.getByRole('textbox', { name: 'Please use this space to' }).fill('this is a test submission please ignore - playwright test automation submission');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();

});


test.only('contactUs form submission - case related support', {tag : ['@functional'] }, async ({ page }, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

    await page.goto(urls.base +'/contact');
    await page.getByRole('button', { name: 'Accept All Cookies' }).click();
    await page.getByText('Case Related Support E.g.').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('1');
    await page.getByRole('textbox').nth(1).fill('1');
    await page.getByRole('textbox').nth(2).fill('1');
    await page.getByRole('textbox').nth(3).fill('1');
    await page.getByRole('textbox').nth(4).fill('1');
    await page.getByRole('textbox').nth(5).fill('1');
    await page.locator('input:nth-child(7)').first().fill('1');
    await page.locator('input:nth-child(8)').first().fill('1');
    await page.locator('input:nth-child(9)').first().fill('1');
    await page.locator('input:nth-child(10)').first().fill('1');
    await page.getByRole('textbox', { name: 'Subject*' }).click();
    await page.getByRole('textbox', { name: 'Subject*' }).fill('test automation submission');
    await page.getByRole('textbox', { name: 'Questions / Comments (provide' }).click();
    await page.getByRole('textbox', { name: 'Questions / Comments (provide' }).fill('this is a test submission please ignore');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#firstName').nth(1).click();
    await page.locator('#firstName').nth(1).fill('test name');
    await page.locator('#lastName').nth(1).click();
    await page.locator('#lastName').nth(1).fill('test surname');
    await page.locator('#company').nth(1).click();
    await page.locator('#company').nth(1).fill('nbmq');
    await page.locator('#email').nth(1).click();
    await page.locator('#email').nth(1).fill('testsubmission@nmqdigital.com');
    await page.locator('#state-select').nth(1).selectOption('Maine');
    await page.locator('#city').nth(1).click();
    await page.locator('#city').nth(1).fill('test city');
    await page.getByLabel('JAMS Location', { exact: true }).selectOption('Milwaukee, Wisconsin');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();

});