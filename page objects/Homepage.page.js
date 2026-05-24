//HomePage :
const { expect } = require("@playwright/test");
const { takeScreenshot } = require("../tests/support/screenshot.helper");
const { APP_URL, testData } = require("../tests/config/testData");
const LoginPage = require("./Login.page");

const locators = {
   "dashboard_link":"#dashboard",
   "analytics_link":"#analytics",
   "courses_link":"#courses",
   "live_workshops_link":"#live-workshops",
   "services_link":"#services",
  "coupons_link":"#coupons",
  "storefront_link":"#storefront",
  "settings_link":"#settings"
 }
 
 class HomePage extends LoginPage {
  constructor(page, context) {
    super(page, context);
  }
  //navigateToHomePage
   async navigateToHomePage() {
    await this.navigateToLoginPage();
    const { email, password } = testData.validCredentials;
    await this.enterCredentials(email, password);
    await this.clickLoginButton();
  }

  async verifyLinksOnHomePage() {
    await this.assertHomePageIsDisplayed();
    await this.page.waitForSelector(locators.dashboard_link);
    const dashboardLinkVisible = await this.page.isVisible(locators.dashboard_link);
    const analyticsLinkVisible = await this.page.isVisible(locators.analytics_link); 
    const coursesLinkVisible = await this.page.isVisible(locators.courses_link);
    const liveWorkshopsLinkVisible = await this.page.isVisible(locators.live_workshops_link);
    const servicesLinkVisible = await this.page.isVisible(locators.services_link);
    const couponsLinkVisible = await this.page.isVisible(locators.coupons_link);
    const storefrontLinkVisible = await this.page.isVisible(locators.storefront_link);
    const settingsLinkVisible = await this.page.isVisible(locators.settings_link);
    return expect(dashboardLinkVisible && analyticsLinkVisible && coursesLinkVisible && liveWorkshopsLinkVisible && servicesLinkVisible && couponsLinkVisible && storefrontLinkVisible && settingsLinkVisible).toBeTruthy();
  }

}


module.exports = { HomePage };
