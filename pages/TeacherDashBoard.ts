import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../support/env';

export class TeacherDashBoard extends BasePage {
    readonly teacherPortalHeader: Locator;
    readonly myProfileTeacherHeader: Locator;
    readonly assignedStudentsHeader: Locator;
    readonly addStudentSummary: Locator;
    
    constructor(page: Page) {
        super(page);
        this.teacherPortalHeader = page.getByText('TEACHER PORTAL');
        this.myProfileTeacherHeader = page.getByRole('heading', { name: 'My profile · TEACHER', exact: true });
        this.assignedStudentsHeader = page.getByRole('heading', { name: 'Assigned students', exact: true });
        this.addStudentSummary = page.locator('summary', { hasText: 'Add student' });
    }

    async expectMyProfileTeacherHeaderVisible(): Promise<void> {
        await expect(this.myProfileTeacherHeader).toBeVisible();
    }

    async expectTeacherPortalHeaderVisible(): Promise<void> {
        await expect(this.teacherPortalHeader).toBeVisible();
    }

    async expectAssignedStudentsHeaderVisible(): Promise<void> {
        await expect(this.assignedStudentsHeader).toBeVisible();
    }

    async expectAddStudentSummaryVisible(): Promise<void> {
        await expect(this.addStudentSummary).toBeVisible();
    }
}
