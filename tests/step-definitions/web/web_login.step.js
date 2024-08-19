import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../../pageobjects/login.js";
import assert from "../../base/Assert.js";
import browser from "../../base/Browser.js";
import commonSelectors from '../../../resources/selectors/common/common.json' assert { type: 'json' };



Given(/^User launch to application$/, async function(){
    await loginPage.loginToApplication('https://pl.usembassy.gov/');
    await browser.maximizeWindow();
    await browser.getPageTitle();
    const ele = await eval(commonSelectors.home.bottonMenu.lbl_accessibilityStatement);
    //await browser.scrollIntoView(ele);
    await browser.waitForPageToLoad(ele, "Accessibility Statement");
    browser.saveFullPageScreen();
    const visa = await eval(commonSelectors.headerMenu.lbl_visas);
    //console.log(await browser.getText(visa));
    const searchBtn = await eval(commonSelectors.headerMenu.btn_search);
    await browser.click(searchBtn);
    await browser.setValue(eval(commonSelectors.headerMenu.tb_search), "swapnil");
    await browser.pause(5000);
    await browser.getText(eval(commonSelectors.headerMenu.btn_search));

    // for (let i = 0; i <=4; i++) {
    //     await browser.getText(eval(commonSelectors.headerMenu.icn_socials.replace("index", i)));
    // }
    //await assert.assertEqual(await wdioBrowser.getTitle(),"U.S. Embassy in Switzerland and Liechtenstein");
   
} );


// Then(/^I should see a flash message saying "{message}"$/, (  ) =>{
//     console.log("Flash message displayed");
// } );