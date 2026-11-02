import { test, expect } from '@playwright/test';

test('application root is reachable over HTTP', async ({ request, baseURL }) => {
  const response = await request.get(new URL('./', baseURL).toString());
  expect(response.status()).toBeLessThan(500);
});
