import { browser as wdioBrowser } from '@wdio/globals'

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
    await browser.waitUntil(
      async function () {
        const state = await browser.execute(() => document.readyState);
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
    await browser.pause(timeout);
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
    await browser.waitUntil(conditionFn, {
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
}

export default new Browser();

