import { test as base } from '@playwright/test';
import { SchoolManagementApi } from '../api/SchoolManagementApi';

type ApiFixtures = {
  schoolApi: SchoolManagementApi;
};

export const test = base.extend<ApiFixtures>({
  schoolApi: async ({ request, baseURL }, use) => {
    if (!baseURL) throw new Error('Playwright baseURL is not configured.');
    await use(new SchoolManagementApi(request, baseURL));
  }
});

export { expect } from '@playwright/test';
