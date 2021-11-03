*** Keywords ***

User enter the username in username field
    login.enter_incorrect_username

Click on username continue button
    login.click_on_username_continue_button

User empty the username field
    login.empty_username

User should see password field
    login.password_field_visible

User enter a password less than 8 characters
    login.enter_password

User enter invalid password
    login.invalid_password

Click on password continue button
    login.click_on_password_continue_button

User should see validation message "${message}"
    login.validation_check  ${message}

User click on crossed eye button
    login.click_on_crossed_eye_button

User should see the password visible
    login.password_visible

User click on eye button
    login.click_on_eye_button

User should see the password hide
    login.password_hide

User empty the password field
    login.empty_password_field
