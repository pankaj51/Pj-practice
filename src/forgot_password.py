"""imports"""
import time
from hamcrest import assert_that, contains_string
from selenium.webdriver.common.by import By
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver.common.keys import Keys
from get_data import get_config_data, get_constant_data, get_element
import util


def clicks_on_forgot_password():
    """clicks on forgot password link"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.login.forgot_password_button"))
        )
    )
    forgot_password_link = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_button")
    )
    forgot_password_link.click()


def forgot_password_page_validation():
    """validates forgot password page is displayed with already hae code button"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_already_have_code"),
            )
        )
    )
    assert_that(
        util.DRIVER.current_url,
        contains_string(get_config_data("application_data.forgot_password_url")),
    )


def disable_get_reset_code_link():
    """validates get reset code button is disabled"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_get_reset_code"),
            )
        )
    )
    get_reset_code_link = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_get_reset_code")
    )
    util.validate_equal_values(get_reset_code_link.is_enabled(), False)


def username_field_blank_validation():
    """validates username field is blank"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_username_input"),
            )
        )
    )
    username = util.DRIVER.find_element_by_tag_name(
        get_element("elements.login.forgot_password_username_input")
    ).get_attribute("value")
    util.validate_equal_values(username, "")


def enter_invalid_username():
    """enters invalid username"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_username_input"),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_username_input")
    ).send_keys(get_config_data("login_data.invalid_username"))


def clicks_on_already_have_code_link():
    """clicks on already have code link"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_already_have_code"),
            )
        )
    )
    # already have code does not work sometimes due to loading issue.
    # Therefore, adding sleep
    time.sleep(2)
    already_have_code_link = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_already_have_code")
    )
    already_have_code_link.click()


def invalid_username_error_message_validation():
    """validating error message when invalid username is entered"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.util.error_message_alert"))
        )
    )
    invalid_username_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.error_message_alert")
    ).text
    util.validate_equal_values(
        invalid_username_error_message,
        get_constant_data("error_message.login.invalid_username"),
    )


def clicks_on_go_back_to_login():
    """clicks on go back to login page"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_go_back_to_login"),
            )
        )
    )
    go_back_to_login = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_go_back_to_login")
    )
    go_back_to_login.click()


def clicks_on_get_reset_code():
    """clicks on get reset code button"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_get_reset_code"),
            )
        )
    )
    get_reset_code_link = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_get_reset_code")
    )
    get_reset_code_link.click()


def disable_continue_button_validation():
    """validates continue button is disabled"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.login.username_continue_button"))
        )
    )
    continue_button = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_continue_button")
    )
    util.validate_equal_values(continue_button.is_enabled(), False)


def clicks_on_continue():
    """clicks on continue button"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.login.username_continue_button"))
        )
    )
    continue_button = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_continue_button")
    )
    continue_button.click()


def enable_get_reset_code_link():
    """validates get reset code is enabled"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_get_reset_code"),
            )
        )
    )
    get_reset_code_link = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_get_reset_code")
    )
    util.validate_equal_values(get_reset_code_link.is_enabled(), True)


def username_validation():
    """validates username value as per entered"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_username_input"),
            )
        )
    )
    username_value = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_username_input")
    )
    util.validate_equal_values(username_value, get_config_data("username"))


def password_reset_screen_validation():
    """validates password reset screen is displayed with submit button"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.login.forgot_password_submit"))
        )
    )
    submit_button = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_submit")
    ).get_attribute("disabled")
    util.validate_equal_values(submit_button, "true")


def enter_new_password():
    """enters password in new password field"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_new_password"),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    ).send_keys(get_config_data("login_data.password"))


def enter_new_confirm_password():
    """enters password in confirm new password field"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    ).send_keys(get_config_data("login_data.invalid_password"))


def password_fields_mismatch_error_message_validation():
    """validate error message when new and confirm password fields have different values"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.util.error_message_alert"))
        )
    )
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)
    mismatch_password_fields_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.error_message_alert")
    ).text
    util.validate_equal_values(
        mismatch_password_fields_error_message,
        get_constant_data("error_message.login.mismatch_password_fields_error_message"),
    )


def clicks_on_eye_invisible_new_password():
    """clicks on eye button to view the new password field's value"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.eye_toggle_to_show_value")
    ).click()


def visibility_of_new_password_value_validation():
    """validate new password field's value is displayed"""
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    ).get_attribute("type")
    util.validate_equal_values(password, "text")


def clicks_on_eye_invisible_new_confirm_password():
    """clicks on eye button to view the new confirm password field's value"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.eye_toggle_to_show_value")
    ).click()


def visibility_of_new_confirm_password_value_validation():
    """validate new confirm password field's value is displayed"""
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    ).get_attribute("type")
    util.validate_equal_values(password, "text")


def clicks_on_eye_new_password():
    """clicks on eye button to hide the new password field's value"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.eye_toggle_to_hide_value")
    ).click()


def validation_of_new_password_value_hide():
    """validate new password field's value is not displayed"""
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    ).get_attribute("type")
    util.validate_equal_values(password, "password")


def clicks_on_eye_new_confirm_password():
    """clicks on eye button to hide the new confirm password field's value"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.eye_toggle_to_hide_value")
    ).click()


def validation_of_new_confirm_password_value_hide():
    """validate new confirm password field's value is not displayed"""
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    ).get_attribute("type")
    util.validate_equal_values(password, "password")


def enter_new_password_with_less_than_8_characters():
    """enters password of less than 8 characters in new password field"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_new_password"),
            )
        )
    )
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    )
    # clearing the field
    password.send_keys(Keys.CONTROL, "a")
    password.send_keys(Keys.BACKSPACE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    ).send_keys(get_config_data("login_data.password_for_minimum_length"))
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)


def enter_single_digit_data_in_code_field():
    """enters single digit in code field"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_code_from_email"),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_code_from_email")
    ).send_keys(get_config_data("login_data.one_digit_code"))
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)


def length_compliance_validation_new_password_and_code_field():
    """validates error message for minimum length of new and confirm password fields"""
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)
    error_message_list = util.DRIVER.find_elements_by_css_selector(
        get_element("elements.util.error_message_alert")
    )
    util.validate_equal_values(
        error_message_list[0].text,
        get_constant_data("error_message.login.length_compliance_message_code_field"),
    )
    util.validate_equal_values(
        error_message_list[1].text,
        get_constant_data(
            "error_message.login.length_compliance_message_password_field"
        ),
    )


def enter_valid_format_password():
    """enters valid password"""
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    )
    # clearing the field
    password.send_keys(Keys.CONTROL, "a")
    password.send_keys(Keys.BACKSPACE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    ).send_keys(get_config_data("login_data.password"))
    confirm_password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    )
    # clearing the field
    confirm_password.send_keys(Keys.CONTROL, "a")
    confirm_password.send_keys(Keys.BACKSPACE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    ).send_keys(get_config_data("login_data.password"))


def enter_6_digit_code():
    """enters valid 6 digit code"""
    code = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_code_from_email")
    )
    # clearing the field
    code.send_keys(Keys.CONTROL, "a")
    code.send_keys(Keys.BACKSPACE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_code_from_email")
    ).send_keys(get_config_data("login_data.code"))


def clicks_on_set_password():
    """click on submit button"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.login.forgot_password_submit"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_submit")
    ).click()


def invalid_code_error_message_validation():
    """validates error message for invalid code value"""
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)
    invalid_code_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.error_message_alert")
    ).text
    util.validate_equal_values(
        invalid_code_error_message,
        get_constant_data("error_message.login.invalid_code_error_message"),
    )


def clear_all_fields():
    """clears all the input fields"""
    code = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_code_from_email")
    )
    # clearing the field
    code.send_keys(Keys.CONTROL, "a")
    code.send_keys(Keys.BACKSPACE)
    password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_password")
    )
    # clearing the field
    password.send_keys(Keys.CONTROL, "a")
    password.send_keys(Keys.BACKSPACE)
    confirm_password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_new_confirm_password")
    )
    # clearing the field
    confirm_password.send_keys(Keys.CONTROL, "a")
    confirm_password.send_keys(Keys.BACKSPACE)


def error_message_for_blank_fields_validation():
    """validates error message on blank input fields"""
    # multiple alerts are displayed one after another.
    # adding sleep to make sure correct alert message is captured
    time.sleep(2)
    # capturing all alerts in a list and validating all with expected values
    error_message_list = util.DRIVER.find_elements_by_css_selector(
        get_element("elements.util.error_message_alert")
    )
    util.validate_equal_values(
        error_message_list[0].text,
        get_constant_data(
            "error_message.login.error_message_forogt_password_blank_code"
        ),
    )
    util.validate_equal_values(
        error_message_list[1].text,
        get_constant_data(
            "error_message.login.error_message_forogt_password_blank_password"
        ),
    )
    util.validate_equal_values(
        error_message_list[2].text,
        get_constant_data(
            "error_message.login.error_message_forogt_password_blank_password"
        ),
    )


def enter_username_on_forgot_password_screen():
    """enters username on forgot password screen"""
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.login.forgot_password_username_input"),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.forgot_password_username_input")
    ).send_keys(get_config_data("login_data.username"))
