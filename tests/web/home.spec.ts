import { test } from '../../fixtures/test-fixtures';

test('application base page responds', async ({ homePage }) => {
  await homePage.open();
});

