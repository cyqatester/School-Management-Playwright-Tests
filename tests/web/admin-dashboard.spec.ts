import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';
import { ROLES } from '../../constants/roles';

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

        //Create account Section
        await adminDashBoardPage.expectFirstNameCreateAccountLabelVisible();
        await adminDashBoardPage.expectLastNameCreateAccountLabelVisible();
        await adminDashBoardPage.expectUsernameCreateAccountLabelVisible();
        await adminDashBoardPage.expectPasswordCreateAccountLabelVisible();
        await adminDashBoardPage.expectCreateButtonVisible();
    });

    test('Web - Admin user adds new admin user', async ({ loginPage, adminDashBoardPage }) => {
        await loginPage.open();
        await loginPage.signIn(env.username!, env.password!);
        await loginPage.expectSignedIn();

        //Create Account Section
        await adminDashBoardPage.expectCreateAccountHeaderVisible();
        await adminDashBoardPage.expectCreateButtonVisible();

        //Inputs in Create Account Section - add new admin user
        await adminDashBoardPage.createAccountForm('Admin', 'One', 'Admin1', 'admin1234', ROLES.ADMIN);
        await adminDashBoardPage.expectAdminUserExistsInManageAccounts('Admin1', 'Admin One');
    });

    test('Web - Admin user deletes admin user', async ({ loginPage, adminDashBoardPage }) => {
        await loginPage.open();
        await loginPage.signIn(env.username!, env.password!);
        await loginPage.expectSignedIn();

        //Create Account Section
        await adminDashBoardPage.expectCreateAccountHeaderVisible();
        await adminDashBoardPage.expectCreateButtonVisible();

        //Inputs in Create Account Section - add new admin user
        await adminDashBoardPage.createAccountForm('Admin', 'Two', 'Admin2', 'admin1234', ROLES.ADMIN);
        await adminDashBoardPage.expectAdminUserExistsInManageAccounts('Admin2', 'Admin Two');

        //Deletes an existing admin user
        await adminDashBoardPage.deleteAdminUser('Admin2');
    });
});
