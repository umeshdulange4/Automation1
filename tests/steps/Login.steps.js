const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { takeScreenshot } = require("../support/screenshot.helper");
const LoginPage = require("../../page objects/Login.page");


setDefaultTimeout(60 * 1000);

Given("User navigates to URL", async function() {
  const loginPage = new LoginPage(this.page, this);
  await loginPage.navigateToLoginPage();
});

When('User enters credentials', async function () {
  const loginPage = new LoginPage(this.page, this);
  await loginPage.loginWithValidCredentials();
});

Then('home page should be displayed', async function () {
  const loginPage = new LoginPage(this.page, this);
  await loginPage.assertHomePageIsDisplayed();
});

When('User enters incorrect {string} and correct {string}', async function (Email, Password) {
  const loginPage = new LoginPage(this.page, this);
  await loginPage.loginWithInvalidCredentials(Email, Password);
});

Then('User should get warning to enter correct Email', async function () {
  const loginPage = new LoginPage(this.page, this);
  await loginPage.assertErrorMessageIsDisplayed();
});
