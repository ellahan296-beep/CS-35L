
import { test, expect } from '@playwright/test';
import { resetDatabase } from './resetDB.js';

test.beforeAll(async () => {
  await resetDatabase();
});

test.describe.configure({ mode: 'serial' });

test('ensure successful signup for CampusTrade', async ({
  page,
}) => {
  await page.goto('/');
  await page   
    .getByRole('Link', { name: 'Sign Up' }).click();

  await page
    .getByLabel('Username')
    .fill('testUser');

  await page
    .getByLabel('Email')
    .fill('user@email.com')

  await page
    .getByLabel('Password')
    .fill('test123!')

  await page.getByRole('Button', { name: 'Sign Up' }).click();
  await page.waitForLoadState();

  await expect(page).toHaveURL('/dashboard');
});

test('ensure successful login to CampusTrade', async ({
  page,
}) => {
  await page.goto('/login');
  await page
    .getByLabel('Email')
    .fill('user@email.com')

  await page
    .getByLabel('Password')
    .fill('test123!')

  await page.getByRole('Button', { name: 'Log In' }).click();
  await page.waitForLoadState();

  await expect(page).toHaveURL('/dashboard');
});
