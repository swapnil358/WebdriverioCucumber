import { expect } from 'chai'


class assert{
    asserEqual(actual, expected, message) {
        return expect(actual).to.be.equal(expected, message);
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

    assertInclude(haystack, needle, message) {
        return expect(haystack).to.include(needle, message);
    }

    assertNotInclude(haystack, needle, message) {
        return expect(haystack).to.not.include(needle, message);
    }

    







}


export default new assert();