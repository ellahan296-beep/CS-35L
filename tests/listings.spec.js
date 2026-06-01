import { test, expect } from '@playwright/test';
import { resetDatabase } from './resetDB.js';

test.beforeAll(async (browser) => {
  await resetDatabase();
  //create a user for testing
  const page = await browser.newPage();
  await page.goto('/signup');
  await page.getByLabel('Username').fill('testUser');
  await page.getByLabel('Email').fill('user@email.com');
  await page.getByLabel('Password').fill('test123!');
  await page.getByRole('Button', { name: 'Sign Up' }).click();
  await page.waitForLoadState();
  await page.close();
});

test.describe.configure({ mode: 'serial' });

// helper: login
async function login(page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@email.com');
  await page.getByLabel('Password').fill('test123!');
  await page.getByRole('Button', { name: 'Log In' }).click();
  await page.waitForLoadState();
}

//post a new listing
test('ensure successful listing creation', async ({ page }) => {
  await login(page);

  await page.goto('/listings/new');

  await page.getByLabel('Title').fill('Test Textbook');
  await page.getByLabel('Description').fill('A test listing');
  await page.getByLabel('Price').fill('10');

  await page.getByLabel('Category').click();

  await page.getByRole('option', { name: 'Books' }).click();

  await page.getByLabel('Campus').click();
  await page.getByRole('option', { name: 'UCLA' }).click();

  await page.getByRole('Button', { name: 'Post Listing' }).click();
  await page.waitForLoadState();

  await expect(page).toHaveURL('/listings');
  await expect(page.getByText('Test Textbook')).toBeVisible();
});

//view listing detail
test('ensure listing detail page shows correct info', async ({ page }) => {
  await login(page);
  await page.goto('/listings');

  await page.getByText('Test Textbook').click();
  await page.waitForLoadState();

  await expect(page.getByText('Test Textbook')).toBeVisible();
  await expect(page.getByText('$10')).toBeVisible();
  await expect(page.getByText('user@email.com')).toBeVisible();
});

//mark listing as sold
test('ensure listing can be marked as sold', async ({ page }) => {
  await login(page);
  await page.goto('/listings');

  //find textbook listing and click "Mark as Sold" and I learned filter from https://playwright.dev/docs/selectors#filter and locator from https://playwright.dev/docs/selectors#locator
  const row = page.locator('div').filter({ hasText: 'Test Textbook' }).first();
  await row.getByRole('button', { name: 'Mark as Sold' }).click();

  await expect(page.getByText('sold')).toBeVisible();
});

//delete a listing
test('ensure listing can be deleted', async ({ page }) => {
  await login(page);
  await page.goto('/listings');

  await page.locator('div').filter({ hasText: 'Test Textbook' }).first()
    .getByRole('button', { name: 'Delete' }).click();
    
  await expect(page.getByText('Test Textbook')).not.toBeVisible();
});