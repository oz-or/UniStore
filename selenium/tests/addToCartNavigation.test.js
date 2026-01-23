const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const { buildDriver } = require("./helpers/driver");
const HomePage = require("./pageObjects/homePage");
const ProductPage = require("./pageObjects/productPage");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

describe("Home to product navigation", function () {
  this.timeout(60000);
  let driver;
  let home;
  let product;

  beforeEach(async () => {
    driver = await buildDriver();
    home = new HomePage(driver, BASE_URL);
    product = new ProductPage(driver);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("opens first product card and shows product details", async () => {
    await home.open();
    const cardLocator = await home.waitForProductCards();
    const firstCard = (await driver.findElements(cardLocator))[0];
    const nameText = await firstCard.findElement(
      By.css('[data-testid="product-card-name"]'),
    );
    const expectedName = await nameText.getText();

    // Click on the product image (inside the clickable div)
    const productImage = await firstCard.findElement(
      By.css('[data-testid="product-card-image"]'),
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      productImage,
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", productImage);

    await driver.wait(until.urlContains("/product/"), 10000);
    await product.waitForLoaded();

    const pageSource = await driver.getPageSource();
    expect(pageSource).to.contain(expectedName);
  });
});
