import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AdminDashBoard } from '../pages/AdminDashBoard';

 type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  adminDashBoardPage: AdminDashBoard;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  adminDashBoardPage: async ({ page }, use) => {
    await use(new AdminDashBoard(page));
  }
});

export { expect };
