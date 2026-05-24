const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { takeScreenshot } = require("../support/screenshot.helper");


setDefaultTimeout(60 * 1000);

Given("User navigates to the Browserstack Homepage", async function() {

    await this.page.goto("https://www.browserstack.com/");
    await takeScreenshot(this.page, this, '01-browserstack-homepage-loaded');

});

When('User clicks on Product Menu', async function () {

    await this.page.locator('button[aria-label="Products"]').waitFor();

    await this.page.locator('button[aria-label="Products"]').click();
    await takeScreenshot(this.page, this, '02-product-menu-clicked');

});

Then('It should show Web Testing Product', async function () {

    await this.page.locator('div[aria-label="Products"] button[title="Web Testing"]').waitFor();

    expect(await this.page.locator('div[aria-label="Products"] button[title="Web Testing"] span').isVisible()).toBeTruthy()
    await takeScreenshot(this.page, this, '03-web-testing-shown');

});

Given('User Navigates to Browserstack Homepage', async function () {

    await this.page.goto("https://www.browserstack.com/");
    await takeScreenshot(this.page, this, '01-browserstack-homepage-loaded');

});

When('User clicks on Pricing Menu', async function () {

    await this.page.locator('a[title="Pricing"]').click();
    await takeScreenshot(this.page, this, '02-pricing-menu-clicked');

});

Then('It should Display correct Product lists in left Nav', async function () {

    var leftNavProducts = await this.page.locator('div[id="sidenav__list"]').textContent()

    var productArray = await leftNavProducts.split("\n").map((item) => { return item.trim(); });

    expect(productArray).toEqual(expect.arrayContaining(['Live', 'App Live']));
    await takeScreenshot(this.page, this, '03-product-list-displayed');

});