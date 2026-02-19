

export async function hideElement(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.style.display = 'none';
  }, selector);
}