exports.CalculatorStartPage = class CalculatorStartPage {
    constructor(page) {
        this.page = page;
    }
    async goto(){
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async wait(){
        await this.page.waitForSelector('a.navbar-brand.js-scroll-trigger');
    }

    async selectBuild(buildType){
        await this.page.click('#selectBuild');
        await this.page.selectOption('#selectBuild', { label: buildType} );
    }

    async enterNumbers(number1, number2){
        await this.page.fill('#number1Field', number1);
        await this.page.fill('#number2Field', number2);
    }

    async selectOperation(operation){
        await this.page.click('#selectOperationDropdown');
        await this.page.selectOption('#selectOperationDropdown', { label: operation} );
    }

    async selectOperationAndCalculate(operation){
        await this.page.click('#selectOperationDropdown');
        await this.page.selectOption('#selectOperationDropdown', { label: operation} );
        await this.page.click('#calculateButton');
    }

    async selectIntegersOnly(){
        await this.page.check('#integerSelect');
    }
}