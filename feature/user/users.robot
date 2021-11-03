*** Settings ***
Library  SeleniumLibrary
Library  ../../src/login.py
Library  ../../src/users.py
Library  ../../src/util.py
Resource  ../../keyword/auth/login_keyword.robot
Resource  ../../keyword/user/users_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot
Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser

*** Variables ***
${browser}  Chrome


*** Test Cases ***
As a user, I should successfully login into HW
    Given User on Houseworks page
    When User enter correct username in username field 
    And Click on username continue button
    Then User should see password field
    When User enter the correct password
    And Click on password continue button
    Then User should see Dashboard  

As a user, I should able to open the add user form
    Given User on Dashboard page
    When User click on Administrative icon
    And Click on Users from menu list
    And Click on Add button
    Then User should see Add form

As a user, I should see correct list of Title
    Given User on Dashboard page
    When User click on Title field
    Then User should see the correct list of Title

As a user, I should see correct list of Identifying Gender
    Given User on Dashboard page
    When User click on Identifying Gender field 
    Then User should see the correct list of Identifying Gender

As a user, I should see validation message for all mandatory fields
    Given User on Dashboard page
    When User click on Add button
    Then User should see validation message for all mandatory fields 

As a user, I should see validation error message if email address and SSN number are already exists
    Given User on Dashboard page
    When User fill all the details in user form
    And User click on Add button
    Then User should see the validation message for already exists 

As a user, I should see validation error message on enter alphanumeric value in SSN field
    Given User on Dashboard page
    When User enter the invalid SSN
    Then User should see validation message for invalid ssn 

As a user, I should see validation error message on enter invalid format of email in email address field
    Given User on Dashboard page
    When User enter the invalid email
    Then User should see validation message for invalid email

As a user, I should able to create a user
    Given User on Dashboard page
    When User enter the valid and unique SSN
    And User enter the valid and unique email 
    And User click on create button
    Then User should able to create user successfully

As a user, I should able to find the recent created user
    Given User on Dashboard page
    When User search the recent created user in patient master
    Then User should see correct result 

As a user, I should see correct details in detail view
    Given User on Dashboard page
    When User click on the user
    Then User should see the details of user

As a user, I should see prefilled data in edit view
    Given User on Dashboard page
    When User click on the edit button
    Then User should see the prefilled details

As a user, I should able to edit the user will all the user types  
    Given User on Dashboard page
    Then User should able to edit the user with all user types  