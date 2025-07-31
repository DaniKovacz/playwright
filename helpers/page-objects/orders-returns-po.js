class OrdersReturnsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Orders and Returns page locators
        this.pageTitle = page.locator('.page-title');
        this.orderId = page.locator('#oar-order-id');
        this.billingLastName = page.locator('#oar-billing-lastname');
        this.findOrderBy = page.locator('#quick-search-type-id');
        this.emailInput = page.locator('#oar_email');
        this.submitButton = page.locator('[title="Continue"]');
        
        // Error message locators
        this.orderIdErrorMessage = page.locator('[id="oar-order-id-error"]');
        this.billingLastNameErrorMessage = page.locator('[id="oar-billing-lastname-error"]');
        this.emailErrorMessage = page.locator('[id="oar_email-error"]');
        this.orderNotFoundMessage = page.locator('.message-error');
        this.orderFoundMessage = page.locator('[data-ui-id="page-title-wrapper"]');
    }

    async fillOrderNumber(orderNumber) {
        await this.orderId.fill(orderNumber);
    }

    async fillBillingLastName(lastName) {
        await this.billingLastName.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async submit() {
        await this.submitButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

export default OrdersReturnsPage;