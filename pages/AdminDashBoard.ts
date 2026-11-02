import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../support/env';

export class AdminDashBoard extends BasePage {
    readonly administrationHeader: Locator;
    readonly adminDashboardHeader: Locator;
    readonly myProfileAdminHeader: Locator;
    readonly manageAccountsHeader: Locator;
    readonly createAccountHeader: Locator;
    readonly adminsButton: Locator;
    readonly teachersButton: Locator;
    readonly studentsButton: Locator;
    readonly saveProfileButton: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        super(page);
        this.administrationHeader = page.getByText('Administration');
        this.adminDashboardHeader = page.getByRole('heading', { name: 'Admin dashboard', exact: true });
        this.myProfileAdminHeader = page.getByRole('heading', { name: 'My profile · ADMIN', exact: true });
        this.manageAccountsHeader = page.getByRole('heading', { name: 'Manage accounts', exact: true });
        this.createAccountHeader = page.getByRole('heading', { name: 'Create account', exact: true });
        this.adminsButton = page.getByRole('button', { name: 'Admins' });
        this.teachersButton = page.getByRole('button', { name: 'Teachers' });
        this.studentsButton = page.getByRole('button', { name: 'Students' });
        this.saveProfileButton = page.getByRole('button', { name: 'Save profile' });
        this.createButton = page.getByRole('button', { name: 'Create' });
    }

    async open(): Promise<void> {
        await this.goto(env.loginPath);
    }

    async expectAdminHeaderVisible(): Promise<void> {
        await expect(this.administrationHeader).toBeVisible();
    }

    async expectAdminDashboardHeaderVisible(): Promise<void> {
        await expect(this.adminDashboardHeader).toBeVisible();
    }

    async expectMyProfileAdminHeaderVisible(): Promise<void> {
        await expect(this.myProfileAdminHeader).toBeVisible();
    }

    async expectManageAccountsHeaderVisible(): Promise<void> {
        await expect(this.manageAccountsHeader).toBeVisible();
    }

    async expectCreateAccountHeaderVisible(): Promise<void> {
        await expect(this.createAccountHeader).toBeVisible();
    }

    async expectAdminsButtonVisible(): Promise<void> {
        await expect(this.adminsButton).toBeVisible();
    }

    async expectTeachersButtonVisible(): Promise<void> {
        await expect(this.teachersButton).toBeVisible();
    }

    async expectStudentsButtonVisible(): Promise<void> {
        await expect(this.studentsButton).toBeVisible();
    }

    async expectSaveProfileButtonVisible(): Promise<void> {
        await expect(this.saveProfileButton).toBeVisible();
    }

    async expectCreateButtonVisible(): Promise<void> {
        await expect(this.createButton).toBeVisible();
    }

    async expectSignedIn(): Promise<void> {
        await expect(this.page).not.toHaveURL(/\/login(?:\?|$)/);
        if (env.expectedAfterLogin) {
            await expect(this.page).toHaveURL(new RegExp(env.expectedAfterLogin));
        }
    }
}
