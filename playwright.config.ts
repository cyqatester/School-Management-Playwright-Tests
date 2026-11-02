
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';

// Select environment: dev, qa, or prod
const environment = process.env.TEST_ENV || 'dev';

// Load the corresponding environment file
const envFile = path.resolve(process.cwd(), `.env.${environment}`);
const envResult = dotenv.config({ path: envFile });

// Fail if the selected environment file cannot be loaded
if (envResult.error) {
  throw new Error(`Unable to load environment file: ${envFile}`);
}

// Read environment variables
const baseURL =
  process.env.BASE_URL ??
  'http://localhost:8080/school-management-system/';

const isCI = Boolean(process.env.CI);

// Validate required environment variables
if (!baseURL) {
  throw new Error('BASE_URL is not configured.');
}

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  timeout: 30_000,
  expect: {
    timeout: 7_000
  },

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['junit', {
      outputFile: 'test-results/junit.xml'
    }]
  ],

  use: {
    baseURL,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 15_000,

    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],

  outputDir: 'test-results/'
});
