class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Home page locators
        this.pageTitle = page.locator('.page-title');
        this.mainNavigation = page.locator('.navigation');
        this.searchBox = page.locator('#search');
        this.searchButton = page.locator('button[title="Search"]');
        this.searchResultsTitle = page.locator('.page-title');
        this.featuredProductsSection = page.locator('.block-products-list');
        this.productItems = page.locator('.product-item');
        this.footerLinks = page.locator('.footer a');
        this.cartIcon = page.locator('.minicart-wrapper');
        this.accountMenuToggle = page.locator('.header .authorization-link a');
    }

    /**
     * Search for a product
     * @param {string} searchTerm - The term to search for
     * @param {string} browserName - Optional browser name for WebKit workaround
     */
    async searchFor(searchTerm, browserName = null) {
        await this.searchBox.fill(searchTerm);
        
        // WebKit-specific workaround: Use keyboard Enter instead of button click
        if (browserName === 'webkit') {
            // For Safari/WebKit, use Enter key which is more reliable
            await this.searchBox.press('Enter');
        } else {
            // For other browsers, use the search button
            await this.searchButton.click();
        }
    }

    /**
     * Click on the cart icon
     */
    async openCart() {
        await this.cartIcon.click();
    }

    /**
     * Click on the account menu
     */
    async openAccountMenu() {
        await this.accountMenuToggle.click();
    }

    /**
     * Navigate to a category by name
     * @param {string} categoryName - The name of the category to navigate to
     */
    async navigateToCategory(categoryName) {
        await this.page.locator(`.navigation .level-0 a:text-is("${categoryName}")`).click();
    }
}

export default HomePage;