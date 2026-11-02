import { expect, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = './'): Promise<void> {
    await this.page.goto(path);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page.locator('body')).not.toBeEmpty();
  }
}