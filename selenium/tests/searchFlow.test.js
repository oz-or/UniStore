const { expect } = require("chai");
const { buildDriver } = require("./helpers/driver");
const HomePage = require("./pageObjects/homePage");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

describe("Search submission", function () {
  this.timeout(40000);
  let driver;
  let home;

  beforeEach(async () => {
    driver = await buildDriver();
    home = new HomePage(driver, BASE_URL);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("navigates to search results with the query in URL", async () => {
    const query = "phone";
    await home.open();
    await home.search(query);
    await driver.wait(
      async () => (await driver.getCurrentUrl()).includes("/search?q="),
      5000,
    );
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.contain(`q=${encodeURIComponent(query)}`);
  });
});
