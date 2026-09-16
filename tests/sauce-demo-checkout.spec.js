// @ts-check
import { test, expect } from '@playwright/test';

test('Add item to cart and complete checkout', async ({ page }) => {
  // 1. Log in with a valid user
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 2. Add Sauce Labs Backpack to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Open the cart and click checkout
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();

  // 4. Fill in first name, last name, and postal code
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  // 5. Finish the checkout
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
