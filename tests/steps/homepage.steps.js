const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { takeScreenshot } = require("../support/screenshot.helper");
const { HomePage }= require("../../page objects/Homepage.page");
const CommonPage = require("../../page objects/common.page");


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

    // Validate the displayed product text
    const common = new CommonPage(this.page);
    await common.ValidateElementText('div[aria-label="Products"] button[title="Web Testing"] span', 'Web Testing');
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

    // Validate product list contains expected items
    const common2 = new CommonPage(this.page);
    await common2.ValidateElementText('div[id="sidenav__list"]', /Live/);
    await common2.ValidateElementText('div[id="sidenav__list"]', /App Live/);
    await takeScreenshot(this.page, this, '03-product-list-displayed');

});

When("User navigates to growNow homepage", async function() {
    const homepage = new HomePage(this.page, this);
   await homepage.navigateToHomePage();

});

Then("User verify links are visible on the homepage", async function() {
     const homepage = new HomePage(this.page, this);
     await homepage.verifyLinksOnHomePage();
})