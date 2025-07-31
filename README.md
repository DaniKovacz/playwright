QA Automation Repository with Playwright
This repository contains automated tests for https://magento.softwaretestingboard.com/ using Playwright, a modern end-to-end testing framework.

# Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Git

# Installation
Clone the repository:

bash
git clone [repository-url]
cd [repository-name]

Install dependencies:

- bash
- npm install
or
- yarn install


# Install Playwright browsers:

bash
- npx playwright install

# Running Tests
Run all tests
bash:
- npx playwright test --reporter=list
- yarn playwright test --reporter=list


Run tests in headed mode
bash: 
- npx playwright test --headed

Run specific test file
bash:
- npx playwright test tests/example.spec.ts

Run tests for specific browser
bash: 
- npx playwright test --project=chromium 
- npx playwright test --project=firefox
- npx playwright test --project=webkit
  
Generate test report
bash: npx playwright show-report
