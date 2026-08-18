import { test, expect } from '@playwright/test';
import { DarkWebMonitorPage } from '../pages/dark-web-monitor.page';

const platforms = [
  {
    name: 'Linux',
    url: /\/download\/linux\//,
  },
  {
    name: 'Android',
    url: /\/download\/android\//,
  },
];

for (const platform of platforms) {
  test(`footer navigation to ${platform.name} download page`, async ({ page }) => {
    const darkWebMonitorPage = new DarkWebMonitorPage(page);

    await darkWebMonitorPage.open();
    await darkWebMonitorPage.acceptCookiesIfVisible();
    await darkWebMonitorPage.openFooterApps();
    await darkWebMonitorPage.clickPlatform(platform.name);

    await expect(page).toHaveURL(platform.url);
  });
}