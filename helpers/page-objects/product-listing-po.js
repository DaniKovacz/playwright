class ProductListingPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Product listing page locators
        this.categoryTitle = page.locator('.page-title');
        this.productGrid = page.locator('.products-grid');
        this.productItems = page.locator('.product-item');
        this.sorterSelect = page.locator('#sorter').first();
        this.filterOptions = page.locator('.filter-options');
        this.activeFilters = page.locator('.filter-current .item');
        this.pagination = page.locator('.pages');
        this.nextPageButton = page.locator('.pages .next');
        this.limiterSelect = page.locator('#limiter');
    }

    /**
     * Sort products by the given option
     * @param {string} option - The sort option (e.g., 'Position', 'Name', 'Price')
     */
    async sortBy(option) {
        await this.sorterSelect.selectOption({ label: option });
    }

    /**
     * Apply a filter
     * @param {string} filterName - The name of the filter (e.g., 'Size', 'Color')
     * @param {string} filterValue - The value to filter by
     */
    async applyFilter(filterName, filterValue) {
        // First, expand the filter section if it's not already expanded
        const filterSection = this.filterOptions.locator(`[data-role="title"]:text-is("${filterName}")`).first();
        const isExpanded = await filterSection.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            await filterSection.click();
        }
        
        // Now click on the specific filter value - using a more flexible selector
        await this.page.locator(`[data-role="content"] a`).filter({ hasText: filterValue }).first().click({ timeout: 10000 });
    }

    /**
     * Go to the next page of products
     */
    async goToNextPage() {
        // Add a timeout and force option to make the click more reliable
        await this.nextPageButton.click({ timeout: 10000, force: true });
        // Wait for navigation to complete
        await this.page.waitForURL(/p=2/, { timeout: 10000 });
    }

    /**
     * Get the current number of items per page
     * @returns {Promise<number>} The number of items per page
     */
    async getItemsPerPage() {
        const value = await this.limiterSelect.inputValue();
        return parseInt(value, 10);
    }

    /**
     * Add a product to the cart by index
     * @param {number} index - The index of the product to add (0-based)
     */
    async addProductToCart(index) {
        const product = this.productItems.nth(index);
        await product.hover();
        await product.locator('.tocart').click();
        // Wait for the add to cart action to complete
        await this.page.waitForSelector('.message-success');
    }
}

export default ProductListingPage;