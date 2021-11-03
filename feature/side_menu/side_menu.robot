*** Settings ***
Library  SeleniumLibrary
Library  ../../src/login.py
Library  ../../src/side_menu.py
Library  ../../src/util.py
Resource  ../../keyword/side_menu/side_menu_keyword.robot
Resource  ../../keyword/shared/util_keyword.robot

Suite Setup  Open the browser  ${browser}
Suite Teardown  Close the browser

Documentation  This file contains test cases for opening multiple sides for each side menu

*** Variables ***
${browser}  Chrome

*** Test Cases ***
User should login with valid username and password
    Given User on Houseworks page
    When User enter correct username in username field
    And User enter the correct password
    Then User should see Dashboard

User should be able to open Patient Master on second side
    Given Tab with title Patient Master is open on first side
    And User clicks on patient side menu
    When User right clicks on patient_master side menu
    And User clicks on open to the side
    Then Tab with title Patient Master is open on second side

User should be able to Patient Master on third side
    When User right clicks on patient_master side menu
    And User clicks on open to the side
    Then Tab with title Patient Master is open on third side

User should be able to Add Patient on first side
    When User right clicks on create_patient_sub_menu_field side menu
    And User clicks on open to the first side for create_patient
    Then Tab with title Add Patient is open on first side

User should be able to Add Patient on second side
    When User right clicks on create_patient_sub_menu_field side menu
    And User clicks on open to the second side for create_patient
    Then Tab with title Add Patient is open on second side

User should be able to Add Patient on third side
    When User right clicks on create_patient_sub_menu_field side menu
    And User clicks on open to the third side for create_patient
    Then Tab with title Add Patient is open on third side

User should be able to Cases on first side
    When User right clicks on cases side menu
    And User clicks on open to the first side for cases
    Then Tab with title Cases is open on first side

User should be able to Cases on second side
    When User right clicks on cases side menu
    And User clicks on open to the second side for cases
    Then Tab with title Cases is open on second side

User should be able to Cases on third side
    When User right clicks on cases side menu
    And User clicks on open to the third side for cases
    Then Tab with title Cases is open on third side

User should be able to Users on first side
    When User clicks on administrative side menu
    And User right clicks on users side menu
    And User clicks on open to the first side for users
    Then Tab with title Users is open on first side

User should be able to Users on second side
    When User right clicks on users side menu
    And User clicks on open to the second side for users
    Then Tab with title Users is open on second side

User should be able to Users on third side
    When User right clicks on users side menu
    And User clicks on open to the third side for users
    Then Tab with title Users is open on third side

User should be able to Facilities on first side
    When User right clicks on facilities side menu
    And User clicks on open to the first side for facilities
    Then Tab with title Facilities is open on first side

User should be able to Facilities on second side
    When User right clicks on facilities side menu
    And User clicks on open to the second side for facilities
    Then Tab with title Facilities is open on second side

User should be able to Facilities on third side
    When User right clicks on facilities side menu
    And User clicks on open to the third side for facilities
    Then Tab with title Facilities is open on third side

User should be able to Note Template on first side
    When User right clicks on note_template side menu
    And User clicks on open to the first side for note_template
    Then Tab with title Note Template is open on first side

User should be able to Note Template on second side
    When User right clicks on note_template side menu
    And User clicks on open to the second side for note_template
    Then Tab with title Note Template is open on second side

User should be able to Note Template on third side
    When User right clicks on note_template side menu
    And User clicks on open to the third side for note_template
    Then Tab with title Note Template is open on third side

User should be able to Document Manager on first side
    When User right clicks on document_manager side menu
    And User clicks on open to the first side for document_manager
    Then Tab with title Document Manager is open on first side

User should be able to Document Manager on second side
    When User right clicks on document_manager side menu
    And User clicks on open to the second side for document_manager
    Then Tab with title Document Manager is open on second side

User should be able to Document Manager on third side
    When User right clicks on document_manager side menu
    And User clicks on open to the third side for document_manager
    Then Tab with title Document Manager is open on third side

User should be able to Organizations on first side
    When User clicks on contacts side menu
    And User right clicks on organization side menu
    And User clicks on open to the first side for organization
    Then Tab with title Organizations is open on first side

User should be able to Organizations on second side
    When User right clicks on organization side menu
    And User clicks on open to the second side for organization
    Then Tab with title Organizations is open on second side

User should be able to Organizations on third side
    When User right clicks on organization side menu
    And User clicks on open to the third side for organization
    Then Tab with title Organizations is open on third side

User should be able to People on first side
    When User right clicks on people side menu
    And User clicks on open to the first side for people
    Then Tab with title People is open on first side

User should be able to People on second side
    When User right clicks on people side menu
    And User clicks on open to the second side for people
    Then Tab with title People is open on second side

User should be able to People on third side
    When User right clicks on people side menu
    And User clicks on open to the third side for people
    Then Tab with title People is open on third side

User should be able to Create Appointment on first side
    When User clicks on calendar side menu
    And User right clicks on create_appointment side menu
    And User clicks on open to the first side for create_appointment
    Then Tab with title Create Appointment is open on first side

User should be able to Create Appointment on second side
    When User right clicks on create_appointment side menu
    And User clicks on open to the second side for create_appointment
    Then Tab with title Create Appointment is open on second side

User should be able to Create Appointment on third side
    When User right clicks on create_appointment side menu
    And User clicks on open to the third side for create_appointment
    Then Tab with title Create Appointment is open on third side

User should be able to Patient Appointments on first side
    When User right clicks on patient_appointments side menu
    And User clicks on open to the first side for patient_appointments
    Then Tab with title Patient Appointments is open on first side

User should be able to Patient Appointments on second side
    When User right clicks on patient_appointments side menu
    And User clicks on open to the second side for patient_appointments
    Then Tab with title Patient Appointments is open on second side

User should be able to Patient Appointments on third side
    When User right clicks on patient_appointments side menu
    And User clicks on open to the third side for patient_appointments
    Then Tab with title Patient Appointments is open on third side

User should be able to Service Report on first side
    When User clicks on inpatient_reports side menu
    And User right clicks on service_report side menu
    And User clicks on open to the first side for service_report
    Then Tab with title Service Report is open on first side

User should be able to Service Report on second side
    When User right clicks on service_report side menu
    And User clicks on open to the second side for service_report
    Then Tab with title Service Report is open on second side

User should be able to Service Report on third side
    When User right clicks on service_report side menu
    And User clicks on open to the third side for service_report
    Then Tab with title Service Report is open on third side

User should be able to Adm./Disch. Report on first side
    When User right clicks on admission_report side menu
    And User clicks on open to the first side for admission_report
    Then Tab with title Adm./Disch. Report is open on first side

User should be able to Adm./Disch. Report on second side
    When User right clicks on admission_report side menu
    And User clicks on open to the second side for admission_report
    Then Tab with title Adm./Disch. Report is open on second side

User should be able to Adm./Disch. Report on third side
    When User right clicks on admission_report side menu
    And User clicks on open to the third side for admission_report
    Then Tab with title Adm./Disch. Report is open on third side
