import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../../pageobjects/login.js";
import assert from "../../base/Assert.js";
import browser from "../../base/Browser.js";
import commonSelectors from '../../../resources/selectors/common/common.json' assert { type: 'json' };
import { parseDataTableIfHeadet } from "../../utils/dataTableHelper.js";
import { parseDataTableIfNotHeader } from "../../utils/dataTableHelper.js";
import logger from '../../../tests/utils/CustomLogger.js';
import fs from 'fs';
import path from 'path';



// Given(/^User launch to application$/, async function(){
//     await loginPage.loginToApplication('https://pl.usembassy.gov/');
      
// } );

Given('I am on the Amazon login page', async function () {
    await loginPage.launchUrl('https://opensource-demo.orangehrmlive.com/');
    browser.getPageTitle();
   // await assert.assertPageTitle('Amazon Sign-In', "Page title does not match 'Amazon Sign-In'");
    // await assert.assertElementIsVisible(eval(commonSelectors.headerMenu.login), "Login Button is not visible");
    //await assert.assertEqual("swapnil", "Swapnil");
    //browser.saveFullPageScreen();
    logger.log("User is on login page");
    logger.log("User is launch URL 'https://opensource-demo.orangehrmlive.com/");
    logger.log("User print the page title");
});

When("I enter a valid email and password", async function (dataTable) {
    let credentials = parseDataTableIfHeadet(dataTable);
    for (const {username,password} of credentials) {
        await browser.setValue(eval(commonSelectors.login.username), username);
        await browser.setValue(eval(commonSelectors.login.password), password);
        logger.log("User is on login page");
        logger.log("User enter username :" + username);
        logger.log("User enter password : " + password);
    }
    await browser.getPageTitle();
   
});

When('I click the login button', async function () {
    await browser.click(eval(commonSelectors.login.btn_login));
    
    logger.log("User click submit");
});

Then('I should be redirected to the Amazon homepage', async function () {
    await browser.waitForElementToBeVisible(eval(commonSelectors.headerMenu.btn_upgrade));
    logger.log("User lands on home page");
});

Then('I should see a welcome message with my username', async function () {
    browser.checkUseNavigatedToCorrectUrl("demo.orangehrmlive.com")
});

Then('I should see a message {string}', async function (name) {
    await assert.assertEqual(name,"nikhil")
});

Then('I logout from the application', async function () {
    await browser.click(eval(commonSelectors.logout.panel_logout));
    await browser.click(eval(commonSelectors.logout.btn_logout));
    await browser.waitForElementToBeVisible(eval(commonSelectors.login.btn_login));
});


