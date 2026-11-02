import { test, expect } from '@playwright/test';

test('GET api/me redirects an unauthenticated visitor to login', async ({ request, baseURL }) => {
  const response = await request.get(new URL('api/me', baseURL).toString(), {
    maxRedirects: 0
  });

  // Existing application contract: unauthenticated /api/me returns 302 to /login.
  expect(response.status()).toBe(302);
  expect(response.headers()['location']).toContain('/login');
});
