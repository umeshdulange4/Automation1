const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { createBdd } = require("playwright-bdd");
const { chromium, expect } = require("@playwright/test");
const { Page } = require("playwright");


setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});

Given("User navigates to URL", async () => {

    await page.goto("https://qa-app.grownow.live/login");

});

When('User enters credentials', async function () {

    await page.getByLabel('Email Address').fill('Umeshdulange4@gmail.com');
    await page.getByLabel('Password').fill('2uEDqMFqvk');
    await page.getByRole('button', { name: 'Login' }).click();

});

Then('home page should be displayed', async function () {
    await expect(page).toHaveURL(/.*live/);
    await expect(page.getByText('Welcome to Grow Now')).toBeVisible();

});

When('User enters incorrect {string} and correct {string}', async function (Email,Password) {

    await page.getByLabel('Email Address').fill(Email);
    await page.getByLabel('Password').fill(Password);
    await page.getByRole('button', { name: 'Login' }).click();

});
After(async function () {

    await browser.close();

})

Then('User should get warning to enter correct Email', async function () {
//const flashMessage = page.locator('//div[@class="Toastify__toast Toastify__toast-theme--light Toastify__toast--error"]');
const flashMessage = page.locator('.Toastify__toast--error');
await expect(page.locator('.Toastify__toast')).toHaveText('Invalid author credentials');
  // 3. Assert that it is visible
  
  await flashMessage.waitFor({ state: 'visible' });
  await expect(flashMessage).toBeVisible();


  // 4. Assert that it contains the exact text
  await expect(flashMessage).toHaveText('Invalid author credentials');


   //  await expect(page.getByText('Invalid author credentials')).toBeVisible();
});
After(async function () {

    await browser.close();

})
