import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../pageobjects/login.js";
import Browser from "../base/Browser.js";
import { browser as wdioBrowser } from '@wdio/globals'


Given(/^I logged in to app$/, async function(){
    await wdioBrowser.url('https://www.saucedemo.com/');
    console.log("===>logged in to application " + await wdioBrowser.getTitle());
   
} );


// Then(/^I should see a flash message saying "{message}"$/, (  ) =>{
//     console.log("Flash message displayed");
// } );