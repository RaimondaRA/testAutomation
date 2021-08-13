const answer = '#numberAnswerField';
const errorMessage = '#errorMsgField';
const integersOnlyToggle = '#integerSelect';
const integersOnlyTextHidden = '#intSelectionLabel';
const integersOnlyCheckboxVisible = '#integerSelect';

exports.CalculatorResultsPage = class CalculatorResultsPage {
    constructor(page) {
        this.page = page;
    }

    async getAnswer(){
        return await this.page.inputValue(answer);
    }

    async getErrorMessage(){
        return await this.page.textContent(errorMessage);
    }

    async isIntegersOnlyDisabled(){
        return await this.page.isDisabled(integersOnlyToggle);
    }

    async getIntegersOnlyText(){
        return await this.page.isHidden(integersOnlyTextHidden);
    }

    async getIntegersOnlyCheckbox(){
        return await this.page.isVisible(integersOnlyCheckboxVisible);
    }
}