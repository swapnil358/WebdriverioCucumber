import { expect } from 'chai'


class assert{
    async assertEqual(actual, expected, message) {
        const errorMessage = message ? message : `Assert failed ==> ${actual} does not match ${expected}`;
        // Log a message before the assertion
        console.log(`Asserting that ${actual} equals ${expected}`);
        // Perform the assertion and provide the error message if it fails
       await expect(actual).to.be.equal(expected, errorMessage);
        // Log a success message if the assertion passes
        console.log(message ? message : `Assertion passed: ${actual} equals ${expected}`);
    } 

    assertNotEqual(actual, expected, message) {
        return expect(actual).to.be.not.equal(expected, message);
    }

    assertDeepEqual(actual, expected, message) {
        return expect(actual).to.be.deep.equal(expected, message);
    }

    assertNotDeepEqual(actul, expected, message) {
        return expect(actual).to.be.not.deep.equal(expected, message);
    }

    assertTrue(value, message) {
        return expect(value).to.be.true(message);
    }

    assertFalse(value, message) {
        return expect(value).to.be.false(message);
    }

    assertExist(value, message) {
        return expect(value).to.exist(message);
    }

    assertNotExist(value, message) {
        return expect(value).to.not.exist(message);
    }

    assertGreaterThan(actual, value, message) {
        return expect(actual).to.be.above(value, message);
    }

    assertLessThan(actual, value, message) {
        return expect(actual).to.be.below(value, message);
    }

    async assertElementIsVisible(element, message) {
        let message1 = message ? message : element.toString() + "  is not visible";
        expect(await element.isDisplayed()).equal(true, message1);
    }

    async assertElementIsEnable(element, message) {
        let message1 = message ? message : element.toString() + "  is not visible";
        expect(await element.isEnabled()).equal(true, message1);
    }

    async elementIsSelected(element, message) {
        let message1 = message ? message : element.toString() + "  is not selected";
        expect(await element.isSelected()).equal(true, message1);
    }

    async elementNotSelected() {
        let message1 = element.toString() + "  is selected";
        expect(await element.isSelected()).equal(false, message1);
    }



    assertInclude(element, expectedText, message) {
       // expect(element.getText().include(message)).equal(true, message ? message : element.toString() + "  is not visible");
        expect(element.getText()).to.include(expectedText, message, message ? message : element.toString() + "  is not visible");
    }

    assertNotInclude(element, expectedText, message) {
        return expect(haystack).to.not.include(expectedText, message, message ? message : element.toString() + "  is not visible");
    }

    
    

    







}


export default new assert();