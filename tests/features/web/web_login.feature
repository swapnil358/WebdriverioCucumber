Feature: login scenarios

#############################################################
# @AuthorName : Swapnil Bodade, John Pattrick, Amit singh, Perry lawn, Sandy mane, Samanantha rhods
# @TestID : HIX-1435456
# @Description : Test valid login with correct credentials.
#############################################################

  Scenario: Successful login with valid credentials
    Given I am on the Amazon login page
    When I enter a valid email and password
       | username | password |
       | Admin    | admin123 |
    And I click the login button
    Then I should be redirected to the Amazon homepage
    And I should see a welcome message with my username
    Then I logout from the application



#############################################################
# @AuthorName : Perry lawn, Sandy mane, Samanantha rhods
# @TestID : jira.getinsured.com/HIX-1435456
# @Description : Test invalid login with correct credentials.
#############################################################

 Scenario: UnSuccessful login with valid credentials
    Given I am on the Amazon login page
    When I enter a valid email and password
       | username | password |
       | Admin    | admin123 |
    And I click the login button
    Then I should be redirected to the Amazon homepage
    And I should see a welcome message with my username
    Then I logout from the application


