*** Settings ***
Library  SeleniumLibrary
Library  ../../src/login.py
Library  ../../src/util.py
Resource  ../../keyword/auth/login_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot
Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser


*** Variables ***
${browser}  Chrome


*** Test Cases ***
As a user, I should see error message on enter invalid username
    Given User on Houseworks page
    When User enter the username in username field
    And Click on username continue button
    Then User should see validation message "Username does not exist or has been disabled."

As a user, I should see error message on empty field of username
    Given User on Houseworks page
    When User empty the username field
    Then User should see validation message "Please enter your username"

As a user, I should continue on enter correct username
    Given User on Houseworks page
    When User enter correct username in username field
    And Click on username continue button
    Then User should see password field 

As a user, I should see error message on password entered less than 8 characters
    Given User on Houseworks page
    When User enter a password less than 8 characters 
    Then User should see validation message "Password must be atleast 8 characters"

As a user, I should see error message for invalid password 
    Given User on Houseworks page
    When User enter invalid password 
    And Click on password continue button
    Then User should see validation message "Invalid password"

As a user, I should see password visible onclick crossed eye icon
    Given User on Houseworks page
    When User click on crossed eye button
    Then User should see the password visible

As a user, I should see password hides onclick eye icon
    Given User on Houseworks page
    When User click on eye button
    Then User should see the password hide

As user, I should see error message on empty field of password
    Given User on Houseworks page
    When User empty the password field
    Then User should see validation message "Please enter your password"

As a user, I should successfully login into HW
    Given User on Houseworks page
    When User enter the correct password
    And Click on password continue button
    Then User should see Dashboard 

