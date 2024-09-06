import assert from "../base/Assert.js"
import browser from "../base/Browser.js";



class LoginPage{
    async launchUrl(url) {
        await browser.openURL(url);
        //await browser.maximizeWindow();
    }
}

export default new LoginPage();