import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - login', () => {
  test('login page loads and displays username and password fields', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('valid user can sign in (optional)', async ({ loginPage, page }) => {
    test.skip(!hasTestCredentials(), 'Set E2E_USERNAME and E2E_PASSWORD in the selected environment file.');

    await loginPage.open();
    await loginPage.signIn(env.username!, env.password!);
    await loginPage.expectSignedIn();

    // Add a role-specific dashboard assertion when the application's route/heading is confirmed.
    expect(page.url()).not.toContain('/login');
  });
});
