
import { test, expect } from '@playwright/test';
import { resetDatabase } from './resetDB.js';

test.beforeAll(async () => {
  await resetDatabase();
});

test.afterAll(async () => {
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

test('invalid signup - empty', async ({
  page,
}) => {
  await page.goto('/signup');

  await page.getByRole('Button', { name: 'Sign Up' }).click();
  await page.waitForLoadState();

  await expect(page.getByText('required')).toBeVisible();
});

test('invalid signup - invalid email', async ({
  page,
}) => {
  await page.goto('/signup');

  await page
    .getByLabel('Username')
    .fill('testUser2');

  await page
    .getByLabel('Email')
    .fill('invalidemail.com')

  await page
    .getByLabel('Password')
    .fill('test123!')

  await page.getByRole('Button', { name: 'Sign Up' }).click();
  await page.waitForLoadState();

  await expect(page.getByText('enter a valid email')).toBeVisible();
});

test('invalid signup - pre-existing user', async ({
  page,
}) => {
  await page.goto('/signup');

  await page
    .getByLabel('Username')
    .fill('testUser');

  await page
    .getByLabel('Email')
    .fill('valid@email.com')

  await page
    .getByLabel('Password')
    .fill('test123!')

  await page.getByRole('Button', { name: 'Sign Up' }).click();
  await page.waitForLoadState();

  await expect(page.getByText('already exists')).toBeVisible();
});

test('invalid login - empty', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('Button', { name: 'Log In' }).click();
  await page.waitForLoadState();

  await expect(page.getByText('required')).toBeVisible();
});

test('invalid login - invalid credentials', async ({
  page,
}) => {
  await page.goto('/login');

  await page
    .getByLabel('Email')
    .fill('user@email.com')

  await page
    .getByLabel('Password')
    .fill('test1234')

  await page.getByRole('Button', { name: 'Log In' }).click();
  await page.waitForLoadState();

  await expect(page.getByText('invalid')).toBeVisible();
});
