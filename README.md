# School Management System – Playwright Test Automation

<p>
<picture>
  <img width="1280" height="720" alt="School_Management_Playwright_Tests" src="https://github.com/user-attachments/assets/1462b4c2-b9e2-4662-8cb8-8e7f1aa3f8e4" />
</picture>  
</p>

## 1. Name and Short Description of the Project

**School Management System – Playwright Test Automation** is an automated testing project for the School Management System web application.

Built with Playwright and TypeScript, it provides browser-based UI tests and HTTP API tests. The web tests follow the **Page Object Model (POM)** design pattern: page locators and reusable page actions are maintained separately from test scenarios. API operations are centralized in a reusable API client.

The project supports Development, QA, and Production test environments through separate environment configuration files.

## 2. Technologies

- **Playwright Test** – browser automation, assertions, API request testing, and test reporting.
- **TypeScript** – typed test code and page-object classes.
- **Node.js and npm** – JavaScript runtime and dependency management.
- **dotenv** – loads environment-specific variables.
- **cross-env** – sets the selected test environment consistently across operating systems.
- **GitHub Actions** – automated TypeScript validation and Playwright test workflow.
- **Chromium** – browser used by the configured Playwright project.

## 3. Features

### Web UI Testing

- Verify that the application base page responds.
- Verify that the login page loads.
- Verify that the username, password, and submit controls are visible.
- Optionally verify a successful login when test credentials are configured.

### API Testing

- Verify that the application root is reachable over HTTP.
- Verify the existing unauthenticated `GET api/me` behavior: HTTP `302` redirect to a location containing `/login`.

### Page Object Model

- `BasePage` provides shared browser-page functionality.
- `HomePage` and `LoginPage` contain page-specific locators and actions.
- Playwright fixtures initialize page objects for web tests.
- `SchoolManagementApi` centralizes the HTTP API operations used by API tests.

### Environment Configuration

- Separate `.env.dev`, `.env.qa`, and `.env.prod` files.
- Select an environment using `TEST_ENV`.
- Configure the application URL, test credentials, login path, and login selectors through environment variables.

### Test Reports and Diagnostics

- List reporter in the terminal.
- HTML report.
- JUnit XML report.
- Trace, screenshot, and video retained on test failure.

### GitHub Actions

- Runs on pushes and pull requests targeting `main`, `master`, or `develop`.
- Supports manual execution through `workflow_dispatch`.
- Validates TypeScript.
- Runs web and API tests when a test application `BASE_URL` is supplied.
- Uploads Playwright HTML reports and test results as workflow artifacts.

## 4. The Process

The project uses the following test execution flow:

1. **Select the environment** – choose `dev`, `qa`, or `prod` using `TEST_ENV`.
2. **Load configuration** – `support/env.ts` loads the corresponding `.env` file and makes the URL, credentials, and login settings available to the tests. Variables already supplied by the process or CI environment take precedence over values in the file.
3. **Initialize test fixtures** – web fixtures create the required page objects; API fixtures create the reusable API client.
4. **Execute web tests** – test scenarios call page-object methods rather than duplicating page locators and interactions in each test.
5. **Execute API tests** – API scenarios use `SchoolManagementApi` to send HTTP requests and assert the responses.
6. **Collect results** – Playwright produces terminal output, an HTML report, JUnit XML, and failure diagnostics.
7. **Run through GitHub Actions** – the workflow validates the project and, when `BASE_URL` is configured, runs the browser and API tests against the supplied deployment.

### Project Structure

```text
School-Management-Playwright-POM/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── api/
│   └── SchoolManagementApi.ts
├── fixtures/
│   ├── api-fixtures.ts
│   └── test-fixtures.ts
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── LoginPage.ts
├── support/
│   └── env.ts
├── tests/
│   ├── api/
│   │   ├── auth.spec.ts
│   │   └── health.spec.ts
│   └── web/
│       ├── home.spec.ts
│       └── login.spec.ts
├── screenshots/
│   └── (add application screenshots here)
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## 5. Running the Project

### Prerequisites

- Node.js 20 or later.
- npm.
- The School Management System application running at the target URL.
- Chromium installed through Playwright.

### Install Dependencies

From the project root, run:

```bash
npm ci
npx playwright install chromium
```

### Configure the Environment

Create the environment files in the project root:

- `.env.dev`
- `.env.qa`
- `.env.prod`

Use `.env.example` as a template. For example, `.env.dev` can contain:

```dotenv
BASE_URL=http://localhost:8080/school-management-system/
E2E_USERNAME=your_test_username
E2E_PASSWORD=your_test_password
LOGIN_PATH=login
LOGIN_USERNAME_SELECTOR=input[name="username"]
LOGIN_PASSWORD_SELECTOR=input[name="password"]
LOGIN_SUBMIT_SELECTOR=button[type="submit"]
```

Set the values and selectors to match the actual application. The configured default base URL is `http://localhost:8080/school-management-system/`.

Do not commit `.env.dev`, `.env.qa`, `.env.prod`, or real credentials. The `.gitignore` file excludes environment files. Use GitHub Actions repository secrets or environment secrets for CI credentials.

### Run Tests Locally

**Development**

```bash
npm run test:dev
```

**QA**

```bash
npm run test:qa
```

**Production**

```bash
npm run test:prod
```

Additional commands:

```bash
# All tests (Development by default)
npm test

# Web UI tests
npm run test:ui

# API tests (Development by default)
npm run test:api

# Run with a visible browser
npm run test:headed

# Debug tests
npm run test:debug

# Open the HTML report
npm run report

# TypeScript validation
npx tsc --noEmit
```

### Run Tests with GitHub Actions

The workflow is located at `.github/workflows/playwright.yml`.

It runs automatically for pushes and pull requests to `main`, `master`, and `develop`. It can also be started manually from **GitHub → Actions → Playwright CI/CD Tests → Run workflow**.

For browser and API tests to execute in GitHub Actions, provide a reachable application URL:

- Add a repository or environment secret named `BASE_URL`, or
- Start the workflow manually and enter the `base_url` input.

Add `E2E_USERNAME` and `E2E_PASSWORD` as GitHub secrets if the optional authenticated login test should run.

**Important:** A GitHub-hosted runner cannot access `localhost` on your personal computer. Use a publicly reachable test/staging deployment or a suitable self-hosted GitHub Actions runner to test an application running only on your local machine. Use dedicated test accounts and avoid destructive tests against Production.
