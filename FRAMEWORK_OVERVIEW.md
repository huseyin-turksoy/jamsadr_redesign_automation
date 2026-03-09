## Jams ADR Redesign – Test Automation Framework

This repository contains an end‑to‑end UI test automation framework built on **Playwright** for the JAMS ADR Redesign Project.

### Tech stack
- **Test runner**: Playwright Test (`@playwright/test`)
- **Browsers / projects**:
  - Desktop: `Firefox`
  - Mobile: `iPhone 12 Pro`
- **Base URL configuration**: centralised in `config/urls.js` (live, stage, dev, GitLab preview)
- **Report**: Playwright HTML report, published from the `playwright-report` folder to GitHub Pages
- **Snapshots**: stored under `UI_Screen_Shots/{projectName}/...` via the custom `snapshotPathTemplate`

### Test structure
- **Root test directory**: `tests/` (configured as `testDir` in `playwright.config.js`)
- **Key subfolders**:
  - `tests/functional/` – functional coverage (forms, search, broken links, etc.)
  - `tests/visual/` – visual regression tests using `expect(...).toHaveScreenshot()` over 40 pages included
  - `tests/redesign/` – layout/regression checks for header, footer, and logo/banner for newly created components
  - `tests/accessibility/` – accessibility checks

### Test inventory (by area)
Approximate counts based on current `.spec.js` files:
- **Functional tests (`tests/functional`)**
  - `brokenLinkCheck.spec.js`
  - `formFunctionality.spec.js`
  - `otherFunctionality.spec.js`
  - `searchFunctionality.spec.js`
- **Visual tests (`tests/visual`)**
  - ~25+ page‑level specs (home, ADR, arbitration, mediation, locations, details pages, contact, about, news, events, internal search, submit case, subscription, JAMS Next, JAMS Foundation, case manager form, neutral search, all neutrals, etc.)
- **Redesign regression (`tests/redesign`)**
  - `header.spec.js`
  - `footer.spec.js`
  - `logo_banner.spec.js`
- **Accessibility (`tests/accessibility`)**
  - `accessiblity.spec.js`

### Conventions and patterns
- **Tags**:
  - Functional tests are tagged with `@functional` and can be selected in CI with `--grep "@functional"`.
  - Visual tests use `@visual` to be run separately when updating or validating snapshots.
- **Screenshots & snapshots**:
  - Per browser/device, named with the current Playwright project (e.g. `Firefox-locationsPage.png`).
  - Stored under `UI_Screen_Shots/` to keep the repo organised and CI‑friendly.
- **Utilities**:
  - `config/utils.js` provides helpers like:
    - `hideElement(page, selector)` – hides dynamic UI parts (header, footer, banners) for stable visual baselines.
    - `handleCookiesBanner(page)` – handles both US and EU cookie/banner variants so tests are region‑agnostic.

### CI & reporting
- **GitHub Actions workflow**: `.github/workflows/playwright.yml`
  - Installs dependencies and Playwright browsers.
  - Runs tests (e.g. functional suite via `--grep "@functional"`).
  - Publishes the Playwright HTML report from `./playwright-report` to **GitHub Pages**.
  - On failures, extracts failed test names and emails a summary with a direct report link.

### How to run tests locally
- **Install dependencies**:
  - `npm ci`
  - `npx playwright install`
- **Run all tests**:
  - `npx playwright test`
- **Run only functional tests**:
  - `npx playwright test --grep "@functional"`
- **Run only visual tests and update snapshots**:
  - `npx playwright test tests/visual --update-snapshots`
- **Open the last HTML report locally**:
  - `npx playwright show-report`

