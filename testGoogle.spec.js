const { Builder, By, Key } = require("selenium-webdriver");
//Builder - what builds our browser
//By - how we select the element to click or input values into
//Key - keyboard functionality
const assert = require("assert"); //for our actual test - assertions

describe("check the seacrh functionality in google", function () {
  this.timeout(30000);

  let driver; //declaring a driver variable

  //setting up our browser to be ready for testing - before each test
  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  //terminating the browser after each test
  afterEach(async () => {
    await driver.quit();
  });

  //tests
  it("Go to google and search for QA", async () => {
    driver.get("http://www.google.co.uk"); // navigate to the url declared
    driver.findElement(By.id("L2AGLb")).click(); // accept the agreement
    await driver.findElement(By.name("q")).sendKeys("QA", Key.ENTER); //type QA and press ENTER
    const val = await driver.wait(driver.getTitle(), 1000); // get the title of the webpage and store it into val

    assert.equal(val, "QA - Google Search"); // to check if the value we got is equal to what we expected!
  });

  //tests
  it("Go to google and search for BMW", async () => {
    driver.get("http://www.google.co.uk");
    driver.findElement(By.id("L2AGLb")).click();
    await driver.findElement(By.name("q")).sendKeys("BMW", Key.ENTER);
    const val = await driver.wait(driver.getTitle(), 1000);

    assert.equal(val, "BMW - Google Search");
  });
});

describe("Testing Bing", function () {
  this.timeout(10000);

  let driver;

  // Makes a new driver window before each test
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts({ implicit: 5000 });
  });

  // Closes the driver after each test
  // afterEach(async function () {
  //   driver.close();
  // });

  it("Should search for Doughnut and print this to the screen", async function () {
    // Arrange
    // Tells driver to go to Bing.com website
    driver.get("https://www.bing.com");

    let searchBar; // <- Element to enter search string into
    let searchElement; // <-- The element we're looking for on the search page
    let searchText; // <-- The string of what we searched for

    // Act
    // Finding the search bar by id
    searchBar = driver.findElement(By.id("sb_form_q"));

    // Selecting the search bar and sending the string 'Doughnut' then pressing 'return'
    await searchBar.sendKeys("Doughnut", Key.RETURN);

    // Using await to wait until our driver resolves the promise (page loads fully)
    // Finding an element by xpath to use
    searchElement = await driver.findElement(
      By.xpath(
        "/html/body/div[2]/main/div[2]/div/div/div/div/div/div/a[1]/div[2]/span[1]"
      )
    );

    // getText() returns a promise so using await to wait until it is resolved, saving the string value of the element
    searchText = await searchElement.getText();

    // Assert
    // Checking the value of the string
    assert.equal(searchText, "Doughnut");
  });

  it("should contain a header saying NEWS", async function () {
    // Arrange

    // Going to the BBC page
    driver.get("https://www.bbc.co.uk/");

    // Declaring my variables before accessing them
    let headerElement;
    let headerText;

    // Act
    // Finding the element I am interested in
    headerElement = await driver.findElement(
      By.xpath("/html/body/div/div/header/div[3]/div/div/div/div/div")
    );

    // Saving the getText() value of the element
    headerText = await headerElement.getText();

    // Assert
    assert.equal(headerText, "Welcome to the BBC");
  });
});
