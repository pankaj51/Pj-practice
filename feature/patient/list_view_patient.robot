*** Settings ***
Library  SeleniumLibrary
Library  ../../src/login.py
Library  ../../src/util.py
Resource  ../../keyword/note_template/note_template_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot

Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser

Documentation  
...  This file contains test cases for list view of note template.
...  It covers below major points:
...  a)Adding note template
...  b)Validating all formatting buttons
...  c)Search and mandatory fields with navigation and shortcut keys
...  d)Error messages - Mandatory template name, unique template name
...  e)Edit and delete the note template

*** Variables ***
${browser}  Chrome

*** Test Cases ***

User should login with valid username and password
    Given User on Houseworks page
    When User enter correct username in username field
    And User enter the correct password
    Then User should see Dashboard

No data state should displayed when searched with keyword that does not exists
    Given Patient list view should be displayed
    When User searches with keyword which does not exists for patient
    Then No result should be found for patient

All records should be displayed after clearing the search
    Given Patient list view should be displayed
    When User clears the search of patient
    Then All the records should be displayed for patient

User should be able to search any patient entered in search box
    Given Patient list view should be displayed
    When User searches with keyword for patient
    Then All the records containing the keyword should be displayed for patient

User should be able to change number of records per page
    [Documentation]  User selects and records are validated simultaneously.
    ...  Hence, when condition is not added as it is covered in then condition
    Given User clears the search of patient
    Then Number of records and pages should be displayed as per option selected for patient

User should be able to open any record and detail view of that record should be displayed
    [Documentation]  this test is blocked due to name format different on 
    ...  detail and list view
    Given Patient list view should be displayed
    When User click on any record patient
    Then Detail view of that record should be displayed for patient
