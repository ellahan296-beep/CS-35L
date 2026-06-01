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

test('create listing to search for', async ({page}) => {

    await page.goto('/signup');

    await page
        .getByLabel('Username')
        .fill('testUser');

    await page
        .getByLabel('Email')
        .fill('coconbook@gmail.com')

    await page
        .getByLabel('Password')
        .fill('test123!')

    await page
        .getByRole('Button', { name: 'Sign Up' })
        .click();

    await page.getByRole('Button', { name: 'Listings' }).click();
    await page.getByRole('Button', { name: '+ Post Item'}).click();
    
    await page.getByLabel('Title *').fill('Used Couch');
    await page.getByLabel('Description').fill('lightly used, slightly stained but good condition');
    await page.getByLabel('Price ($) *').fill('500');
    await page.getByLabel('Category *').click();
    await page.getByRole('option', { name: 'Furniture' }).click();
    await page.getByLabel('Campus *').click();
    await page.getByRole('option', { name: 'UCLA' }).click();

    await page
        .getByRole('Button', { name: 'Post Listing' })
        .click();
    
    await expect(page).toHaveURL('/listings'); 

});

test('search - no matching results', async ({page}) => {
    await page.goto('/search');

    await page
        .getByLabel('Search')
        .fill('asfjkldgjlNonsense');

    await page
        .getByLabel('Search')
        .press('Enter');

    await page.waitForLoadState();

    await expect(page.getByText('No listings')).toBeVisible();
});

test('search - matching results', async ({page}) => {

  await page.goto('/search');

  await page
    .getByLabel('Search')
    .fill('Used');

  await page
    .getByLabel('Search')
    .press('Enter');

  await page.waitForLoadState();
  
  await expect(page.getByRole('heading', { name: 'Used Couch' })).toBeVisible();
});