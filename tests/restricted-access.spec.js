import { test, expect } from '@playwright/test';
import { resetDatabase, resetListings } from './resetDB.js';

test.beforeAll(async () => {
  await resetDatabase();
  await resetListings();
});

test.afterAll(async () => {
  await resetDatabase();
  await resetListings();
});

test.describe.configure({ mode: 'serial' });

/*
Checks that a logged out user cannot directly open post-listing page. Since they are not logged in,
  they should be redirected to the login page.
*/
test('restricted access - logged out user cannot access post listing page', async ({
  page,
}) => {
  await page.goto('/listings/new');

  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

/*
  Test checks that a logged out user cannot open
  the dashboard page. Since dashboard is protected, the app should
  redirect them to the login page.
*/
test('restricted access - logged out user cannot access dashboard', async ({
  page,
}) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

/*
  Test checks that a logged out user cannot directly open
  the profile page. The app should redirect them to the login page.
*/
test('restricted access - logged out user cannot access profile', async ({
  page,
}) => {
  await page.goto('/profile');

  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

/*
  Test checks that user who signs up successfully is allowed
  into the  dashboard page.
*/
test('restricted access - logged in user can access dashboard', async ({
  page,
}) => {
  await page.goto('/signup');

  await page
    .getByLabel('Username')
    .fill('restrictedUser');

  await page
    .getByLabel('Email')
    .fill('restricteduser@g.ucla.edu');

  await page
    .getByLabel('Password')
    .fill('test123!');

  await page
    .getByRole('button', { name: 'Sign Up' })
    .click();

  await page.waitForLoadState();

  await expect(page).toHaveURL('/dashboard');
});

/*
  Test checks that a logged-in user can access
  post listing page. Logs in with the account created in the
  previous test then confirms the create listing form is shown.
*/
test('restricted access - logged in user can access post listing page', async ({
  page,
}) => {
  await page.goto('/login');

  await page
    .getByLabel('Email')
    .fill('restricteduser@g.ucla.edu');

  await page
    .getByLabel('Password')
    .fill('test123!');

  await page
    .getByRole('button', { name: 'Log In' })
    .click();

  await page.waitForLoadState();

  await expect(page).toHaveURL('/dashboard');

  await page.goto('/listings/new');

  await expect(page.getByLabel('Title *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Post Listing' })).toBeVisible();
});