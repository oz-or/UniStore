const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.driver.get(`${this.baseUrl}/cart`);
  }

  async waitForRedirectOrCart() {
    const loginLocator = By.css(
      'form[action="/login"] , input[name="email"], input[name="password"]',
    );
    const heading = By.xpath("//h1[contains(.,'Cart')]");
    await this.driver.wait(async () => {
      const url = await this.driver.getCurrentUrl();
      if (url.includes("/login")) return true;
      const cartHeadings = await this.driver.findElements(heading);
      if (cartHeadings.length > 0) return true;
      const loginForm = await this.driver.findElements(loginLocator);
      return loginForm.length > 0;
    }, 10000);
  }
}

module.exports = CartPage;
