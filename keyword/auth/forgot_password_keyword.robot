*** Keywords ***
User should be on login page
    title

User clicks on forgot password button
    clicks_on_forgot_password

User is on forgot password page
    clicks_on_forgot_password

Forgot password page should be displayed
    forgot_password_page_validation

Get reset code should be disabled
    disable_get_reset_code_link

Username field should be blank
    username_field_blank_validation

User enters invalid username
    enter_invalid_username

User clicks on already have a code
    clicks_on_already_have_code_link

Error message for invalid username should be displayed
    invalid_username_error_message_validation

User clicks on go back to login page
    clicks_on_go_back_to_login

User clicks on get reset code
    clicks_on_get_reset_code

Continue button should be disabled
    disable_continue_button_validation

User enters valid username
    enter_correct_username

User clicks on continue button
    clicks_on_continue

Enter password screen should be displayed
    password_field_visible

Username field should be same as username entered in the login page
    username_validation

Get reset code should be enabled
    enable_get_reset_code_link

Reset password screen should be displayed
    password_reset_screen_validation

Enter data in new password field
    enter_new_password

Enter different data in confirm password field
    enter_new_confirm_password

Error message should be displayed as Password must be same on confirm password field
    password_fields_mismatch_error_message_validation

User click on eye button for password field to enable
    clicks_on_eye_invisible_new_password

User should be able to see the actual value of password field
    visibility_of_new_password_value_validation

User click on eye button for confirm password field to enable
    clicks_on_eye_invisible_new_confirm_password

User should be able to see the actual value of confirm password field
    visibility_of_new_confirm_password_value_validation

User click on eye button for password field to disable
    clicks_on_eye_new_password

User should not be able to see the actual value of password field
    validation_of_new_password_value_hide

User click on eye button for confirm password field to disable
    clicks_on_eye_new_confirm_password

User should not be able to see the actual value of confirm password field
    validation_of_new_confirm_password_value_hide

Enter data with less than 8 characters in password field
    enter_new_password_with_less_than_8_characters

Enter single digit data in password reset code field
    enter_single_digit_data_in_code_field

Error message for length non-compliance should be displayed for password and code field
    length_compliance_validation_new_password_and_code_field

User enter password with all compliance
    enter_valid_format_password

Enter 6 digit code in code from email field
    enter_6_digit_code

Click on set password button
    clicks_on_set_password

Error message for invalid code should be displayed for password reset code field
    invalid_code_error_message_validation

User clears all the fields
    clear_all_fields

Error message for all fields should be validated
    error_message_for_blank_fields_validation

User enters valid username on forgot password screen
    enter_username_on_forgot_password_screen