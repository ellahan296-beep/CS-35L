
import { test, expect } from '@playwright/test';
import { resetDatabase } from './resetDB.js';

test.beforeAll(async () => {
  await resetDatabase();
});

test.afterAll(async () => {
  await resetDatabase();
});

test.describe.configure({ mode: 'serial' });

test('ensure profile page displays correct information', async ({page}) => {
    await page.goto('/');
    await page   
        .getByRole('Link', { name: 'Sign Up' }).click();

    await page
        .getByLabel('Username')
        .fill('testUser1');

    await page
        .getByLabel('Email')
        .fill('bookncoco@gmail.com')

    await page
        .getByLabel('Password')
        .fill('test123!')

    await page.getByRole('Button', { name: 'Sign Up' }).click();
    await page.waitForLoadState();

    await page.getByRole('Button', { name: 'My Profile' }).click();

    await expect(page.getByText('USERNAMEtestUser1'));
    await expect(page.getByText('EMAILbookncoco@gmail.com'));

});