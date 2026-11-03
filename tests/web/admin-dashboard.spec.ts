import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - Admin Dashboard', () => {
    test('Web - Admin Dashboard loads and displays expected elements', async ({ loginPage, adminDashBoardPage, dashBoardPage }) => {
        await loginPage.open();
        await loginPage.signIn(env.username!, env.password!);
        await loginPage.expectSignedIn();

        // Admin specific headers
        await adminDashBoardPage.expectAdminHeaderVisible();
        await adminDashBoardPage.expectAdminDashboardHeaderVisible();
        await adminDashBoardPage.expectMyProfileAdminHeaderVisible();

        //My Profile Section
        await dashBoardPage.expectFirstNameProfileLabelVisible();
        await dashBoardPage.expectSaveProfileButtonVisible();
        await dashBoardPage.expectLastNameProfileLabelVisible();
        await dashBoardPage.expectUsernameProfileLabelVisible();
        await dashBoardPage.expectNewPasswordProfileLabelVisible();
        
        await adminDashBoardPage.expectManageAccountsHeaderVisible();
        await adminDashBoardPage.expectCreateAccountHeaderVisible();
        await adminDashBoardPage.expectAdminsButtonVisible();
        await adminDashBoardPage.expectTeachersButtonVisible();
        await adminDashBoardPage.expectStudentsButtonVisible();
        await adminDashBoardPage.expectCreateButtonVisible();
    });
});
