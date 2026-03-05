import { test, expect } from '@playwright/test';
import urls from '../../config/urls';
import { handleCookiesBanner } from '../../config/utils';

async function collectLinks(page, pageUrl) {
  const allHrefs = await page.$$eval('a[href]', (anchors) =>
    anchors
      .map((a) => {
        if (a instanceof HTMLAnchorElement) {
          return a.href;
        }
        return null;
      })
      .filter((href) => !!href)
  );

  console.log(`All raw hrefs on ${pageUrl}:`, allHrefs);

  const unique = Array.from(new Set(allHrefs));
  const origin = new URL(urls.base).origin;

  const filtered = unique.filter((href) => {
    if (!href) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;

    try {
      const u = new URL(href);
      if (u.origin !== origin) return false;
      return true;
    } catch {
      return false;
    }
  });

  console.log(`Filtered internal hrefs on ${pageUrl}:`, filtered);
  return filtered;
}

test.describe('Broken link check', () => {
  test('no broken links on key entry pages', { tag: ['@functional'] }, async ({ page, request }, testInfo) => {

    if (testInfo.project.name === 'iPhone 12 Pro') {
        test.skip(); // or: test.skip(true, 'Not supported on mobile');
      }
      
    const pagesToScan = [
      urls.base,
      //`${urls.base}/adr`,
     //`${urls.base}/mediation`,
      `${urls.base}/neutrals`,
      `${urls.base}/about`,
      `${urls.base}/locations`,
    ];

    const linksToCheck = new Set();

    for (const url of pagesToScan) {
      await page.goto(url);
      const links = await collectLinks(page, url);
      links.forEach((link) => linksToCheck.add(link));
    }

    console.log('Final set of unique internal links to check:', Array.from(linksToCheck));

    const failures = [];

    for (const href of linksToCheck) {
      console.log('links = ', href);
      const response = await request.get(href, { maxRedirects: 5 });
      const status = response.status();

      if (status >= 400) {
        failures.push({ href, status });
      }
    }

    if (failures.length > 0) {
      console.error('Broken links found:', failures);
    }

    expect(failures, 'There should be no broken internal links on key pages').toHaveLength(0);
  });
});

