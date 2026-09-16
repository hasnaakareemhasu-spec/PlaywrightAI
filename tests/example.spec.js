// @ts-check
import { test, expect } from '@playwright/test';

test('Sauce Demo login and purchase flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('[data-test="username"]')).toBeVisible();

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.inventory_item')).toHaveCount(6);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
