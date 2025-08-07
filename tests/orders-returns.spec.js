import { test, expect } from '@playwright/test';
import OrdersReturnsPage from './../helpers/page-objects/orders-returns-po.js';

test.describe('Orders and Returns', () => {
    let ordersReturnsPage;

    // Setup: Navigate to the orders and returns page where customers track their purchases
    test.beforeEach(async ({ page }) => {
        await page.goto('/sales/guest/form/');
        ordersReturnsPage = new OrdersReturnsPage(page);
    });

    // Scenario: Customer visits the orders page and expects to see the correct page title
    test('Validate page title', async () => {
        await expect(ordersReturnsPage.page).toHaveTitle(/Orders and Returns/);
    });

    // Scenario: Customer needs to see all form fields to track their order
    test('Validate form elements are visible', async () => {
        await expect(ordersReturnsPage.orderId).toBeVisible();
        await expect(ordersReturnsPage.billingLastName).toBeVisible();
        await expect(ordersReturnsPage.findOrderBy).toBeVisible();
        await expect(ordersReturnsPage.submitButton).toBeVisible();
    });

    // Scenario: Customer accidentally submits form without required information
    test('Validate form validation with empty fields', async () => {
        // Customer clicks continue without filling required fields
        await ordersReturnsPage.submit();
        
        // System provides helpful validation messages to guide the customer
        await expect(ordersReturnsPage.orderIdErrorMessage).toBeVisible();
        await expect(ordersReturnsPage.billingLastNameErrorMessage).toBeVisible();
    });

    // Scenario: Customer enters order information to track their purchase
    test('Validate search for valid order', async ({ browserName }) => {
        // Customer enters their order details from receipt/email
        await ordersReturnsPage.fillOrderNumber('000000001');
        await ordersReturnsPage.fillBillingLastName('Smith');
        await ordersReturnsPage.fillEmail('test@example.com');
        
        // Customer submits the tracking request
        await ordersReturnsPage.submit();
        
        // Browser-specific workarounds: Use longer timeout and more flexible waiting
        if (browserName === 'firefox' || browserName === 'webkit') {
            // Wait for page to load with longer timeout for Firefox and WebKit
            await ordersReturnsPage.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
            // Give browsers extra time to process the request
            await ordersReturnsPage.page.waitForTimeout(2000);
        } else {
            // Standard wait for Chromium
            await ordersReturnsPage.page.waitForLoadState('networkidle');
        }
        
        // System either displays order details or informs customer order wasn't found
        const isOrderNotFound = await ordersReturnsPage.orderNotFoundMessage.isVisible();
        const isOrderFound = await ordersReturnsPage.orderFoundMessage.isVisible();
        
        expect(isOrderNotFound || isOrderFound).toBeTruthy();
    });
});