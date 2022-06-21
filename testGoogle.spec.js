const { Builder, By, Key } = require("selenium-webdriver");
//Builder - what builds our webpage
//By - how we select the element to click or input values into
//Key - keyboard functionality
const assert = require("assert"); //for our actual test - assertions

describe("check the seacrh functionality in google", function () {
  this.timeout(30000);

  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Go to google and search for QA", async () => {
    driver.get("http://www.google.co.uk"); // navigate to the url declared
    driver.findElement(By.id("L2AGLb")).click(); // accept the agreement
    await driver.findElement(By.name("q")).sendKeys("QA", Key.ENTER); //type QA and press ENTER
    const val = await driver.wait(driver.getTitle(), 1000); // get the title of the webpage and store it into val

    assert.equal(val, "QA - Google Search"); // to check if the value we got is equal to what we expected!
  });

  it("Go to google and search for BMW", async () => {
    driver.get("http://www.google.co.uk");
    driver.findElement(By.id("L2AGLb")).click();
    await driver.findElement(By.name("q")).sendKeys("BMW", Key.ENTER);
    const val = await driver.wait(driver.getTitle(), 1000);

    assert.equal(val, "BMW - Google Search");
  });
});
