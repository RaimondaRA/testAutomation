const { test, expect } = require('@playwright/test');
const { CalculatorStartPage } = require('../pages-homework/calculatorStartPage');
const { CalculatorResultsPage } = require('../pages-homework/calculatorResultsPage');

test.describe('', () => {
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

test('Testing addition of two positive integers in Prototype build ', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers('10', '17');
    await startPage.selectOperationAndCalculate('Add');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('27');
    //expect(answer === '27').toBeTruthy();
    //expect(answer === '27').toBe(true);
});

test('Testing subtraction of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers('10', '15');
    await startPage.selectOperationAndCalculate('Subtract');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('-5');
    //expect(answer === '-5').toBeTruthy();
    //expect(answer === '-5').toBe(true);
});

test('Testing multiplication of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers('10', '15');
    await startPage.selectOperationAndCalculate('Multiply');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('150');
    //expect(answer === '150').toBeTruthy();
    //expect(answer === '150').toBe(true);
});

test('Testing division of two positive integers in Prototype build', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers('10', '15');
    await startPage.selectOperationAndCalculate('Divide');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('0.6666666666666666');
    //expect(answer === '0.6666666666666666').toBe(true);
});

test('Testing concatenation of two positive integers', async () => {
    await startPage.selectBuild('Prototype');
    await startPage.enterNumbers('10', '18');
    await startPage.selectOperationAndCalculate('Concatenate');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('1018');
    //expect(answer === '1018').toBe(true);
});

const differentBuildsAdd = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsAdd.forEach(differentBuild => {
    test.only(`Select ${differentBuild} build to calculate addition`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectOperationAndCalculate('Add');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('25');
        //expect(answer === '25').toBe(true);
    });
});
/*Bugs found: Build 2 -> numbers 15 and 10 are concatenated, not added (as it is expected) and result received is 1510, though it should be 25.
              Build 7 -> add function does not work as expected. The given result is equal to the value entered in the second input field.
                         Everytime "Calculate" is clicked, the result is increased by the number in the second input field.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsSubtract = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsSubtract.forEach(differentBuild => {
    test(`Select ${differentBuild} to calculate subtraction`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectOperationAndCalculate('Subtract');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('5');
        //expect(answer === '5').toBe(true);
    });
});
/*Bugs found: Build 7 -> subtract function does not work as expected. The results received are incorrect. Expect result was "5", received - "-10".
              Build 8 -> subtract function does not work as expected. The results received are incorrect. Expect result was "5", received - "-5".
                         Clicking on "Calculate" button everytime returns the opposite (negative or positive) value than expected, for example, if the expected value is "-10",
                         the received value is "10", etc.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsMultiply = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsMultiply.forEach(differentBuild => {
    test(`Select ${differentBuild} to calculate multiplication`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectOperationAndCalculate('Multiply');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('150');
        //expect(answer === '150').toBe(true);
    });
});
/*Bugs found: Build 7 -> multiply function does not work as expected. The results received are incorrect. Expect result was "150", received - "0".
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsDivide = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsDivide.forEach(differentBuild => {
    test(`Select ${differentBuild} to calculate division`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('1.5');
        //expect(answer === '1.5').toBe(true);
    });
});
/*Bugs found: Build 4 -> it is not possible to check/uncheck option "Integers only", though this is available in other builds
                         (except in concatenate function). So actual result is "1", instead of "1.5" (which was expected)
              Build 7 -> received value 0 instead of 1.5. Everytime "0" is returned as a result.
              Build 8 -> received value 0.6666666666666666 instead of 1.5
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsDivideIntegersOnly = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsDivideIntegersOnly.forEach(differentBuild => {
    test.only(`Select ${differentBuild} to calculate division with "Integers only" checked`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectIntegersOnly();
        await startPage.selectOperationAndCalculate('Divide');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('1');
        //expect(answer === '1').toBe(true);
    });
});
/*Bugs found: Build 7 and 8 -> received value 0 instead of 1.5. Everytime "0" is returned as a result.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsConcatenate = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsConcatenate.forEach(differentBuild => {
    test(`Select ${differentBuild} to calculate concatenation`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('15', '10');
        await startPage.selectOperationAndCalculate('Concatenate');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('1510');
        //expect(answer === '150').toBe(true);
    });
});
/*Bugs found: Build 2 -> 15 and 10 are added, not concatenated (as it is expected) and result received is 25, though it should be 1510.
              Build 7 -> concatenation function does not work as expected. The results received are incorrect. Expected result was "1510", received - "10".
                         Concatenate function everytime returns only the second number input value as a result.
              Build 8 -> concatenation function does not work as expected. The results received are incorrect. Expected result was "1510", received - "1015".
                         Concatenate function everytime returns the second number concatenated with the first number in the wrong order, i.e. second number comes first adn first number comes second.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsInvalidAdd = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsInvalidAdd.forEach(differentBuild => {
    test.only(`Select ${differentBuild} to calculate addition using invalid characters`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('q', '10');
        await startPage.selectOperationAndCalculate('Add');
        const errorMessage = await resultsPage.getErrorMessage();

        expect(errorMessage).toContain('Number 1 is not a number');
    });
});
/*Bugs found: Builds 1, 2 and 7 -> it is allowed to enter letter in the number field, no error message is displayed. The result received,
                                   for example in the Build 2 is "q10".
              Build 8 -> wrong error message - "Number 2 is not a number" is displayed.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsAddCheckbox = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsAddCheckbox.forEach(differentBuild => {
    test.only(`Select ${differentBuild} build to toggle "Integers only"`, async () => {
        await startPage.selectBuild(differentBuild);
        const integersOnlyToggle = await resultsPage.disableIntegersOnly();

        expect(integersOnlyToggle).toBe(false);
        //expect(integersOnlyToggle).toBe(true); //if .isEnabled is used
    });
});
/*Bugs found: Build 4 -> it is not possible to choose whether the answer should be as an integer value - checkbox is disabled and checked by default*/


const differentBuildsConcatenateCheckbox = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsConcatenateCheckbox.forEach(differentBuild => {
    test.only(`Select ${differentBuild} build to check if toggle "Integers only" is visible when concatenating`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.selectOperation('Concatenate');
        const integersOnlyTextHidden = await resultsPage.getIntegersOnlyText();
        const integersOnlyCheckboxVisible = await resultsPage.getIntegersOnlyCheckbox();

        expect(integersOnlyTextHidden).toBe(true);
        expect(integersOnlyCheckboxVisible).toBe(false);
    });
});
/*Bugs found: Build 3 -> When concatonate is chosen "integers only" selection is visible.*/


const differentBuildsAddPositiveAndNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsAddPositiveAndNegative.forEach(differentBuild => {
test(`Select ${differentBuild} to test addition of one positive and one negative integers`, async () => {
    await startPage.selectBuild(differentBuild);
    await startPage.enterNumbers('-10', '15');
    await startPage.selectOperationAndCalculate('Add');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('5');
    //expect(answer === '5').toBe(true);
    });
});
/*Bugs found are the same as testing with two positive integers:
              Build 2 -> -10 and 15 are concatenated, not added (as it is expected) and result received is -1015, though it should be 55.
              Build 7 -> add function does not work as expected. The given result is equal to the value entered in the second input field.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsMultiplyPositiveAndNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsMultiplyPositiveAndNegative.forEach(differentBuild => {
test(`Select ${differentBuild} to test multiplication of one positive and one negative integers`, async () => {
    await startPage.selectBuild(differentBuild);
    await startPage.enterNumbers('-10', '15');
    await startPage.selectOperationAndCalculate('Multiply');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('-150');
    //expect(answer === '-150').toBe(true);
    });
});
/*Bugs found are the same as testing with two positive integers:
              Build 7 -> multiply function does not work as expected. The results received are incorrect.
              Build 9 -> Second input field is missing/is not visible.*/


const differentBuildsDividePositiveAndNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsDividePositiveAndNegative.forEach(differentBuild => {
test(`Select ${differentBuild} to test division of one positive and one negative integers`, async () => {
    await startPage.selectBuild(differentBuild);
    await startPage.enterNumbers('-10', '15');
    await startPage.selectOperationAndCalculate('Divide');
    const answer = await resultsPage.getAnswer();

    expect(answer).toEqual('-0.6666666666666666');
    //expect(answer === '-0.6666666666666666').toBe(true);
    });
});
/*Bugs found are the same as testing with two positive integers: Bugs in builds 4, 7, 8 and 9.*/


const differentBuildsConcatenatePositiveAndNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsConcatenatePositiveAndNegative.forEach(differentBuild => {
    test(`Select ${differentBuild} to test concatenation of one positive and one negative integers`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('10', '-18');
        await startPage.selectOperationAndCalculate('Concatenate');
        const answer = await resultsPage.getAnswer();

        expect(answer).toEqual('10-18');
        //expect(answer === '10-18').toBe(true);
    });
});
/*Bugs found are the same as testing with two positive integers: Bugs in builds 2, 7, 8 and 9.*/

});


//Attempt to parametrize test to be executed on each build with each different operation
/*
const differentBuildsAllActions = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
differentBuildsAllActions.forEach(differentBuild => {
const differentActions = ['Add', 'Subtract', 'Multiply', 'Divide', 'Concatenate'];
differentActions.forEach(differentAction => {
    test(`Select ${differentBuild} and ${differentAction} for calculation`, async () => {
        await startPage.selectBuild(differentBuild);
        await startPage.enterNumbers('10', '15');
        await startPage.selectOperationAndCalculate(differentAction);

        const addFunctionAnswer = await page.inputValue('#numberAnswerField');
        const subtractFunctionAnswer = await page.inputValue('#numberAnswerField');
        const multiplyFunctionAnswer = await page.inputValue('#numberAnswerField');
        const divideFunctionAnswer = await page.inputValue('#numberAnswerField');
        const concatenateFunctionAnswer = await page.inputValue('#numberAnswerField');

        expect(addFunctionAnswer).toEqual('25');
        expect(subtractFunctionAnswer).toEqual('5');
        expect(multiplyFunctionAnswer).toEqual('150');
        expect(divideFunctionAnswer).toEqual('1.5');
        expect(concatenateFunctionAnswer).toEqual('1510');
    });
  });
});
*/


