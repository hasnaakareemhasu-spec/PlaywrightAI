# Sauce Demo Test Plan

## Application Overview

A comprehensive test plan for automating the Sauce Demo website, covering login, inventory, cart, checkout, sorting, logout, and negative scenarios using Playwright.

## Test Scenarios

### 1. Sauce Demo Core Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid login and inventory load

**File:** `tests/sauce-demo-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The login page is visible with username, password, and login button.
  2. Enter standard_user and secret_sauce
    - expect: The user is redirected to the inventory page.
  3. Verify the inventory page header and visible product cards
    - expect: At least six products are displayed and the page title or heading is correct.

#### 1.2. Invalid login error handling

**File:** `tests/sauce-demo-invalid-login.spec.ts`

**Steps:**
  1. Navigate to the Sauce Demo login page
    - expect: The login form loads successfully.
  2. Enter a valid username with an incorrect password
    - expect: The error message is displayed.
  3. Verify the user remains on the login page
    - expect: The login form is still visible and the URL remains the base URL.

#### 1.3. Locked out user scenario

**File:** `tests/sauce-demo-locked-out.spec.ts`

**Steps:**
  1. Navigate to the Sauce Demo login page
    - expect: The login page loads.
  2. Enter locked_out_user with the correct password
    - expect: The locked-out error message is displayed.
  3. Verify the user cannot access the inventory page
    - expect: The inventory page does not load and the user remains on the login page.

#### 1.4. Add item to cart and complete checkout

**File:** `tests/sauce-demo-checkout.spec.ts`

**Steps:**
  1. Log in with a valid user
    - expect: The inventory page is visible.
  2. Add Sauce Labs Backpack to the cart
    - expect: The cart badge updates to 1 item.
  3. Open the cart and click checkout
    - expect: The checkout information form is shown.
  4. Fill in first name, last name, and postal code
    - expect: The user can continue to the review page.
  5. Finish the checkout
    - expect: The order confirmation page shows a success message.

#### 1.5. Logout from the inventory page

**File:** `tests/sauce-demo-logout.spec.ts`

**Steps:**
  1. Log in with a valid user
    - expect: The inventory page is visible.
  2. Open the burger menu
    - expect: The sidebar menu opens.
  3. Click Logout
    - expect: The user returns to the login page and is signed out.

#### 1.6. Sort products by price or name

**File:** `tests/sauce-demo-sort.spec.ts`

**Steps:**
  1. Log in with a valid user
    - expect: The inventory page loads.
  2. Open the sorting dropdown
    - expect: The sorting options are visible.
  3. Select a descending sort option such as Price (high to low) or Name (Z to A)
    - expect: The product list reorders accordingly.
  4. Verify the first visible product matches the expected order
    - expect: The order changes based on the selected sorting option.
