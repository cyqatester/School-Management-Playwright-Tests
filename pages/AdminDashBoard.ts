import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FORM_ACTION_URLS } from '../constants/form-action-urls';

export class AdminDashBoard extends BasePage {
    readonly administrationHeader: Locator;
    readonly adminDashboardHeader: Locator;
    readonly myProfileAdminHeader: Locator;
    readonly manageAccountsHeader: Locator;
    readonly createAccountHeader: Locator;
    readonly adminsButton: Locator;
    readonly teachersButton: Locator;
    readonly studentsButton: Locator;
    readonly createButton: Locator;
    readonly firstNameCreateAccountLabel: Locator;
    readonly lastNameCreateAccountLabel: Locator;
    readonly usernameCreateAccountLabel: Locator;
    readonly newPasswordCreateAccountLabel: Locator;
    readonly roleCreateAccountSelectOption: Locator;
    readonly adminRowManageAccount: Locator;

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
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.firstNameCreateAccountLabel = page.locator(FORM_ACTION_URLS.CREATE_ACCOUNT).locator('label').filter({ hasText: 'First name' });
        this.lastNameCreateAccountLabel = page.locator(FORM_ACTION_URLS.CREATE_ACCOUNT).locator('label').filter({ hasText: 'Last name' });
        this.usernameCreateAccountLabel = page.locator(FORM_ACTION_URLS.CREATE_ACCOUNT).locator('label').filter({ hasText: 'Username' });
        this.newPasswordCreateAccountLabel = page.locator(FORM_ACTION_URLS.CREATE_ACCOUNT).locator('label').filter({ hasText: 'Password' });
        this.roleCreateAccountSelectOption = page.locator('#role');
        this.adminRowManageAccount = page.locator('#admins tr');
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

    async expectCreateButtonVisible(): Promise<void> {
        await expect(this.createButton).toBeVisible();
    }

    async expectFirstNameCreateAccountLabelVisible(): Promise<void> {
        await expect(this.firstNameCreateAccountLabel).toBeVisible();
    }

    async createAccountForm(firstName: string, lastName: string, username: string, newPassword: string, role: string): Promise<void> {
        await this.firstNameCreateAccountLabel.fill(firstName);
        await this.lastNameCreateAccountLabel.fill(lastName);
        await this.usernameCreateAccountLabel.fill(username);
        await this.newPasswordCreateAccountLabel.fill(newPassword);
        await this.roleCreateAccountSelectOption.selectOption(role);
        await this.createButton.click();
    }

    async expectAdminUserExistsInManageAccounts(username: string, name: string): Promise<void> {
        const adminUserRow = this.adminRowManageAccount.filter({ hasText: username });
        await expect(adminUserRow).toBeVisible();
        await expect(adminUserRow).toContainText(name);
    }
}
