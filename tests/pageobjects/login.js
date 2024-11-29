import assert from "../base/Assert.js"
import browser from "../base/Browser.js";
import logger from "../utils/CustomLogger.js";
import commonSelectors from '../../resources/selectors/common/common.json' assert { type: 'json' };




class LoginPage {
    async launchUrl(url) {
        await browser.openURL(url);
        let pageTitle = await browser.getPageTitle();
        assert.assertEqual(pageTitle, "OrangeHRM");
        logger.log("****Navigated to URL: " + url);
    }


    async enterUserName(element, username) {
        await browser.setValue(element, username);
        logger.log("**** Entered username: " + username);
    }

    async enterPassword(element, password) {
        await browser.setValue(element, password);
        logger.log("**** Entered password: " + password);
    }

    async clickSubmit(element) {
        await browser.click(element);
        logger.log("**** Clicked On Submit button");
    }

    async userLandsOnHomePage() {
        await browser.waitForElementToBeVisible(eval(commonSelectors.headerMenu.btn_upgrade));
        logger.log("User lands on home page");
    }

    async checkIfUserNavigatedToCorrectURL() {
        browser.checkUseNavigatedToCorrectUrl("demo.orangehrmlive.com")
    }

    async logout() {
        await browser.click(eval(commonSelectors.logout.panel_logout));
        await browser.click(eval(commonSelectors.logout.btn_logout));
        await browser.waitForElementToBeVisible(eval(commonSelectors.login.btn_login)
        );
    }

}
export default new LoginPage();