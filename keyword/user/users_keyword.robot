*** Keywords ***
User on Dashboard page
    users.dashboard_title

User click on Administrative icon
    users.administrative_icon

Click on Users from menu list
    users.user_menu

Click on Add button
    users.add_user_button

User should see Add form
    users.add_form

User click on Title field
    users.title_field

User should see the correct list of Title
    users.list_of_title

User click on Identifying Gender field
    users.gender_field

User should see the correct list of Identifying Gender
    users.list_of_identifying_gender

User click on Add button
    users.click_on_user_add_button

User should see validation message for all mandatory fields
    users.check_mandatory_validation

User fill all the details in user form
    users.fill_the_details

User should see the validation message for already exists
    users.already_exists_message

User enter the invalid SSN
    users.enter_alphanumeric_ssn

User should see validation message for invalid ssn
    users.invalid_ssn_message

User enter the invalid email
    users.enter_invalid_email

User should see validation message for invalid email
    users.invalid_email_message

User enter the valid and unique SSN
    users.enter_valid_ssn

User enter the valid and unique email 
    users.enter_valid_email

User click on create button
    users.click_create_button

User should able to create user successfully
    users.user_title

User search the recent created user in patient master
    users.search_user

User should see correct result
    users.verify_search_result

User click on the user
    users.click_on_the_user

User should see the details of user
    users.verify_the_details_of_user

User click on the edit button
    users.click_on_edit

User should see the prefilled details
    users.validate_prefilled_data

User should able to edit the user with all user types
    users.verify_all_user_types