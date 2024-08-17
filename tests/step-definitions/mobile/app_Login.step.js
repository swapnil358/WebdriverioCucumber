import { Given, Then, When } from "@wdio/cucumber-framework";
import loginPage from "../../pageobjects/login.js";
import assert from "../../base/Assert.js";
import browser from "../../base/Browser.js";
import commonSelectors from '../../../resources/selectors/common/common.json' assert { type: 'json' };


Given('User Is On Login Screen', async function() {
    // Ensure the app is opened and user is on the login screen
    const loginActivity = await driver.getCurrentActivity();
    expect(loginActivity).toEqual('.activities.react.ReactActivity'); // Replace with the actual login activity name if different
});

When('User Enters Valid Credentials', async function() {
    const usernameInput = await $('//android.widget.EditText[@content-desc="username"]'); // Replace with the actual username field locator
    const passwordInput = await $('//android.widget.EditText[@content-desc="password"]'); // Replace with the actual password field locator

    await usernameInput.setValue('validUsername'); // Replace with the valid username
    await passwordInput.setValue('validPassword'); // Replace with the valid password
});

When('User Clicks On Login Button', async function() {
    const loginButton = await $('//android.widget.Button[@content-desc="login_button"]'); // Replace with the actual login button locator
    await loginButton.click();
});

Then('User Should Redirect To Home Screen', async function() {
    await driver.waitUntil(async () => {
        const currentActivity = await driver.getCurrentActivity();
        return currentActivity === 'com.myntra.android.HomeActivity'; // Replace with the actual home activity
    }, {
        timeout: 5000, // Adjust timeout if needed
        timeoutMsg: 'User was not redirected to the home screen'
    });
});
