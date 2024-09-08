Feature: login scenarios

   ############  Metadata #####################################
   # @Tag : Authorization
   # @Description : Test valid login with correct credentials.
   # @AuthorName : Swapnil Bodade, John Pattrick, Amit singh, Perry lawn, Sandy mane, Samanantha rhods, triveni
   # @TestID : https://example.com/issues/AUTH-123, https://example.com/docs ,  https://jira.com/issues/AUTH-123, https://www.linkedin.com/in/swapb/
   ############# End Metadata ##################################

   Scenario: Successful login with valid credentials
      Given I am on the Amazon login page
      When I enter a valid email and password
         | username | password |
         | Admin    | admin123 |
      And I click the login button
      Then I should be redirected to the Amazon homepage
      And I should see a welcome message with my username
      Then I logout from the application



   ############  Metadata #####################################
   # @Tag : Invalid Authorization
   # @Description : Test invalid login with correct credentials.
   # @AuthorName : Perry lawn, Sandy mane, Samanantha rhods
   # @TestID : jira.getinsured.com/HIX-1435456
   ############# End Metadata ##################################

   Scenario: UnSuccessful login with valid credentials
      Given I am on the Amazon login page
      When I enter a valid email and password
         | username | password |
         | Admin    | admin123 |
      And I click the login button
      Then I should be redirected to the Amazon homepage
      And I should see a welcome message with my username
      Then I logout from the application


