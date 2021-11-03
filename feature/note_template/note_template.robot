*** Settings ***
Library  SeleniumLibrary
Library  ../../src/login.py
Library  ../../src/note_template.py
Library  ../../src/util.py
Resource  ../../keyword/note_template/note_template_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot

Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser

Documentation  
...  This file contains test cases for note template.
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

User should be able to open note template list view
    Given User should see Dashboard
    When User clicks on administrative side menu
    And User clicks on note_template side menu
    Then Note template list view should be displayed

User opens the create form
    Given Note template list view should be displayed
    When User clicks on create button
    Then Note template create form should be displayed

User should be able to apply or remove bold
    Given Note template create form should be displayed
    When User enters text in the start
    And User clicks on bold formatter
    And User enters text for bold formatter validation
    Then Text should be displayed in bold
    And User clicks on bold formatter

User should be able to apply or remove italic
    Given Note template create form should be displayed
    When User clicks on italic formatter
    And User enters text for italic formatter validation
    Then Text should be displayed in italic
    And User clicks on italic formatter

User should be able to apply or remove strikethrough
    Given Note template create form should be displayed
    When User clicks on strikethrough formatter
    And User enters text for strikethrough formatter validation
    Then Text should be displayed in strikethrough
    And User clicks on strikethrough formatter

User should be able to apply or remove underline
    Given Note template create form should be displayed
    When User clicks on underline formatter
    And User enters text for underline formatter validation
    Then Text should be displayed in underline
    And User clicks on underline formatter

User should be able to apply or remove highlight
    Given Note template create form should be displayed
    When User clicks on highlight formatter
    And User enters text for highlight formatter validation
    Then Text should be displayed in highlight
    And User clicks on highlight formatter

User should be able to apply or remove H1 font
    Given Note template create form should be displayed
    When User clicks on h1 formatter
    And User enters text for h1 formatter validation
    Then Text should be displayed in h1

User should be able to apply or remove H2 font
    Given Note template create form should be displayed
    When User clicks on h2 formatter
    And User enters text for h2 formatter validation
    Then Text should be displayed in h2

User should be able to apply or remove H3 font
    Given Note template create form should be displayed
    When User clicks on h3 formatter
    And User enters text for h3 formatter validation
    Then Text should be displayed in h3

User should be able to apply or remove numbered list
    Given Note template create form should be displayed
    When User clicks on numbered_list formatter
    And User enters list for numbered_list formatter validation
    And User clicks on numbered_list formatter
    Then List should be displayed in numbered_list format

User should be able to apply or remove bullet list
    Given Note template create form should be displayed
    When User clicks on bullet_list formatter
    And User enters list for bullet_list formatter validation
    And User clicks on bullet_list formatter
    Then List should be displayed in bullet_list format

User should be able to search keyword with no match and arrows should be disabled
    Given Note template create form should be displayed
    When User enters search keyword for no data
    Then Search keyword should not be found
    And Navigation arrows should be disabled

User should be able to search any keyword
    Given Note template create form should be displayed
    When Search keyword entered
    Then Search keyword should be found
    And User should be able to navigate with search arrows

When user has not added any mandatory field, count should be zero and arrows should be disabled
    [Documentation]  
    ...  There is no steps to be performed as this is when no madntory fields are added. 
    ...  Hence, no when statement is added in this test case
    Given Note template create form should be displayed
    Then Count of the mandatory fields should be zero
    And User should not be able to navigate with mandatory field's arrows

User should be able to navigate with madnatory fields arrows, shortcut function keys F2 and F3 and count displayed should be as expected
    Given Note template create form should be displayed
    When Enters mandatory fields
    Then Count of the mandatory fields should be as expected
    And User should be able to navigate with mandatory field's arrows
    And User should be able to navigate with shortcut function keys F2 and F3

User should get error message as note template name can not be blank
    Given Note template create form should be displayed
    When User clicks on submit button
    Then User should get error message on template name should not be blank

User should be able to enter template name, create the template and details view page should be displayed
    Given Note template create form should be displayed
    When User enters template name
    And User clicks on submit button
    Then Detail view page should be displayed with template name

User should be able to click on edit, update the note, save, and validate changes are updated in detail view
    [Documentation]  Last step is blocked due to EHR-666
    Given Note template detail view should be displayed
    When User clicks on edit
    And User adds some text in note editor
    And User clicks on save
#     Then Changes made should be displayed in detail view

User should get error message on unique name
    Given User should click on back button
    And User clicks on create button
    And Note template create form should be displayed
    When User enters template name which already exist
    And User clicks on submit button
    Then User should get error message on template name should be unique

User should be able to delete the note and check if exists in list view
    Given User clears the template name field
    And User enters template name
    And User clicks on submit button
    When User deletes the note template
    And Search with same template name in list view
    Then No result should be found for note_template
