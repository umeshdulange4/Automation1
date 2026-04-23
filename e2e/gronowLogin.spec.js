// @ts-check
import { test, expect } from '@playwright/test';

test('Loginto grow', async ({ page }) => {
  await page.goto('https://qa-app.grownow.live/login');
  await page.getByLabel('Email Address').fill('Umeshdulange4@gmail.com');
  await page.getByLabel('Password').fill('2uEDqMFqvk');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*live/);
});