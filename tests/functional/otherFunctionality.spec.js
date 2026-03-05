import {test, expect} from '@playwright/test';
import urls from '../../config/urls';
import { handleCookiesBanner } from '../../config/utils';

test('404 check', {tag: ['@functional']}, async({page}, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

  await page.goto(urls.base+'/testpage');
  await handleCookiesBanner(page);
  await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
  await expect(page.locator('header').filter({ hasText: 'Page Not Found Sorry, the' }).locator('img')).toBeVisible();
  await expect(page.getByRole('link', { name: 'HOMEPAGE' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CONTACT' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'SUBMIT A CASE' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'NEWS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'EVENTS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CAREERS' })).toBeVisible();

});


test('http redirect check', async({page}, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
    }

    await page.goto('http://www.jamsadr.com/');
    await page.waitForLoadState('networkidle');
    const currenttitle = await page.title();
    const currenturl = await page.url();

    expect(currenttitle).toEqual('JAMS: Mediation, Arbitration and ADR Services');  
    expect(currenturl).toEqual('https://www.jamsadr.com/');

});



