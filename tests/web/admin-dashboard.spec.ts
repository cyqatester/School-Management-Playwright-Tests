import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - Admin Dashboard', () => {
    test('Web - Admin Dashboard loads and displays expected elements', async ({ loginPage, adminDashBoardPage, page }) => {
        await loginPage.open();
        await loginPage.signIn(env.username!, env.password!);
        await loginPage.expectSignedIn();
        await adminDashBoardPage.expectAdminHeaderVisible();
        await adminDashBoardPage.expectAdminDashboardHeaderVisible();
        await adminDashBoardPage.expectMyProfileAdminHeaderVisible();
        await adminDashBoardPage.expectManageAccountsHeaderVisible();
        await adminDashBoardPage.expectCreateAccountHeaderVisible();
    });
});
