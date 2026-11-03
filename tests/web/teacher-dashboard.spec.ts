import { test, expect } from '../../fixtures/test-fixtures';
import { env, hasTestCredentials } from '../../support/env';

test.describe('Web - Teacher Dashboard', () => {
    test('Web - Teacher Dashboard loads and displays expected elements', async ({ loginPage, teacherDashBoardPage, dashBoardPage }) => {
        await loginPage.open();
        await loginPage.signIn('teacher', 'teacher1234'); //make sure this user is generated in users.json in Web App file by default
        await loginPage.expectSignedIn();

        // Teacher specific headers
        await teacherDashBoardPage.expectTeacherPortalHeaderVisible();
        await teacherDashBoardPage.expectMyProfileTeacherHeaderVisible();

        await dashBoardPage.expectMyDashboardHeaderVisible

        //My Profile Section
        await dashBoardPage.expectFirstNameProfileLabelVisible();
        await dashBoardPage.expectSaveProfileButtonVisible();
        await dashBoardPage.expectLastNameProfileLabelVisible();
        await dashBoardPage.expectUsernameProfileLabelVisible();
        await dashBoardPage.expectNewPasswordProfileLabelVisible();

        await teacherDashBoardPage.expectAddStudentSummaryVisible();
        await teacherDashBoardPage.expectAssignedStudentsHeaderVisible();
    });
});
