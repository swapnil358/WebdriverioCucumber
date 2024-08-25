import { browser as wdioBrowser } from '@wdio/globals'; // Import the global browser
//import expectWebdriverIO from 'expect-webdriverio';
//const { expect } = expectWebdriverIO;
import chai from 'chai';
const chaiExpect = chai.expect;

class Assert {

    async assertEqual(actual, expected, message) {
        const errorMessage = message ? message : `Assert failed ==> ${actual} does not match ${expected}`;
        console.log(`Asserting that ${actual} equals ${expected}`);
        chaiExpect(actual).to.equal(expected, errorMessage); // Chai assertion
        console.log(`Assertion passed: ${actual} is equals to ${expected}`);
    }

    async assertPageTitle(expectedTitle, message) {
        const errorMessage = message ? message : `Page title does not match expected title: ${expectedTitle}`;
        await expect(browser).toHaveTitle(expectedTitle, { message: errorMessage }); // WebdriverIO assertion
    }

    async assertElementIsVisible(element, message) {
        const errorMessage = message ? message : `${element.toString()} is not visible`;
        await expect(element).toBeDisplayed({ message: errorMessage }); // WebdriverIO assertion
        console.log(`Assertion passed: ${element.toString()} is visible.`);
    }

    // Other assertion methods...
}

export default new Assert();
