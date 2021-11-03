"""imports"""
import time
from selenium.webdriver.common.by import By
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver.common.keys import Keys
from get_data import get_element, get_config_data
import util
from hamcrest import assert_that, equal_to


def title():
    """validates title of the page"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.login.forgot_password_button"))
        )
    )
    title_name = util.DRIVER.title
    util.validate_equal_values(title_name, "Login | House Works")


def enter_incorrect_username():
    """enters incorrect username"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_input")
    ).send_keys(get_config_data("login_data.invalid_username"))


def click_on_username_continue_button():
    """clicks on continue button after username is entered"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_continue_button")
    ).click()


def empty_username():
    """clears username field"""
    clear_username = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_input")
    )
    clear_username.send_keys(Keys.CONTROL, "a")
    clear_username.send_keys(Keys.BACKSPACE)


def enter_correct_username():
    """enters correct username"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_input")
    ).send_keys(get_config_data("login_data.username"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.username_continue_button")
    ).click()


def password_field_visible():
    """validates password field is visible"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.login.password_input"))
        )
    )
    username_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.disable_username_input")
    ).get_attribute("value")
    assert_that(username_error_message, equal_to(
        get_config_data("login_data.username"))
    )


def enter_password():
    """enters password with less than required length"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_input")
    ).send_keys(get_config_data("login_data.password_for_minimum_length"))


def invalid_password():
    """enters invalid password"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_input")
    ).send_keys(get_config_data("login_data.invalid_password"))


def click_on_password_continue_button():
    """click on continue button after password is entered"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_continue_button")
    ).click()


def validation_check(message):
    """validates actual error message with expected message provided"""
    time.sleep(1)
    invalid_password_message = util.DRIVER.find_element_by_class_name(
        "ant-form-item-explain"
    ).text
    util.validate_equal_values(invalid_password_message, message)


def click_on_crossed_eye_button():
    """click on crossed eye button of input field"""
    util.DRIVER.find_element_by_css_selector(
        "[data-icon='eye-invisible']").click()


def password_visible():
    """validate password value is shown on disabling the eye icon"""
    element_visible = util.DRIVER.find_element_by_class_name(
        "ant-input-password.ant-input-affix-wrapper input"
    )
    eye_button_visible = element_visible.get_attribute("type")
    util.validate_equal_values(eye_button_visible, "text")


def click_on_eye_button():
    """click on eye button of input field"""
    util.DRIVER.find_element_by_css_selector("[data-icon='eye']").click()


def password_hide():
    """validate password value is hidden on disabling the eye icon"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                "[data-icon='eye-invisible']",
            )
        )
    )
    element_hide = util.DRIVER.find_element_by_class_name(
        "ant-input-password.ant-input-affix-wrapper input"
    )
    eye_button_hide = element_hide.get_attribute("type")
    util.validate_equal_values(eye_button_hide, "password")


def empty_password_field():
    """clears password field"""
    clear_password = util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_input")
    )
    clear_password.send_keys(Keys.CONTROL, "a")
    clear_password.send_keys(Keys.BACKSPACE)


def enter_correct_password():
    """enters correct username"""
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_input")
    ).send_keys(get_config_data("login_data.password"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.login.password_continue_button")
    ).click()


def dashboard():
    """validates dashboard is displayed"""
    util.wait_function(
        ec.text_to_be_present_in_element(
            (By.CSS_SELECTOR, get_element("elements.side_menu.create_patient_sub_menu_field"),), 'Add Patient')
    )
    util.validate_equal_values(
        util.DRIVER.current_url, get_config_data(
            "application_data.dashboard_url")
    )
