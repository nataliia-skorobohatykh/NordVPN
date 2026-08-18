import { expect, type Locator, type Page } from '@playwright/test';

export class DarkWebMonitorPage {
  readonly page: Page;
  readonly acceptCookies: Locator;
  readonly availableVpnApps: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.getByRole('button', { name: 'Accept' });
    this.availableVpnApps = page.getByRole('button', {
      name: 'Available VPN apps',
    });
  }

  async open() {
    await this.page.goto('https://nordvpn.com/features/dark-web-monitor/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async acceptCookiesIfVisible() {
    if (await this.acceptCookies.isVisible()) {
      await this.acceptCookies.click();
    }
  }

  async openFooterApps() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    if (await this.availableVpnApps.count()) {
      await this.availableVpnApps.click();
    }
  }

  async clickPlatform(platform: string) {
    const platformLink = this.page.getByRole('link', {
      name: platform,
      exact: true,
    });

    await expect(platformLink).toBeVisible();
    await platformLink.click();
  }
}