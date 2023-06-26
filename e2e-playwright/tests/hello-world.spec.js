const { test, expect } = require("@playwright/test");

const login = async (page) => {
  await page.goto("/auth/login");

  await page.fill('input[name="email"]', "admin@admin.com");
  await page.fill('input[name="password"]', "123456");

  const [response] = await Promise.all([
    page.waitForNavigation(), //wait for navigation to complete
    page.click('input[type="submit"]'), //click the submit button
  ]);
}

test("Main page has link that has text 'Login'", async ({ page }) => {
  await page.goto("/");

  const links = await page.$$eval("a", (elements) =>
    elements.map((el) => el.textContent)
  );

  const loginLinkFound = links.some((text) => text.includes("Login"));

  expect(loginLinkFound).toBe(true);
});

test("Main page has link that has text 'Register'", async ({ page }) => {
  await page.goto("/");

  const links = await page.$$eval("a", (elements) =>
    elements.map((el) => el.textContent)
  );

  const loginLinkFound = links.some((text) => text.includes("Register"));

  expect(loginLinkFound).toBe(true);
});

test("Login succeeds and redirects to /topics", async ({ page }) => {
  await page.goto("/auth/login");

  await page.fill('input[name="email"]', "admin@admin.com");
  await page.fill('input[name="password"]', "123456");

  const [response] = await Promise.all([
    page.waitForNavigation(), //wait for navigation to complete
    page.click('input[type="submit"]'), //click the submit button
  ]);

  //assert that the page URL after login is "/topics"
  expect(response.url()).toBe("http://localhost:7777/topics");
});

test("After submitting a new topic, redirecting works", async ({ page }) => {
  //login first
  await login(page);
  
  //generate a unique topic name
  const topicName = `Test Topic ${Date.now()}`;

  //fill and submit
  await page.fill('input[name="name"]', topicName);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);

  //verify redirection
  expect(page.url()).toBe("http://localhost:7777/topics");
});

test("After submitting a new topic, amount of topics is increased by one", async ({ page }) => {
  //login first
  await login(page);

  //initial amount of topics
  const initialTopicsCount = await page.locator("ul > li").count();

  //generate a unique topic name
  const topicName = `Test Topic ${Date.now()}`;

  //fill and submit
  await page.fill('input[name="name"]', topicName);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);

  //new number of topics
  const finalTopicsCount = await page.locator("ul > li").count();

  //topics increased by one
  expect(finalTopicsCount).toBe(initialTopicsCount + 1);
});

test("After submitting a new topic, check that unique name is displayed on the new list", async ({ page }) => {
  //login first
  await login(page);

  //initial amount of topics
  const initialTopicsCount = await page.locator("ul > li").count();

  //generate a unique topic name
  const topicName = `Test Topic ${Date.now()}`;

  //fill and submit
  await page.fill('input[name="name"]', topicName);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);

  //new topic link is shown
  const newTopicLink = page.locator(`a:has-text("${topicName}")`);
  expect(await newTopicLink.count()).toBe(1);
});

test("Quiz has a link to 'Finnish language'", async ({ page }) => {
  //login first
  await login(page);

  await page.goto("/quiz");
  const link = await page.$('a:has-text("Finnish language")');
  expect(link).toBeTruthy();
});

test("Api random question has answerOptions", async ({ page }) => {
  //login first
  await login(page);

  //get a random question
  const response = await page.goto("/api/questions/random");
  const jsonResponse = await response.json();

  //attribute 'answerOptions' exists in response json
  expect(jsonResponse.answerOptions).toBeDefined();

});

test("Register a new user works", async ({ page }) => {
  // Register a new user
  await page.goto("/auth/register");

  await page.fill('input[name="email"]', "test@test.com");
  await page.fill('input[name="password"]', "654321");

  const [response] = await Promise.all([
    page.waitForNavigation(), 
    page.click('input[type="submit"]'), 
  ]);

  // redirection ok
  
});

test("Register and login with a new user", async ({ page }) => {
  // Register a new user
  await page.goto("/auth/register");

  await page.fill('input[name="email"]', "test2@test.com");
  await page.fill('input[name="password"]', "654321");

  const [response] = await Promise.all([
    page.waitForNavigation(), // Wait for navigation to complete
    page.click('input[type="submit"]'), // Click the submit button
  ]);

  // log in
  await page.goto("/auth/login");

  await page.fill('input[name="email"]', "test2@test.com");
  await page.fill('input[name="password"]', "654321");

  const [loginResponse] = await Promise.all([
    page.waitForNavigation(), 
    page.click('input[type="submit"]'), 
  ]);

  // login succesful 
  expect(loginResponse.url()).toContain("/topics");
});