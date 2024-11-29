import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../pageobjects/login.js";
import assert from "../base/Assert.js";
import Browser from "../base/Browser.js";
import commonSelectors from '../../resources/content/common/selectors/common.json' assert { type: 'json' };



Given(/^User launch to application$/, async function(){
    await loginPage.loginToApplication('https://in.usembassy.gov/');
    await Browser.maximizeWindow();
    const ele = await eval(commonSelectors.home.lbl_accessibilityStatement);
    
    await Browser.waitForPageToLoad(ele, "Accessibility Statement");
    //await assert.assertEqual(await wdioBrowser.getTitle(),"U.S. Embassy in Switzerland and Liechtenstein");
   
} );


// Then(/^I should see a flash message saying "{message}"$/, (  ) =>{
//     console.log("Flash message displayed");
// } );