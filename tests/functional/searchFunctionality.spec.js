import { test, expect } from '@playwright/test';
import urls from '../../config/urls';
import { handleCookiesBanner } from '../../config/utils';

test('Neutral Search Functionality', {tag: ['@functional']}, async ({ page }, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
      }

  await page.goto(urls.base + '/neutrals/search');
  await handleCookiesBanner(page);
  await page.locator('span').filter({ hasText: 'Neutral Role' }).click();
  await page.getByTitle('Mediator').click();
  await page.getByText('Location 1').click();
  await page.getByText('Chicago', { exact: true }).click();
  await page.getByText('Practice Areas & Industries').nth(3).click();
  await page.getByTitle('Federal Law').click();
  await page.getByText('Practice Areas & Industries').nth(3).click();
  await expect(page.getByRole('button', { name: 'MediatorX' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ChicagoX' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Federal LawX' })).toBeVisible();
  await page.getByRole('heading', { name: 'Neutrals' }).click();
  await expect(page.getByRole('heading', { name: 'Neutrals' })).toBeVisible();
  await expect(page.getByRole('article').nth(1)).toBeVisible();
  await expect(page.getByRole('article').nth(2)).toBeVisible();
  await expect(page.getByRole('article').nth(3)).toBeVisible();
  await expect(page.getByRole('article').nth(4)).toBeVisible();
});


test('internal search functionality', {tag: ['@functional']}, async ({ page }, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

    await page.goto(urls.base+'/');
    await handleCookiesBanner(page);
    await page.getByRole('button', { name: 'Open search' }).click();
    await page.getByRole('combobox', { name: 'Search site' }).click();
    await page.getByRole('combobox', { name: 'Search site' }).fill('jams');
    await page.getByRole('button', { name: 'Submit search' }).click();
    await expect(page.getByRole('combobox', { name: 'Search site' })).toBeVisible();
    await expect(page.getByText('Your search for jams found')).toBeVisible();
    await expect(page.getByRole('tablist', { name: 'JAMS Landing Tabs' })).toBeVisible();
  });


test('AI search test', {tag: ['@functional']}, async ({ request }, testInfo) => {
    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

    const response = await request.post(
        'https://www.jamsadr.com/api/jams-ai-bot/proxy',
        {
          multipart: {
            message: 'I need a neutral in new york',
          },
          timeout: 30_000,
        }
      );

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    
    // "response" field must be present and of type string
    expect(typeof body.response, 'AI Bot response field should be a string').toBe('string');

    // Response must not be empty
    expect(
      body.response.length,
      'AI Bot response should not be empty'
    ).toBeGreaterThan(0);

    // At least one of: neutral search URL, id_array, or location reference must be present
    // (content may vary per call, but the structure is always expected)
    const hasSearchUrl = body.response.includes('jamsadr.com/neutrals');
    const hasIdArray = body.response.includes('id_array') || body.response.includes('id:(');
    const hasLocation = body.response.toLowerCase().includes('new york') || body.response.includes('new_york');

    expect(
      hasSearchUrl || hasIdArray || hasLocation,
      'AI Bot response should contain neutral search results or location reference'
    ).toBe(true);


});