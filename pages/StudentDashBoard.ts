import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../support/env';

export class StudentDashBoard extends BasePage {
    readonly studentPortalHeader: Locator;
    readonly myProfileStudentHeader: Locator;
    readonly myAssignedTeachersHeader: Locator;
    
    constructor(page: Page) {
        super(page);
        this.studentPortalHeader = page.getByText('STUDENT PORTAL');
        this.myProfileStudentHeader = page.getByRole('heading', { name: 'My profile · STUDENT', exact: true });
        this.myAssignedTeachersHeader = page.getByRole('heading', { name: 'My assigned teachers', exact: true });
    }

    async expectStudentPortalHeaderVisible(): Promise<void> {
        await expect(this.studentPortalHeader).toBeVisible();
    }

    async expectMyProfileStudentHeaderVisible(): Promise<void> {
        await expect(this.myProfileStudentHeader).toBeVisible();
    }

    async expectMyAssignedTeachersHeaderVisible(): Promise<void> {
        await expect(this.myAssignedTeachersHeader).toBeVisible();
    }
}