const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage');
const { DuckResultsPage } = require('../pages/duckResultsPage');

test.describe('', () => {
    let page;
    
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        startPage = new DuckStartPage(page);
        resultsPage = new DuckResultsPage(page);
    });

    test.beforeEach(async () => {
        await startPage.goto();
    });

test('duckduckgo is loading', async () => {
    //await page.goto('https://duckduckgo.com/');
    const duckLogo = await page.isVisible('#logo_homepage_link');
    
    expect(duckLogo).toBe(true);
});

test('Test that search is working', async () => {
    //await page.goto('https://duckduckgo.com/');
    
    //await page.waitForSelector('#logo_homepage_link'); //laukia kol psl atsiras logo selector'ius
    //await page.fill('#search_form_input_homepage', 'Test');
    //await page.click('#search_button_homepage');
    await startPage.initiateSearh('Test')
    const result1TextContent = await page.textContent('#r1-0');
    //console.log(result1TextContent);    
    expect(result1TextContent).toContain('Test');
    
});

test('Test that search is working recorded by inspector', async () => {
    //await page.goto('https://start.duckduckgo.com/');
    await page.fill('input[name="q"]', 'Test');
    // Click input[name="q"]
    await page.click('input[name="q"]');
    // Click input:has-text("S")
    await Promise.all([
    page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&ia=web' }*/),
    page.click('input:has-text("S")')
    ]);
    // Click #links div div:has-text("Test | Definition of Test by Merriam-WebsterYour browser indicates if you've vis")
    await page.click('#links div div:has-text("Test | Definition of Test by Merriam-WebsterYour browser indicates if you\'ve vis")');
    expect(page.url()).toBe('https://www.merriam-webster.com/dictionary/test');
});

test('Test that cheat sheets are working', async () => {
    //await page.goto('https://duckduckgo.com/');

    // await page.waitForSelector('#logo_homepage_link'); 
    // await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
    // await page.click('#search_button_homepage');
    await startPage.initiateSearh('microsoft word cheat sheet')
    const isCheatSheetsVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
    const cheatSheetsTitle = await page.textContent('h3.c-base__title');
    
    expect(isCheatSheetsVisible).toBe(true);
    expect(cheatSheetsTitle).toContain('Microsoft Word 2010');
    
});

test('Test that wikipedia shortener works', async () => {
    //await page.goto('https://duckduckgo.com/');
    
    //await page.waitForSelector('#logo_homepage_link'); 
    //await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
    //await page.click('#search_button_homepage');
    await startPage.initiateSearh('shorten www.wikipedia.com');
    const shortenedUrl = await page.inputValue('#shorten-url');
    //const shortenedUrl = await page.isVisible('#shorten-url', 'value');
    await page.goto(shortenedUrl);
    const url = page.url();
    expect(url).toBe('https://www.wikipedia.org/');
    
});

test('Check that inTitle functionality works', async () => {
        //await page.goto('https://start.duckduckgo.com/');
        
        // await page.waitForSelector("#search_form_input_homepage");
        // await page.fill('#search_form_input_homepage', "intitle:panda");
        // await page.click("#search_button_homepage");
        await startPage.initiateSearh('intitle:panda');
        await page.waitForNavigation();
        const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
        results.forEach(result => {
        expect(result).toContain("Panda");
        });
    });


    const passwordsLengths = ['8', '16', '64'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
        //await page.goto('https://start.duckduckgo.com/');
        
        // await page.waitForSelector("#search_form_input_homepage");
        // await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        // await page.click("#search_button_homepage");
        await startPage.initiateSearh("password " + passwordLength);

        //const generatedPassword = await page.textContent(".c-base__title");
        const generatedPassword = await resultsPage.generatedPassword();
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

  const invalidPasswordsLengths = ['7', '65'];
  invalidPasswordsLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password2`, async () => {
      //await page.goto('https://start.duckduckgo.com/');
      
      //await page.waitForSelector("#search_form_input_homepage");
      //await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      //await page.click("#search_button_homepage");
      await startPage.initiateSearh("password " + passwordLength);
      const isPassworrElementVisible = await page.isVisible(".c-base__sub");
      expect(isPassworrElementVisible).toEqual(false)
    });
  });

});
