import { browser as wdioBrowser } from '@wdio/globals'
import { assert } from 'chai';
import path from 'path';
import fs from 'fs';

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
    let txt = await element.getText(element);
    console.log("Text Displayed =====>" + txt);
  }

  async getPageTitle() {
    console.log("Page Title==>" + (await wdioBrowser.getTitle()));
  }

  async getAttribute(attributeName) {
    return await wdioBrowser.getAttribute(attributeName);
  }

  async waitForElementToBeVisible(element) {
    await this.waitForCondition(
      async () => {
        return await element.isDisplayed();
      },
      {
        timeoutMsg: `Element "${element.toString()}" is not visible after the given time`,
      }
    );
  }

  async waitForDisplayAndClick(element) {
    await this.waitForElementToBeDisplay(element);
    await element.click();
  }

  async waitForPageToLoad(element, pageHeader) {
    await wdioBrowser.waitUntil(
      async function () {
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
          'Header "' + pageHeader + '" is not displayed after given time',
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
    return await element.scrollIntoView(element);
  }

  // async setValue(element, content) {
  //     await element.waitForDisplayed(5000);
  //     await element.setValue(content);
  // }
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
      async () => {
        return await element.isEnabled();
      },
      {
        timeoutMsg: `Element "${element.toString()}" is not enabled after the given time`,
      }
    );
  }

  async waitForElementToBeVisible(element) {
    await this.waitForCondition(
      async () => {
        return await element.isDisplayed();
      },
      {
        timeoutMsg: `Element "${element.toString()}" is not visible after the given time`,
      }
    );
  }

  async waitForElementToBeSelected(element) {
    await this.waitForCondition(() => isElementSelected(element), {
      timeoutMsg: `Element "${element.toString()}" is not selected after the given time`,
    });

    async function isElementSelected(element) {
      return await element.isSelected();
    }
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
      filename + "-" + timestamp + ".png"
    );

    // Ensure screenshots directory exists
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    await wdioBrowser.saveScreenshot(fullFilename);
    console.log("Screenshot saved: " + fullFilename);
  }

  async captureFullPageScreenshot(filename) {
    const screenshotsDir = "./screenshots";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullFilename = path.join(screenshotsDir, filename + "-" + timestamp + ".png");
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


}




export default new Browser();

