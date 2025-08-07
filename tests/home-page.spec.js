import { test, expect } from '@playwright/test';
import HomePage from '../helpers/page-objects/home-page-po.js';

test.describe('Home Page', () => {
    let homePage;

    // Setup: Load the home page fresh for each test to ensure clean state
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homePage = new HomePage(page);
    });

    // Scenario: User lands on the home page and expects to see the correct page title
    test('Validate page title', async () => {
        await expect(homePage.page).toHaveTitle(/Home Page/);
    });

    // Scenario: User needs to navigate through the site using the main menu
    test('Validate navigation menu is visible', async () => {
        await expect(homePage.mainNavigation).toBeVisible();
    });

    // Scenario: User wants to search for products from the home page
    test('Validate search functionality', async () => {
        await homePage.searchFor('shirt');
        await expect(homePage.page).toHaveURL(/catalogsearch\/result/);
        await expect(homePage.searchResultsTitle).toContainText('shirt');
        // Return to home page to maintain test isolation
        await homePage.page.goto('/');
    });

    // Scenario: User browses the home page to discover featured products
    test('Validate featured products section', async () => {
        await expect(homePage.featuredProductsSection).toBeVisible();
        await expect(homePage.productItems.first()).toBeVisible();
    });
});