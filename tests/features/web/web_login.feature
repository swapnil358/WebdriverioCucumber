Feature: login scenarios


   Scenario: Successful login with valid credentials
      Given I am on the Amazon login page
      When I enter a valid email and password
         | username | password |
         | Admin    | admin123 |
      And I click the login button
      Then I should be redirected to the Amazon homepage
      And I should see a welcome message with my username
      Then I logout from the application



  

   Scenario: UnSuccessful login with valid credentials
      Given I am on the Amazon login page
      When I enter a valid email and password
         | username | password |
         | Admin    | admin123 |
      And I click the login button
      Then I should be redirected to the Amazon homepage
      And I should see a welcome message with my username
      Then I logout from the application


 Scenario: verify Login functionality
      Given I am on the Amazon login page
      When I enter a valid email and password
         | username | password |
         | Admin    | admin123 |
      And I click the login button
      Then I should be redirected to the Amazon homepage
      And I should see a welcome message with my username
      Then I logout from the application


