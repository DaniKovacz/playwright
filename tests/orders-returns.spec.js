import { test, expect } from '@playwright/test';
import OrdersReturnsPage from './../helpers/page-objects/orders-returns-po.js';

test.describe('Orders and Returns', () => {
    let ordersReturnsPage;

    // Navigate to the page ONCE before all tests
    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        await page.goto('/sales/guest/form/');
        ordersReturnsPage = new OrdersReturnsPage(page);
    });

    // Close the page after all tests
    test.afterAll(async () => {
        await ordersReturnsPage.page.close();
    });

    // Test 1: Verify page title
    test('Validate page title', async () => {
        await expect(ordersReturnsPage.page).toHaveTitle(/Orders and Returns/i);
        await expect(ordersReturnsPage.pageTitle).toHaveText(/Orders and Returns/);
    });

    // Test 2: Verify error messages
    test('Validate error messages for invalid submissions', async () => {
        await ordersReturnsPage.submit(); // Submit without filling fields
        await expect(ordersReturnsPage.orderIdErrorMessage).toBeVisible();
        await expect(ordersReturnsPage.billingLastNameErrorMessage).toBeVisible();
        await expect(ordersReturnsPage.emailErrorMessage).toBeVisible();
    });

    // Test 3: Search for invalid order
    test('Validate search for invalid order', async () => {
        await ordersReturnsPage.fillOrderNumber('0871238987');
        await ordersReturnsPage.fillBillingLastName('Test');
        await ordersReturnsPage.fillEmail('test.daniel@example.com');
        await ordersReturnsPage.submit();
        await expect(ordersReturnsPage.orderNotFoundMessage).toHaveText("You entered incorrect data. Please try again.");
    });

    // Test 4: Search for valid order
    test('Validate search for valid order', async () => {
        await ordersReturnsPage.fillOrderNumber('000063324');
        await ordersReturnsPage.fillBillingLastName('JobsityTest');
        await ordersReturnsPage.fillEmail('d.k.auto.test@gmail.com');
        await ordersReturnsPage.submit();
        await expect(ordersReturnsPage.orderFoundMessage).toContainText("Order #");
    });
});