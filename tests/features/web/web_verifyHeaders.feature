Feature: login scenarios

#############################################################
# @AuthorName : Sandy mane, Samanantha rhods
# @TestID : scenario1
# @Description : verify page header correct credentials.
#############################################################

  Scenario: verify page header correct credentials.
    Given I am on the Amazon login page
    When I enter a valid email and password
       | username | password |
       | Admin    | admin123 |
    And I click the login button
    Then I should be redirected to the Amazon homepage
    And I should see a welcome message with my username
    Then I logout from the application



#############################################################
# @AuthorName : Perry lawn, Sandy
# @TestID : jira.getinsured.com/HIX-00000
# @Description : verfy page header with incorrect credentials.
#############################################################

 Scenario: verfy page header with incorrect credentials.
    Given I am on the Amazon login page
    When I enter a valid email and password
       | username | password |
       | Admin    | admin123 |
    And I click the login button
    Then I should be redirected to the Amazon homepage
    And I should see a welcome message with my username
    Then I logout from the application

