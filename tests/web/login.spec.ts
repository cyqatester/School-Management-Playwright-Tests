import { test, expect } from '@playwright/test';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - login', () => {
  test('login page loads and displays username and password fields', async ({ page }) => {
    const response = await page.goto('login');
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await expect(page.locator(env.usernameSelector)).toBeVisible();
    await expect(page.locator(env.passwordSelector)).toBeVisible();
  });

  test('valid user can sign in (optional)', async ({ page }) => {
    test.skip(!hasTestCredentials(), 'Set E2E_USERNAME and E2E_PASSWORD in .env.');
    await page.goto('login');
    await page.locator(env.usernameSelector).fill(env.username!);
    await page.locator(env.passwordSelector).fill(env.password!);
    // await page.locator(env.submitSelector).click();
    await page.getByRole('button', { name: 'Sign in', exact: true}).click();

    await expect(page).not.toHaveURL(/\/login(?:\?|$)/);
    if (env.expectedAfterLogin) {
      await expect(page).toHaveURL(new RegExp(env.expectedAfterLogin));
    }
  });
});
