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

test('restricted access - logged out user cannot access post listing page', async ({
  page,
}) => {
  await page.goto('/listings/new');

  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

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