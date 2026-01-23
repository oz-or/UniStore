const { By, until } = require("selenium-webdriver");

class ProductPage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForLoaded() {
    const price = By.css(
      '[data-testid="product-card-price"], [data-testid="product-price"]',
    );
    await this.driver.wait(until.elementLocated(price), 10000);
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(price)),
      5000,
    );
  }
}

module.exports = ProductPage;
