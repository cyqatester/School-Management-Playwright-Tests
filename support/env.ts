export const env = {
  username: process.env.E2E_USERNAME,
  password: process.env.E2E_PASSWORD,
  usernameSelector: process.env.LOGIN_USERNAME_SELECTOR ?? 'input[name="username"]',
  passwordSelector: process.env.LOGIN_PASSWORD_SELECTOR ?? 'input[name="password"]',
  submitSelector: process.env.LOGIN_SUBMIT_SELECTOR ?? 'button[type="submit"]',
  expectedAfterLogin: process.env.EXPECTED_AFTER_LOGIN
};

export const hasTestCredentials = (): boolean =>
  Boolean(env.username && env.password);
