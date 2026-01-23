const { By, until } = require("selenium-webdriver");

class HomePage {
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.driver.get(this.baseUrl);
  }

  async waitForProductCards() {
    const cardLocator = By.css('[data-testid="product-card"]');
    await this.driver.wait(until.elementLocated(cardLocator), 10000);
    await this.driver.wait(until.elementsLocated(cardLocator), 10000);
    return cardLocator;
  }

  async clickFirstProductCard() {
    const cardLocator = await this.waitForProductCards();
    const firstCard = (await this.driver.findElements(cardLocator))[0];
    await this.driver.wait(until.elementIsVisible(firstCard), 5000);
    await firstCard.click();
  }

  async search(query) {
    const input = await this.driver.findElement(
      By.css('[data-testid="navbar-search-input"]'),
    );
    const submit = await this.driver.findElement(
      By.css('[data-testid="navbar-search-submit"]'),
    );
    await input.clear();
    await input.sendKeys(query);
    await submit.click();
  }
}

module.exports = HomePage;
