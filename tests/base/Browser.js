import { browser as wdioBrowser } from '@wdio/globals'

class Browser{

    async openURL(url) {
        await wdioBrowser.url(url);
    }

    async maximizeWindow() {
        await wdioBrowser.maximizeWindow();
    }

    async click() {
        await wdioBrowser.click();
    }

    async getText() {
        return await wdioBrowser.getText();
    }

    async getPageTitle() {
        return await wdioBrowser.getTitle();
    }

    async getAttribute(attributeName) {
        return await wdioBrowser.getAttribute(attributeName);
    }

    async waitForElementToBeDisplay(element) {
         await element.waitForDisplayed(10000);
    }
    
    async waitForDisplayAndClick(element) {
        await this.waitForElementToBeDisplay(element);
        await element.click();
    }

    async waitForPageToLoad(element, pageHeader) {
        await browser.waitUntil(async function () {
            const state = await browser.execute(() => document.readyState);
            if (state === 'complete') {
                const text = await element.getText();
                return text.toUpperCase().trim() === pageHeader.toUpperCase().trim();
            }
            return false;
        }, {
            timeout: 10000,
            timeoutMsg: 'Header "' + pageHeader + '" is not displayed after given time',
            interval: 500
        });
    
        const currentPageHeader = await element.getText();
        console.log("************Current page Header : " + currentPageHeader + " ************");
    }
    

}

export default new Browser();

