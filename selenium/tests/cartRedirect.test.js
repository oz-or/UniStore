const { expect } = require("chai");
const { buildDriver } = require("./helpers/driver");
const CartPage = require("./pageObjects/cartPage");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

describe("Cart access when logged out", function () {
  this.timeout(40000);
  let driver;
  let cart;

  beforeEach(async () => {
    driver = await buildDriver();
    cart = new CartPage(driver, BASE_URL);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("redirects to login or shows cart heading", async () => {
    await cart.open();
    await cart.waitForRedirectOrCart();
    const url = await driver.getCurrentUrl();
    const isLogin = url.includes("/login");
    expect(
      isLogin || url.includes("/cart"),
      "Should redirect to login or stay on cart",
    ).to.be.true;
  });
});
