const { test, expect } = require('@playwright/test');
const { CalculatorStartPage } = require('../pages-homework/calculatorStartPage');
const { CalculatorResultsPage } = require('../pages-homework/calculatorResultsPage');

test.describe('Test calculator application', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        startPage = new CalculatorStartPage(page);
        resultsPage = new CalculatorResultsPage(page);
});

test.beforeEach(async () => {
    await startPage.goto();
    await startPage.wait();
});

const wholeNumber1 = Math.trunc(Math.random()*50+30);
const wholeNumber2 = Math.trunc(Math.random()*20);
const negativeNumber = Math.floor(Math.random()*10) - 10;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const character = alphabet[Math.floor(Math.random() * alphabet.length)];

test('Testing addition of two positive integers in Prototype build ', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
    await startPage.selectOperationAndCalculate('Add');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual((wholeNumber1 + wholeNumber2).toString());
});

test('Testing subtraction of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
    await startPage.selectOperationAndCalculate('Subtract');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual((wholeNumber1 - wholeNumber2).toString());
});

test('Testing multiplication of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
    await startPage.selectOperationAndCalculate('Multiply');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual((wholeNumber1 * wholeNumber2).toString());
});

test('Testing division of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
    await startPage.selectOperationAndCalculate('Divide');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual((wholeNumber1 / wholeNumber2).toString());
});

test('Testing concatenation of two positive integers', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
    await startPage.selectOperationAndCalculate('Concatenate');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual(wholeNumber1.toString() + wholeNumber2.toString());
});

const differentBuilds = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

differentBuilds.forEach(differentBuild => {
    test.only(`Select ${differentBuild} build to calculate addition`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Add');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((wholeNumber1 + wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to calculate subtraction`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Subtract');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((wholeNumber1 - wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to calculate multiplication`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Multiply');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((wholeNumber1 * wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to calculate division`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((wholeNumber1 / wholeNumber2).toString());
    });

    test.only(`Select ${differentBuild} to calculate greater/smaller number division with "Integers only" checked`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectIntegersOnly();
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual(Math.trunc((wholeNumber1 / wholeNumber2)).toString());
    });

    test(`Select ${differentBuild} to calculate smaller/greater number division with "Integers only" checked`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectIntegersOnly();
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual(Math.trunc((wholeNumber2 / wholeNumber1)).toString());
    });

    test(`Select ${differentBuild} to calculate concatenation`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber1.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Concatenate');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual(wholeNumber1.toString() + wholeNumber2.toString());
    });

    test.only(`Select ${differentBuild} to calculate addition using invalid characters`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(character, wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Add');
        const errorMessage = await resultsPage.getErrorMessage();

        expect(errorMessage).toContain('Number 1 is not a number');
    });

    test(`Select ${differentBuild} build to toggle "Integers only"`, async () => {
        await startPage.selectBuild(differentBuild);
        const integersOnlyToggle = await resultsPage.isIntegersOnlyDisabled();

        expect(integersOnlyToggle).toBe(false);
    });

    test.only(`Select ${differentBuild} build to check if toggle "Integers only" is visible when concatenating`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.selectOperation('Concatenate');
        const integersOnlyTextHidden = await resultsPage.getIntegersOnlyText();
        const integersOnlyCheckboxVisible = await resultsPage.getIntegersOnlyCheckbox();

        expect(integersOnlyTextHidden).toBe(true);
        expect(integersOnlyCheckboxVisible).toBe(false);
    });

    test.only(`Select ${differentBuild} to test addition of one positive and one negative integers`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(negativeNumber.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Add');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((negativeNumber + wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to test multiplication of one positive and one negative integers`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(negativeNumber.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Multiply');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((negativeNumber * wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to test division of one positive and one negative integers`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(negativeNumber.toString(), wholeNumber2.toString());
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual((negativeNumber / wholeNumber2).toString());
    });

    test(`Select ${differentBuild} to test concatenation of one positive and one negative integers`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers(wholeNumber2.toString(), negativeNumber.toString());
        await startPage.selectOperationAndCalculate('Concatenate');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual(wholeNumber2.toString() + negativeNumber.toString());
    });
});
});