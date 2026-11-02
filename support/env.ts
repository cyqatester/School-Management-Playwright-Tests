import dotenv from 'dotenv';
import path from 'node:path';

// TEST_ENV selects .env.dev, .env.qa, or .env.prod.
export const environment = (process.env.TEST_ENV ?? 'dev').toLowerCase();
const supportedEnvironments = ['dev', 'qa', 'prod'];

if (!supportedEnvironments.includes(environment)) {
  throw new Error(
    `Unsupported TEST_ENV "${environment}". Use one of: ${supportedEnvironments.join(', ')}`
  );
}

const envFile = path.resolve(process.cwd(), `.env.${environment}`);
const result = dotenv.config({ path: envFile, override: false });

if (result.error && !process.env.BASE_URL) {
  throw new Error(`Unable to load ${envFile}: ${result.error.message}. Create the file or provide BASE_URL through your CI environment.`);
}

export const env = {
  environment,
  baseURL: process.env.BASE_URL ?? 'http://localhost:8080/school-management-system/',
  username: process.env.E2E_USERNAME,
  password: process.env.E2E_PASSWORD,
  loginPath: process.env.LOGIN_PATH ?? 'login',
  usernameSelector: process.env.LOGIN_USERNAME_SELECTOR ?? 'input[name="username"]',
  passwordSelector: process.env.LOGIN_PASSWORD_SELECTOR ?? 'input[name="password"]',
  submitSelector: process.env.LOGIN_SUBMIT_SELECTOR ?? 'button[type="submit"]',
  expectedAfterLogin: process.env.EXPECTED_AFTER_LOGIN
};

export const hasTestCredentials = (): boolean =>
  Boolean(env.username && env.password);

