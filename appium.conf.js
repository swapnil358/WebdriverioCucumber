import path  from "path";
// const path = require('path')
// wdio.conf.js

export const config = {
  // Define the runner
  runner: "local",

  // Define the framework
  framework: "cucumber", // You can use 'cucumber' if you're using Cucumber

  // Specify the test files
  specs: [
    "./tests/features/mobile/**/mobile_login.feature", // Adjust this path to your test files
  ],

  exclude: [
    // Exclude files or directories here
  ],

  // Define capabilities
  capabilities: [
    {
      platformName: "Android",
      "appium:platformVersion": "15",
      "appium:deviceName": "pixel6",
      "appium:app":
        path.join(process.cwd(),"app/android/myntra.apk"),
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "com.myntra.android",
      "appium:appActivity": "com.myntra.android.SplashActivity",
      // platformName: 'Android',
      // platformVersion: '11.0',
      // deviceName: 'emulator-5554',
      // app: path.resolve('./path/to/your/app.apk'), // Path to your app
      // automationName: 'UiAutomator2',
      // noReset: true
    },
  ],

  // Define services
  services: ["appium"],
  appium: {
    command: "appium",
    logPath: "./logs",
    debug: true,
    args: {
      port: 4723, // Port for the Appium server
    },
  },

  cucumberOpts: {
    require: ['./tests/step-definitions/mobile/**/*.js'],  // Adjust the path accordingly
    ignoreUndefinedDefinitions: false,
},

  // Define reporters
 // reporters: ["spec"],

  // Hooks and other configuration options
  before: function (capabilities, specs) {
    // Code to run before the tests
  },

  after: function (result, capabilities, specs) {
    // Code to run after the tests
  },

  // Define log level
  logLevel: "error",

  // Define base URL
  baseUrl: "http://localhost",

  // Define connection timeout
  //connectionRetryTimeout: 90000,
  //connectionRetryCount: 3,

  // Define services and reporters options
  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          // Additional arguments for Appium
        },
      },
    ],
  ],
};