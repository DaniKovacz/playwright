import { test, expect } from '@playwright/test';
import ProductDetailPage from '../helpers/page-objects/product-detail-po.js';

test.describe('Product Detail Page', () => {
    let productDetailPage;

    // Setup: Navigate to a specific product page to test product detail functionality
    test.beforeEach(async ({ page }) => {
        await page.goto('/radiant-tee.html');
        productDetailPage = new ProductDetailPage(page);
    });

    // Scenario: Customer views a product and needs to see the product name clearly
    test('Validate product title is displayed', async () => {
        await expect(productDetailPage.productTitle).toBeVisible();
        await expect(productDetailPage.productTitle).toContainText('Radiant Tee');
    });

    // Scenario: Customer needs to see the product price before making a purchase decision
    test('Validate product price is displayed', async () => {
        await expect(productDetailPage.productPrice).toBeVisible();
    });

    // Scenario: Customer wants to read product details to understand what they're buying
    test('Validate product description is displayed', async () => {
        await expect(productDetailPage.productDescription).toBeVisible();
    });

    // Scenario: Customer needs to select the correct size for their clothing item
    test('Validate size selection', async () => {
        await productDetailPage.selectSize('M');
        // Confirm the size selection is visually indicated to the user
        await expect(productDetailPage.getSelectedSize('M')).toHaveClass(/selected/);
    });

    // Scenario: Customer wants to choose their preferred color option
    test('Validate color selection', async () => {
        await productDetailPage.selectColor('Blue');
        // Confirm the color selection is visually indicated to the user
        await expect(productDetailPage.getSelectedColor('Blue')).toHaveClass(/selected/);
    });

    // Scenario: Customer wants to purchase multiple quantities of the same item
    test('Validate quantity input', async () => {
        await productDetailPage.setQuantity(2);
        await expect(productDetailPage.quantityInput).toHaveValue('2');
    });

    // Scenario: Customer completes product configuration and adds item to their cart
    test('Validate add to cart functionality', async () => {
        // Customer selects all required product options
        await productDetailPage.selectSize('M');
        await productDetailPage.selectColor('Blue');
        await productDetailPage.setQuantity(1);
        
        // Customer clicks add to cart
        await productDetailPage.addToCart();
        
        // System confirms the item was successfully added
        await expect(productDetailPage.successMessage).toBeVisible();
        await expect(productDetailPage.successMessage).toContainText('You added Radiant Tee to your shopping cart.');
    });

    // Scenario: Customer discovers additional products they might be interested in
    test('Validate related products section', async () => {
        if (await productDetailPage.relatedProductsSection.isVisible()) {
            await expect(productDetailPage.relatedProducts).toHaveCount.greaterThan(0);
        }
    });
});