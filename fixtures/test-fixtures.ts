import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

 type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export { expect };
