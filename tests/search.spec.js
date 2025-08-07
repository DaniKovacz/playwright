import { test, expect } from '@playwright/test';
import HomePage from '../helpers/page-objects/home-page-po.js';
import SearchResultsPage from '../helpers/page-objects/search-results-po.js';

test.describe('Search Functionality', () => {
    let homePage;
    let searchResultsPage;

    // Setup: Start from home page where customers typically begin their search journey
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
    });

    // Scenario: Customer searches for a product they know exists in the store
    test('Validate search with valid product', async ({ browserName }) => {
        // Customer types in a common product term
        await homePage.searchFor('tee', browserName);
        
        // System navigates to search results and shows relevant products
        await expect(searchResultsPage.page).toHaveURL(/catalogsearch\/result/);
        await expect(searchResultsPage.searchResultsTitle).toContainText('tee');
        
        // Customer sees matching products in the results
        const count = await searchResultsPage.productItems.count();
        expect(count).toBeGreaterThan(0);
    });

    // Scenario: Customer searches for something that doesn't exist in the catalog
    test('Validate search with non-existent product', async ({ browserName }) => {
        // Customer searches for an item not available in the store
        await homePage.searchFor('nonexistentproduct123456789', browserName);
        
        // System still processes the search and shows results page
        await expect(searchResultsPage.page).toHaveURL(/catalogsearch\/result/);
        
        // Customer receives clear feedback that no products match their search
        await expect(searchResultsPage.noResultsMessage).toBeVisible();
    });

    // Scenario: Customer accidentally includes special characters in their search
    test('Validate search with special characters', async ({ browserName }) => {
        // Customer types search term with punctuation or special characters
        await homePage.searchFor('tee!', browserName);
        
        // System handles the search gracefully
        await expect(searchResultsPage.page).toHaveURL(/catalogsearch\/result/);
        
        // Browser-specific wait strategy for search results
        if (browserName === 'firefox' || browserName === 'webkit') {
            // Give Firefox and WebKit more time to load search results
            await searchResultsPage.page.waitForLoadState('domcontentloaded');
            await searchResultsPage.page.waitForTimeout(2000);
        }
        
        // System either finds relevant results or shows appropriate no-results message
        try {
            // First, wait for either results or no-results message to appear
            await Promise.race([
                searchResultsPage.noResultsMessage.waitFor({ state: 'visible', timeout: 5000 }),
                searchResultsPage.productItems.first().waitFor({ state: 'visible', timeout: 5000 })
            ]);
            
            // Check which one appeared
            if (await searchResultsPage.noResultsMessage.isVisible()) {
                // No results found - acceptable behavior for special character searches
                await expect(searchResultsPage.noResultsMessage).toBeVisible();
            } else {
                // Results found - system filtered out special characters and found matches
                const count = await searchResultsPage.productItems.count();
                expect(count).toBeGreaterThan(0);
            }
        } catch (e) {
            // If neither appears within timeout, check the current state
            const hasNoResults = await searchResultsPage.noResultsMessage.isVisible();
            const productCount = await searchResultsPage.productItems.count();
            
            // Accept either no results or some results as valid behavior
            expect(hasNoResults || productCount > 0).toBeTruthy();
        }
    });

    // Scenario: Customer tries to search with very few characters (edge case testing)
    test('Validate search with minimum characters', async ({ browserName }) => {
        // Customer enters minimal search input
        await homePage.searchFor('t', browserName);
        
        // System processes the search request
        await expect(searchResultsPage.page).toHaveURL(/catalogsearch\/result/);
        
        // System either enforces minimum character requirements or shows results
        try {
            await expect(searchResultsPage.minimumCharacterMessage).toBeVisible({ timeout: 5000 });
        } catch (e) {
            // No minimum character restriction - check for normal search behavior
            if (await searchResultsPage.noResultsMessage.isVisible()) {
                await expect(searchResultsPage.noResultsMessage).toBeVisible();
            } else {
                const count = await searchResultsPage.productItems.count();
                expect(count).toBeGreaterThan(0);
            }
        }
    });
});