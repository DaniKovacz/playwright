# Magento Demo Site Automated Tests

This repository contains automated tests for the Magento demo site (https://magento.softwaretestingboard.com) using Playwright and JavaScript.

## Test Coverage

The test suite covers the following areas of the website:

1. **Home Page** - Tests for navigation, search, and featured products
2. **Product Listing** - Tests for product grid, sorting, and filtering
3. **Product Detail** - Tests for product information, options selection, and add to cart
4. **Shopping Cart** - Tests for cart functionality, quantity updates, and price calculations
5. **Checkout Process** - Tests for guest checkout flow and shipping/payment steps
6. **Customer Account** - Tests for account creation, login, and password reset
7. **Search Functionality** - Tests for search results and sorting
8. **Orders and Returns** - Tests for order lookup functionality

## Project Structure

```
├── helpers/
│   └── page-objects/       # Page Object Models
├── tests/                  # Test files
├── playwright.config.js    # Playwright configuration
└── package.json           # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/home-page.spec.js
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Run tests in headed mode (with browser visible):

```bash
npx playwright test --headed
```

## Test Reports

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

## Page Object Model

The tests use the Page Object Model (POM) design pattern to encapsulate page elements and actions, making the code more maintainable and readable.

Each page of the website has its own page object class in the `helpers/page-objects/` directory.

## Notes

- These tests are designed for the Magento demo site and may need adjustments for other Magento installations.
- The tests avoid completing actual orders to prevent creating real orders in the system.
- Some tests that require authentication may be skipped if valid credentials are not provided.

## License

MIT
