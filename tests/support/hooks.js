// hooks.js
const { Given } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;

BeforeAll(async function () {
  // Launch once before all scenarios
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  // Close once after all scenarios
  await browser.close();
});

Before(async function () {
  // Create a fresh context + page for each scenario
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  // Close context after each scenario
  await this.context.close();
});