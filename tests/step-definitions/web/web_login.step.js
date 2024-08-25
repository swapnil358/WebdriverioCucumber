import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../../pageobjects/login.js";
import assert from "../../base/Assert.js";
import browser from "../../base/Browser.js";
import commonSelectors from '../../../resources/selectors/common/common.json' assert { type: 'json' };



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
});

When('I enter a valid email and password', async function () {
    await browser.setValue(eval(commonSelectors.login.username), 'admin');
    await browser.setValue(eval(commonSelectors.login.password), 'admin123');
    
    
    browser.getPageTitle();
});

When('I click the login button', async function () {
    await browser.click(eval(commonSelectors.login.btn_login));
    
    
});

Then('I should be redirected to the Amazon homepage', async function () {
    await browser.waitForElementToBeVisible(eval(commonSelectors.headerMenu.btn_upgrade));
    
});

Then('I should see a welcome message with my username', async function () {
    browser.checkUseNavigatedToCorrectUrl("demo.orangehrmlive.com")
});