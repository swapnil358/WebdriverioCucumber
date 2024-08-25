Feature: login scenarios

# @login
#   Scenario: As a user, I can log into the secure area

  #  Given User launch to application
    #Given I am on the login page
    #When I login with <username> and <password>
    #Then I should see a flash message saying <message>

    # Examples:
    #   | username | password             | message                        |
    #   | tomsmith | SuperSecretPassword! | You logged into a secure area! |
    #   | foobar   | barfoo               | Your username is invalid!      |



  Scenario: Successful login with valid credentials
    Given I am on the Amazon login page
    When I enter a valid email and password
      # | username | password |
      # | Admin    | admin123 |
    And I click the login button
    Then I should be redirected to the Amazon homepage
    And I should see a welcome message with my username

 