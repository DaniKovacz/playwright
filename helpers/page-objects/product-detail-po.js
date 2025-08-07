class ProductDetailPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Product detail page locators
        this.productTitle = page.locator('.page-title');
        this.productPrice = page.locator('.product-info-price .price');
        this.productImage = page.locator('.gallery-placeholder img, .fotorama__img, .fotorama__stage__shaft img');
        this.productDescription = page.locator('#description');
        this.sizeOptions = page.locator('.swatch-attribute.size .swatch-option');
        this.colorOptions = page.locator('.swatch-attribute.color .swatch-option');
        this.quantityInput = page.locator('#qty');
        this.addToCartButton = page.locator('#product-addtocart-button');
        this.addToWishlistButton = page.locator('.towishlist');
        this.successMessage = page.locator('[data-ui-id="message-success"]');
        this.relatedProductsSection = page.locator('.block.related');
        this.relatedProducts = page.locator('.block.related .product-item');
    }

    /**
     * Select a size option
     * @param {string} size - The size to select (e.g., 'S', 'M', 'L')
     */
    async selectSize(size) {
        await this.sizeOptions.filter({ hasText: size }).click();
    }

    /**
     * Get the selected size element
     * @param {string} size - The size to check
     * @returns {import('@playwright/test').Locator} The size element
     */
    getSelectedSize(size) {
        return this.sizeOptions.filter({ hasText: size });
    }

    /**
     * Select a color option
     * @param {string} color - The color to select (e.g., 'Blue', 'Orange')
     */
    async selectColor(color) {
        await this.colorOptions.filter({ hasAttribute: { 'aria-label': color } }).first().click();
    }

    /**
     * Get the selected color element
     * @param {string} color - The color to check
     * @returns {import('@playwright/test').Locator} The color element
     */
    getSelectedColor(color) {
        return this.colorOptions.filter({ hasAttribute: { 'aria-label': color } }).first();
    }

    /**
     * Set the quantity
     * @param {number} quantity - The quantity to set
     */
    async setQuantity(quantity) {
        await this.quantityInput.fill(quantity.toString());
    }

    /**
     * Add the product to cart
     */
    async addToCart() {
        await this.addToCartButton.click();
        // Wait for the success message to appear
        await this.page.waitForSelector('[data-ui-id="message-success"]');
    }

    /**
     * Add the product to wishlist
     */
    async addToWishlist() {
        await this.addToWishlistButton.click();
    }

    /**
     * Get the product price as a number
     * @returns {Promise<number>} The product price
     */
    async getProductPrice() {
        const priceText = await this.productPrice.textContent();
        // Extract the number from the price text (e.g., '$22.00' -> 22.00)
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        return price;
    }
}

export default ProductDetailPage;