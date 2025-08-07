class SearchResultsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Search results page locators
        this.searchResultsTitle = page.locator('.page-title');
        this.productItems = page.locator('.product-item');
        this.noResultsMessage = page.locator('.message.notice');
        this.minimumCharacterMessage = page.locator('.message.notice:has-text("minimum")'); // Message about minimum characters
        this.sorterSelect = page.locator('#sorter');
        this.limiterSelect = page.locator('#limiter');
        this.productNames = page.locator('.product-item-link');
        this.productPrices = page.locator('.price-wrapper .price');
    }

    /**
     * Sort products by the given option
     * @param {string} option - The sort option (e.g., 'Position', 'Name', 'Price')
     */
    async sortBy(option) {
        await this.sorterSelect.selectOption({ label: option });
        // Wait for the page to reload with the new sorting
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

    /**
     * Set the number of products per page
     * @param {string} limit - The limit option (e.g., '12', '24', '36')
     */
    async setLimit(limit) {
        await this.limiterSelect.selectOption({ label: limit });
    }

    /**
     * Get the name of a product by index
     * @param {number} index - The index of the product (0-based)
     * @returns {Promise<string>} The product name
     */
    async getProductName(index) {
        return await this.productNames.nth(index).textContent();
    }

    /**
     * Get the price of a product by index
     * @param {number} index - The index of the product (0-based)
     * @returns {Promise<number>} The product price
     */
    async getProductPrice(index) {
        const priceText = await this.productPrices.nth(index).textContent();
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }

    /**
     * Click on a product by index
     * @param {number} index - The index of the product (0-based)
     */
    async clickProduct(index) {
        // Force click with a timeout to make it more reliable
        await this.productNames.nth(index).click({ force: true, timeout: 10000 });
        // Wait for navigation to complete
        await this.page.waitForNavigation({ timeout: 15000, waitUntil: 'networkidle' }).catch(() => {});
    }

    /**
     * Check if the search returned any results
     * @returns {Promise<boolean>} True if results were found, false otherwise
     */
    async hasResults() {
        return await this.productItems.count() > 0;
    }

    /**
     * Get the number of search results
     * @returns {Promise<number>} The number of search results
     */
    async getResultCount() {
        return await this.productItems.count();
    }
}

export default SearchResultsPage;