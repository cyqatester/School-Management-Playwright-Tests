import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashBoard } from '../pages/DashBoard';
import { AdminDashBoard } from '../pages/AdminDashBoard';
import { TeacherDashBoard } from '../pages/TeacherDashBoard';
import { StudentDashBoard } from '../pages/StudentDashBoard';

 type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  dashBoardPage: DashBoard;
  adminDashBoardPage: AdminDashBoard;
  teacherDashBoardPage: TeacherDashBoard;
  studentDashBoardPage: StudentDashBoard;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashBoardPage: async ({ page }, use) => {
    await use(new DashBoard(page));
  },
  adminDashBoardPage: async ({ page }, use) => {
    await use(new AdminDashBoard(page));
  },
  teacherDashBoardPage: async ({ page }, use) => {
    await use(new TeacherDashBoard(page));
  },
  studentDashBoardPage: async ({ page }, use) => {
    await use(new StudentDashBoard(page));
  }
});

export { expect };
