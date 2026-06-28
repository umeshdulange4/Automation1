const { expect } = require("@playwright/test");

class CommonPage {
  constructor(page) {
    this.page = page;
  }

  // selectorOrLocator: string selector or Playwright Locator
  // expected: string or RegExp
  async ValidateElementText(selectorOrLocator, expected) {
    let text = '';

    if (selectorOrLocator && typeof selectorOrLocator === 'object' && typeof selectorOrLocator.textContent === 'function') {
      // It's a Locator
      try {
        await selectorOrLocator.waitFor({ state: 'visible', timeout: 5000 });
      } catch (e) {
        // ignore wait error
      }
      text = await selectorOrLocator.textContent();
    } else if (typeof selectorOrLocator === 'string') {
      await this.page.waitForSelector(selectorOrLocator, { state: 'visible', timeout: 5000 });
      text = await this.page.textContent(selectorOrLocator);
    } else {
      throw new Error('Invalid selectorOrLocator provided to ValidateElementText');
    }

    text = (text || '').trim();

    if (expected instanceof RegExp) {
      return expect(text).toMatch(expected);
    }

    return expect(text).toEqual(expected);
  }
}

module.exports = CommonPage;
