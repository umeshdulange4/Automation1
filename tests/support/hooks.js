// hooks.js
const { Given, BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;

BeforeAll(async function () {
  // Launch once before all scenarios
  browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
  // Close once after all scenarios
  await browser.close();
});

Before(async function () {
  // Create a fresh context + page for each scenario
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.consoleLogs = [];

  this.page.on('console', (msg) => {
    const logText = `[${msg.type()}] ${msg.text()}`;
    this.consoleLogs.push(logText);
  });
});

After(async function () {
  if (this.consoleLogs && this.consoleLogs.length > 0) {
    await this.attach(this.consoleLogs.join('\n'), 'text/plain');
  }

  // Close context after each scenario
  await this.context.close();
});