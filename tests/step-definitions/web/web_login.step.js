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
import login from "../../pageobjects/login.js";



// Given(/^User launch to application$/, async function(){
//     await loginPage.loginToApplication('https://pl.usembassy.gov/');
      
// } );

Given('I am on the Amazon login page', async function () {
    await loginPage.launchUrl('https://opensource-demo.orangehrmlive.com/');
});

When("I enter a valid email and password", async function (dataTable) {
    let credentials = parseDataTableIfHeadet(dataTable);
    for (const { username, password } of credentials) {
        await loginPage.enterUserName(eval(commonSelectors.login.username), username);
        await loginPage.enterPassword(eval(commonSelectors.login.password), password);
    }
});

When('I click the login button', async function () {
    await loginPage.clickSubmit(eval(commonSelectors.login.btn_login));
});

Then('I should be redirected to the Amazon homepage', async function () {
    await loginPage.userLandsOnHomePage();
});

Then('I should see a welcome message with my username', async function () {
    loginPage.checkIfUserNavigatedToCorrectURL();
});

Then('I should see a message {string}', async function (name) {
    await assert.assertEqual(name,"nikhil")
});

Then('I logout from the application', async function () {
    await loginPage.logout();
});


