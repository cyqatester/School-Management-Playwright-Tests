import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../support/env';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(env.usernameSelector);
    this.passwordInput = page.locator(env.passwordSelector);
    this.submitButton = page.getByRole('button', { name: 'Sign in', exact: true });
  }

  async open(): Promise<void> {
    await this.goto(env.loginPath);
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectSignedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/login(?:\?|$)/);
    if (env.expectedAfterLogin) {
      await expect(this.page).toHaveURL(new RegExp(env.expectedAfterLogin));
    }
  }
}
