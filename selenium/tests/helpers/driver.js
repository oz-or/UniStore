require("chromedriver");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config({
  path: require("path").join(__dirname, "../../.env"),
});

const HEADLESS = process.env.HEADLESS !== "false";

async function buildDriver() {
  const options = new chrome.Options();
  if (HEADLESS) {
    options.addArguments("--headless=new");
  }
  options.addArguments("--window-size=1440,900");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  return driver;
}

module.exports = { buildDriver };
