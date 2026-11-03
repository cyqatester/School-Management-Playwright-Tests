import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - Student Dashboard', () => {
    test('Web - Student Dashboard loads and displays expected elements', async ({ loginPage, studentDashBoardPage, dashBoardPage }) => {
        await loginPage.open();
        await loginPage.signIn('student', 'student1234'); //make sure this user is generated in users.json in Web App file by default
        await loginPage.expectSignedIn();

        // Student specific headers
        await studentDashBoardPage.expectStudentPortalHeaderVisible();
        await studentDashBoardPage.expectMyProfileStudentHeaderVisible();

        await dashBoardPage.expectMyDashboardHeaderVisible

        //My Profile Section
        await dashBoardPage.expectFirstNameProfileLabelVisible();
        await dashBoardPage.expectSaveProfileButtonVisible();
        await dashBoardPage.expectLastNameProfileLabelVisible();
        await dashBoardPage.expectUsernameProfileLabelVisible();
        await dashBoardPage.expectNewPasswordProfileLabelVisible();

        await studentDashBoardPage.expectMyAssignedTeachersHeaderVisible();
    });
});
