// @ts-check
import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

async function login(page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.describe('Sauce Demo additional scenarios', () => {
  test('shows an error message for invalid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('logs out successfully from the inventory page', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/\/inventory\.html$/);

    await page.locator('#react-burger-menu-btn').click();
    await page.getByText('Logout').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('sorts products in descending order', async ({ page }) => {
    await login(page);

    const productNames = page.locator('.inventory_item_name');
    await expect(productNames.first()).toBeVisible();

    const namesBefore = await productNames.allTextContents();
    const expectedAscending = [...namesBefore].sort((a, b) => a.localeCompare(b));

    await expect(namesBefore).toEqual(expectedAscending);

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    const namesAfter = await productNames.allTextContents();
    const expectedDescending = [...namesBefore].sort((a, b) => b.localeCompare(a));

    await expect(namesAfter).toEqual(expectedDescending);
  });
});
