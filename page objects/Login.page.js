const { expect } = require("@playwright/test");
const { takeScreenshot } = require("../tests/support/screenshot.helper");
const { APP_URL, testData } = require("../tests/config/testData");

class LoginPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    
    // Locators
    this.emailInput = () => this.page.getByLabel('Email Address');
    this.passwordInput = () => this.page.getByLabel('Password');
    this.loginButton = () => this.page.getByRole('button', { name: 'Login' });
    this.errorToast = () => this.page.locator('.Toastify__toast--error');
    this.welcomeMessage = () => this.page.getByText('Welcome to Grow Now');
  }

  // Navigation Methods
  async navigateToLoginPage() {
    await this.page.goto(APP_URL, { waitUntil: 'networkidle' });
    await this.page.waitForLoadState('domcontentloaded');
    await takeScreenshot(this.page, this.context, '01-login-page-loaded');
  }

  // Input Methods
  async enterEmail(email) {
    await this.emailInput().fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput().fill(password);
  }

  async enterCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await takeScreenshot(this.page, this.context, '02-credentials-entered');
  }

  async clickLoginButton() {
    await this.loginButton().click();
    await this.page.waitForLoadState('networkidle');
    await takeScreenshot(this.page, this.context, '03-login-clicked');
  }

  // Login Methods
  async loginWithValidCredentials() {
    const { email, password } = testData.validCredentials;
    await this.enterCredentials(email, password);
    await this.clickLoginButton();
  }

  async loginWithInvalidCredentials(email, password) {
    await this.enterCredentials(email, password);
    await this.clickLoginButton();
  }

  // Assertion Methods
  async assertHomePageIsDisplayed() {
    await expect(this.page).toHaveURL(/.*live/);
    await expect(this.welcomeMessage()).toBeVisible();
    await takeScreenshot(this.page, this.context, '04-home-page-displayed');
  }

  async assertErrorMessageIsDisplayed() {
    const flashMessage = this.errorToast();
    
    await flashMessage.waitFor({ state: 'visible' });
    await expect(flashMessage).toBeVisible();
    await takeScreenshot(this.page, this.context, '04-error-message-displayed');

    const messageText = await flashMessage.textContent();
    expect(messageText).toMatch(/Invalid author credentials|Invalid password!/);
  }

  async getErrorMessage() {
    const flashMessage = this.errorToast();
    await flashMessage.waitFor({ state: 'visible' });
    return await flashMessage.textContent();
  }
}

module.exports = LoginPage;
