import { test, expect } from '@playwright/test';

test('application base page responds', async ({ page }) => {
  const response = await page.goto('./');
  expect(response, 'Expected an HTTP response from the application').not.toBeNull();
  expect(response!.status()).toBeLessThan(500);
  await expect(page.locator('body')).not.toBeEmpty();
});
