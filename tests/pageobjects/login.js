import assert from "../base/Assert.js"
import browser from "../base/Browser.js";



class LoginPage{
    async loginToApplication(url) {
        await browser.openURL(url);
    }
}

export default new LoginPage();