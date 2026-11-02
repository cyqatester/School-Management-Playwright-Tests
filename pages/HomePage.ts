import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    const response = await this.page.goto('./');
    expect(response, 'Expected an HTTP response from the application').not.toBeNull();
    expect(response!.status()).toBeLessThan(500);
    await this.expectPageLoaded();
  }
}
