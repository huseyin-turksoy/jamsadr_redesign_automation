

export async function hideElement(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.style.display = 'none';
  }, selector);
}


export async function handleCookiesBanner(page) {
  const usaBannerButton = page.locator('.banner-close-button');
  const euAcceptAllButton = page.getByRole('button', { name: 'Accept All Cookies' });

  if (await usaBannerButton.isVisible()) {
    await usaBannerButton.click();
    return;
  }

  if (await euAcceptAllButton.isVisible()) {
    await euAcceptAllButton.click();
  }
}