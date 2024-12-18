import { browser as wdioBrowser } from '@wdio/globals';
import path from 'path';
import fs from 'fs';
import logger from '../utils/CustomLogger.js';

class Browser {
  async openURL(url) {
    await wdioBrowser.url(url);
  }

  async maximizeWindow() {
    await wdioBrowser.maximizeWindow();
  }

  async click(element) {
    await element.click();
  }

  async getText(element) {
    await element.waitForDisplayed({ timeout: 5000 });
    await element.waitForEnabled({ timeout: 5000 });
    const txt = await element.getText();
    console.log("Text Displayed =====>" + txt);
    return txt;
  }

  async getPageTitle() {
    const title = await wdioBrowser.getTitle();
    console.log("Page Title==>" + title);
    return title;
  }

  async getAttribute(element, attributeName) {
    return await element.getAttribute(attributeName);
  }

  async waitForElementToBeVisible(elementPromise) {
    const element = await elementPromise;
    const elementDescription = element.selector || element.elementId || element.toString();
    await this.waitForCondition(
      async () => await element.isDisplayed(),
      {
        timeoutMsg: `Element "${elementDescription.toString()}" is not visible after the given time`,
      }
    );
  }

  async waitForElementNotToBeVisible(elementPromise) {
    const element = await elementPromise;
    const elementDescription = element.selector || element.elementId || element.toString();
    await this.waitForCondition(
      async () => !(await element.isDisplayed()),
      {
        timeoutMsg: `Element "${elementDescription.toString()}" is visible after the given time`,
      }
    );
  }

  async waitUntil(condition) {
    wdioBrowser.waitUntil(condition, {
      timeout: 10000,
      timeoutMsg: 'Expected condition is not satisfied after 10000 ms',
      interval: 1000,
    })
  }


  async waitForDisplayAndClick(element) {
    await this.waitForElementToBeVisible(element);
    await element.click();
  }

  async waitForPageToLoad(element, pageHeader) {
    await wdioBrowser.waitUntil(
      async () => {
        const state = await wdioBrowser.execute(() => document.readyState);
        if (state === "complete") {
          const text = await element.getText();
          return text.toUpperCase().trim() === pageHeader.toUpperCase().trim();
        }
        return false;
      },
      {
        timeout: 10000,
        timeoutMsg:
          `Header "${pageHeader}" is not displayed after the given time`,
        interval: 500,
      }
    );

    const currentPageHeader = await element.getText();
    console.log(
      "************Current page Header : " + currentPageHeader + " ************"
    );
  }

  async pause(timeout) {
    await wdioBrowser.pause(timeout);
  }

  async scrollIntoView(element) {
    return await element.scrollIntoView();
  }

  async setValue(element, content) {
    await element.waitForDisplayed({ timeout: 5000 });
    await element.waitForEnabled({ timeout: 5000 });
    await element.clearValue(); // Clear any existing value first
    await element.setValue(content);
  }

  async waitForCondition(
    conditionFn,
    {
      timeout = 10000,
      timeoutMsg = "Condition not met in the given time",
      interval = 500,
    } = {}
  ) {
    await wdioBrowser.waitUntil(conditionFn, {
      timeout,
      timeoutMsg,
      interval,
    });
  }

  async waitForElementToBeEnabled(element) {
    await this.waitForCondition(
      async () => await element.isEnabled(),
      {
        timeoutMsg: `Element "${element.toString()}" is not enabled after the given time`,
      }
    );
  }

  async waitForElementToBeSelected(element) {
    await this.waitForCondition(async () => await element.isSelected(), {
      timeoutMsg: `Element "${element.toString()}" is not selected after the given time`,
    });
  }

  async pressEnter() {
    await this.pressKey("Enter");
  }

  async getCurrentActivity() {
    const currentActivity = await wdioBrowser.getActivity();
    return currentActivity;
  }

  async captureScreenshot(filename) {
    const screenshotsDir = "./screenshots";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullFilename = path.join(
      screenshotsDir,
      `${filename}-${timestamp}.png`
    );

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    await wdioBrowser.saveScreenshot(fullFilename);
    console.log("Screenshot saved: " + fullFilename);
  }

  async saveFullPageScreen() {
    console.log("Attempting to capture full page screenshot");
    try {
      await wdioBrowser.saveFullPageScreen("fullPage", {});
      console.log("Screenshot captured successfully");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  }

  async checkUseNavigatedToCorrectUrl(url) {
    await browser.waitUntil(async () => {
      return (await browser.getUrl()).includes(url);
    }, {
      timeout: 5000,
      timeoutMsg: `Expected to be redirected to correct ${url} homepage`
    });
    logger.log(`Navigated to ===> ${url}`);
  }

  async quiteBrowser() {
    await browser.reloadSession();
  }

  async takeScreenshot() {
    const screenshot = await browser.takeScreenshot();
    return screenshot;
  }
  
  async getBrowserVersion() {
    return await browser.capabilities.browserVersion || await browser.capabilities.version;
  }

  
  async sessionId() {
    return await browser.sessionId();
  }
  

  async moveTo(element) {
    return await browser.moveTo(element);
  }
  
  async selectDropdownByText(dropdownElement, visibleText) {
    if (!dropdownElement || !visibleText) {
      throw new Error('Dropdown element or visible text is not provided!');
    }
    await this.waitForElementToBeVisible(dropdownElement);
    await dropdownElement.selectByVisibleText(visibleText);
    logger.log("Selected option: " + visibleText);
}
  
async selectDropdownByValue(dropdownElement, value) {
  if (!dropdownElement || !value) {
      throw new Error('Dropdown element or value is not provided!');
  }
  await this.waitForElementToBeVisible(dropdownElement);
  await dropdownElement.selectByAttribute('value', value);
  logger.log(`Selected option by value: ${value}`);
  }
  
  async selectDropdownByIndex(dropdownElement, index) {
    if (!dropdownElement || typeof index !== 'number') {
        throw new Error('Dropdown element or index is not provided or invalid!');
    }
    await this.waitForElementToBeVisible(dropdownElement);
    await dropdownElement.selectByIndex(index);
    logger.log(`Selected option by index: ${index}`);
}

}


export default new Browser();
