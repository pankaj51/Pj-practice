*** Settings ***
Library  SeleniumLibrary
Library  ../../src/forgot_password.py
Library  ../../src/login.py
Library  ../../src/util.py
Resource  ../../keyword/auth/forgot_password_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot

Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser

Documentation  
...  This file contains test cases for forgot password.
...  It covers below major points:
...  a)Forgot password link on login page, password enter screen
...  b)Link accessibility of get reset code, go back to login page, forgot password, and Already have a code
...  c)Eye icon functionality for password and confirm apssword fields on forgot password screen
...  d)Password compliance when resetting the password
...  e)Password reset code field validations


*** Variables ***
${browser}  Chrome


*** Test Cases ***
As a user, I should be able to click on forgot password button for empty username field
    Given User should be on login page
    When User clicks on forgot password button
    Then Forgot password page should be displayed
    And Get reset code should be disabled
    And Username field should be blank

As a user, I should get error message for invalid username on click already have a code
    Given Forgot password page should be displayed
    When User enters invalid username
    And User clicks on already have a code
    Then Error message for invalid username should be displayed

As a user, I should be able to go back to login page through go back to login link on forgot password
    Given Forgot password page should be displayed
    When User clicks on go back to login page
    Then User should be on login page

As a user, I should get error message for invalid username on click get reset code
    Given User clicks on forgot password button
    And Forgot password page should be displayed
    When User enters invalid username
    And User clicks on get reset code
    Then Error message for invalid username should be displayed

As a user, I should not be able to click on continue button for empty username field
    Given User clicks on go back to login page
    And User should be on login page
    Then Continue button should be disabled

As a user, I should be able to enter the valid username and click on continue button
    Given User should be on login page
    When User enters valid username
    And User clicks on continue button
    Then Enter password screen should be displayed

As a user, I should be able to click on forgot password button from enter password screen
    Given Enter password screen should be displayed
    When User clicks on forgot password button
    Then Forgot password page should be displayed
    And Get reset code should be enabled

As a user, I should be able to click on already have a code
    Given Forgot password page should be displayed
    When User clicks on already have a code
    Then Reset password screen should be displayed

As a user, I shuld get error message as Password must be same on confirm password field and continue button should be disabled
    Given Reset password screen should be displayed
    When Enter data in new password field
    And Enter different data in confirm password field
    Then Error message should be displayed as Password must be same on confirm password field

As a user, I should be able to view the actual value of password field when enabled eye icon
    Given Reset password screen should be displayed
    When User click on eye button for password field to enable
    Then User should be able to see the actual value of password field

As a user, I should be able to view the actual value of confirm password field when enabled eye icon
    Given Reset password screen should be displayed
    When User click on eye button for confirm password field to enable
    Then User should be able to see the actual value of confirm password field

As a user, I should not be able to view the actual value of password field when disabled eye icon
    Given Reset password screen should be displayed
    When User click on eye button for password field to disable
    Then User should not be able to see the actual value of password field

As a user, I should be able to view the actual value of confirm password field when disabled eye icon
    Given Reset password screen should be displayed
    When User click on eye button for confirm password field to disable
    Then User should not be able to see the actual value of confirm password field

As a user, I should get error message for password and code fields for length non-compliance
    Given Reset password screen should be displayed
    When Enter data with less than 8 characters in password field
    And Enter single digit data in password reset code field
    Then Error message for length non-compliance should be displayed for password and code field

As a user, I should get error message for invalid password reset code field
    Given Reset password screen should be displayed
    When User enter password with all compliance
    And Enter 6 digit code in code from email field
    And Click on set password button
    Then Error message for invalid code should be displayed for password reset code field

As a user, I should get error message for blank fields code, new and confirm password
    When User clears all the fields
    Then Error message for all fields should be validated

As a user, I should be able to go back to login page through go back to login link on password reset screen
    When User clicks on go back to login page
    Then User should be on login page

As a user, I should be able to click on get reset code
    Given User clicks on forgot password button
    And Forgot password page should be displayed
    When User enters valid username on forgot password screen
    And User clicks on get reset code
    Then Reset password screen should be displayed
