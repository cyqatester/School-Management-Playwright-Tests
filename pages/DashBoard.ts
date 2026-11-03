import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../support/env';

export class DashBoard extends BasePage {
    readonly myDashboardHeader: Locator;
    readonly saveProfileButton: Locator;
    readonly firstNameProfileLabel: Locator;
    readonly lastNameProfileLabel: Locator;
    readonly usernameProfileLabel: Locator;
    readonly newPasswordProfileLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.myDashboardHeader = page.getByRole('heading', { name: 'My dashboard', exact: true });
        this.saveProfileButton = page.getByRole('button', { name: 'Save profile' });
        this.firstNameProfileLabel = page.locator('form[action="/school-management-system/profile"]')
                                         .locator('label')
                                         .filter({ hasText: 'First name' });
        this.lastNameProfileLabel = page.locator('form[action="/school-management-system/profile"]')
                                         .locator('label')
                                         .filter({ hasText: 'Last name' });
        this.usernameProfileLabel = page.locator('form[action="/school-management-system/profile"]')
                                         .locator('label')
                                         .filter({ hasText: 'Username' });
        this.newPasswordProfileLabel = page.locator('form[action="/school-management-system/profile"]')
                                         .locator('label')
                                         .filter({ hasText: 'New password' });
    }

    async open(): Promise<void> {
        await this.goto(env.loginPath);
    }

    async expectMyDashboardHeaderVisible(): Promise<void> {
        await expect(this.myDashboardHeader).toBeVisible();
    }

    async expectSaveProfileButtonVisible(): Promise<void> {
        await expect(this.saveProfileButton).toBeVisible();
    }

    async expectFirstNameProfileLabelVisible(): Promise<void> {
        await expect(this.firstNameProfileLabel).toBeVisible();
    }

    async expectLastNameProfileLabelVisible(): Promise<void> {
        await expect(this.lastNameProfileLabel).toBeVisible();
    }

    async expectUsernameProfileLabelVisible(): Promise<void> {
        await expect(this.usernameProfileLabel).toBeVisible();
    }

    async expectNewPasswordProfileLabelVisible(): Promise<void> {
        await expect(this.newPasswordProfileLabel).toBeVisible();
    }
}
