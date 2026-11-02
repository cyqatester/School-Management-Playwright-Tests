# School Management System - Playwright Tests

Playwright + TypeScript project for browser UI and HTTP API testing.

## Included tests

### Web
- Application base page responds.
- Login page displays username and password fields.
- Optional valid-login test when dedicated E2E credentials are configured.

### API
- Unauthenticated `GET api/me` is expected to return HTTP `302`.
- The `Location` response header is expected to contain `/login`.
- Application root is reachable over HTTP.

The `/api/me` behavior is based on the existing Spring Security integration-test contract. Other authenticated API routes and payloads have not been provided, so this starter does not invent them.

## Requirements

- Node.js 20+
- npm
- School Management System running locally or deployed to Tomcat

## Install

```bash
npm install
npx playwright install chromium
```

## Configure the target URL

Copy `.env.example` to `.env`.

Spring Boot direct:
```dotenv
BASE_URL=http://localhost:8080/
```

Tomcat 11 WAR deployment:
```dotenv
BASE_URL=http://localhost:8080/school-management-system/
```

Keep the trailing slash; test paths are relative to this base URL.

## Optional login test

Set credentials for a dedicated test account in `.env`:
```dotenv
E2E_USERNAME=your_test_user
E2E_PASSWORD=your_test_password
```

The default selectors are:
```dotenv
LOGIN_USERNAME_SELECTOR=input[name="username"]
LOGIN_PASSWORD_SELECTOR=input[name="password"]
LOGIN_SUBMIT_SELECTOR=button[type="submit"]
```

Change these selectors to match the actual login page HTML. Do not commit `.env` or real credentials.

## Run

All tests:
```bash
npm test
```

Web only:
```bash
npm run test:ui
```

API only:
```bash
npm run test:api
```

Visible browser:
```bash
npm run test:headed
```

HTML report:
```bash
npm run report
```

## Project structure

```text
school-management-playwright/
├── tests/
│   ├── api/
│   │   ├── auth.spec.ts
│   │   └── health.spec.ts
│   └── web/
│       ├── home.spec.ts
│       └── login.spec.ts
├── support/
│   └── env.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Reports

- HTML: `playwright-report/`
- JUnit XML: `test-results/junit.xml`
- Failure screenshots, traces and videos: `test-results/`

## Jenkins

Run after Jenkins has deployed the WAR and confirmed the app is ready.

Windows agent:
```bat
npm ci
npx playwright install chromium
npm test
```

Linux agent:
```bash
npm ci
npx playwright install --with-deps chromium
npm test
```

Set `BASE_URL` in Jenkins to the deployed Tomcat URL.

## Expanding coverage

To build reliable role-specific and authenticated API tests, use the application's actual routes, form selectors, and API request/response contracts. Planned coverage:
- Student: view/edit own profile; view assigned teachers.
- Teacher: list/create/update/delete assigned students.
- Admin: user CRUD; assign multiple teachers; prevent deletion of original `superadmin`.
- API: authenticated access, role authorization, validation, and CRUD responses.


## GitHub Actions CI and post-deployment testing

The workflow at `.github/workflows/playwright.yml`:

1. Runs on pushes and pull requests to `main`, `master`, and `develop`.
2. Installs Node.js dependencies and checks TypeScript.
3. Runs browser and API tests when a target application URL is configured.
4. Can also be started manually from **GitHub → Actions → Playwright CI/CD Tests → Run workflow**, with a deployed `base_url`.
5. Uploads HTML reports and test results for 7 days.

### Configure GitHub Actions secrets

In the Playwright repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:

- `BASE_URL`: URL reachable from the GitHub-hosted runner, e.g. `https://your-host/school-management-system/`.
- `E2E_USERNAME`: optional dedicated test account username.
- `E2E_PASSWORD`: optional dedicated test account password.

Do not use production administrator credentials in automated tests.

If `BASE_URL` is not set, GitHub Actions still validates the TypeScript project, but skips live browser/API tests. You can provide `base_url` when manually starting the workflow.

### How this fits the deployment pipeline

For the current setup, GitHub Actions builds/tests the Java WAR and publishes it as an artifact; Jenkins retrieves that artifact and deploys it to the local Tomcat 11 server. This Playwright workflow is intended to run after deployment and test the deployed application.

A GitHub-hosted runner cannot access `localhost` on your personal Windows computer. To run the post-deployment tests against your local Tomcat, either:
- use a Jenkins agent on the same machine/network and run `npm test` after deployment; or
- use a GitHub Actions self-hosted runner on the Windows machine, then configure this workflow to use that runner.

For a public/staging deployment reachable over HTTPS, the GitHub-hosted runner can run the tests using the `BASE_URL` secret.
