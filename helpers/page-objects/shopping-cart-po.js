class ShoppingCartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Shopping cart page locators
        this.pageTitle = page.locator('.page-title');
        this.cartItems = page.locator('.cart.item');
        this.updateCartButton = page.locator('.update, button[title="Update Shopping Cart"]');
        this.proceedToCheckoutButton = page.locator('button.checkout, button[data-role="proceed-to-checkout"], .action.primary.checkout');
        this.emptyCartMessage = page.locator('.cart-empty');
        this.subtotalAmount = page.locator('[data-th="Subtotal"] .price');
        this.grandTotalAmount = page.locator('.grand.totals .price');
        this.couponCodeInput = page.locator('#coupon_code');
        this.applyCouponButton = page.locator('button.action.apply');
        this.shippingMethodOptions = page.locator('.table-checkout-shipping-method input[type="radio"]');
    }

    /**
     * Get the quantity input for a specific cart item
     * @param {number} index - The index of the cart item (0-based)
     * @returns {import('@playwright/test').Locator} The quantity input element
     */
    getQuantityInput(index) {
        return this.cartItems.nth(index).locator('.qty');
    }

    /**
     * Update the quantity of a specific cart item
     * @param {number} index - The index of the cart item (0-based)
     * @param {number} quantity - The new quantity
     */
    async updateQuantity(index, quantity) {
        await this.getQuantityInput(index).fill(quantity.toString());
    }

    /**
     * Remove a specific cart item
     * @param {number} index - The index of the cart item (0-based)
     */
    async removeItem(index) {
        await this.cartItems.nth(index).locator('.action-delete').click();
    }

    /**
     * Get the price of a specific cart item
     * @param {number} index - The index of the cart item (0-based)
     * @returns {Promise<number>} The item price
     */
    async getItemPrice(index) {
        const priceText = await this.cartItems.nth(index).locator('[data-th="Price"] .price').textContent();
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }

    /**
     * Get the subtotal amount
     * @returns {Promise<number>} The subtotal amount
     */
    async getSubtotal() {
        const subtotalText = await this.subtotalAmount.textContent();
        return parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
    }

    /**
     * Get the grand total amount
     * @returns {Promise<number>} The grand total amount
     */
    async getGrandTotal() {
        const grandTotalText = await this.grandTotalAmount.textContent();
        return parseFloat(grandTotalText.replace(/[^0-9.]/g, ''));
    }

    /**
     * Apply a coupon code
     * @param {string} couponCode - The coupon code to apply
     */
    async applyCoupon(couponCode) {
        await this.couponCodeInput.fill(couponCode);
        await this.applyCouponButton.click();
    }

    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

export default ShoppingCartPage;