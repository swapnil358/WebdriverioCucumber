Feature: login scenarios

@app
  Scenario: Android devices test cases

  Scenario: Successful login with valid credentials
    Given User Is On Login Screen
    When User Enters Valid Credentials
    And User Clicks On Login Button
    Then User Should Redirect To Home Screen
   