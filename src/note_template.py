"""imports"""
import time
from hamcrest import assert_that
from selenium.webdriver.common.by import By
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver.common.keys import Keys
from get_data import get_config_data, get_constant_data, get_element
import util


def user_clicks_on_create():
    """click on create note template button"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.create"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.create")
    ).click()


def note_template_create_form_validation():
    """validates note template create form is displayed"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.note_template.submit"))
        )
    )
    note_editor_body = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.submit")
    ).get_attribute("disabled")
    util.validate_equal_values(note_editor_body, None)


def clicks_on_submit():
    """click on submit button of create/edit form"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.submit"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.submit")
    ).click()


def error_message_on_blank_template_name_validation():
    """validates error message when sumitting the form with template name blank"""
    actual_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.error_message_alert")
    ).get_attribute("innerText")
    expected_error_message = get_constant_data(
        "error_message.note_template.template_name_blank"
    )
    util.validate_equal_values(expected_error_message, actual_error_message)


def enters_template_name():
    """enters template name"""
    global TEMPLATE_NAME_VALUE
    TEMPLATE_NAME_VALUE = (
        get_config_data("note_template.template_name")
        + " - "
        + util.random_alpha_numeric()
    )
    template_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.template_name")
    )
    template_name.send_keys(TEMPLATE_NAME_VALUE)


def detail_view_name_validation():
    """validates detail view of required template is displayed with template name"""
    detail_view_template_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.record_validation_detail_view")
    ).get_attribute("innerText")
    assert_that(
        detail_view_template_name, get_config_data("note_template.template_name")
    )


def detail_view_validation():
    """validates detail view is displayed with edit button"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.edit"))
        )
    )
    edit_title = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.edit")
    ).get_attribute("disabled")
    util.validate_equal_values(edit_title, None)


def clicks_on_edit():
    """clicks on edit button"""
    time.sleep(1)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.edit")
    ).click()


def updates_text_in_note_editor():
    """updates any existing note template"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.note_editor.body"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(get_config_data("note_template.text_to_check_update"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(Keys.ENTER)
    global ENTIRE_NOTE
    ENTIRE_NOTE = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).get_attribute("innerText")


def clicks_on_save():
    """clicks on save to save any changes"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.submit"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.submit")
    ).click()


def changes_of_note_detail_view_validation():
    """validates changes made are displayed in detail view"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.note_template.detail_view_note_body"),
            )
        )
    )
    time.sleep(1)
    detail_view_text = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.detail_view_note_body")
    ).get_attribute("innerText")
    util.validate_equal_values(detail_view_text, ENTIRE_NOTE)


def note_template_edit_form_validation():
    """validates edit form is displayed"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.note_template.edit_title"))
        )
    )
    edit_title = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.edit_title")
    ).get_attribute("innerText")
    util.validate_equal_values(edit_title, get_config_data("note_template.edit_title"))


def clicks_on_back_button_from_detail():
    """click on back button from detail view"""
    time.sleep(1)
    util.wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.note_template.detail_view_back_button"),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.detail_view_back_button")
    ).click()
    time.sleep(1)


def enters_template_name_that_already_exists():
    """enters template name which already exists"""
    template_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.template_name")
    )
    template_name.send_keys(TEMPLATE_NAME_VALUE)


def unique_template_name_validation():
    """validates error message for template name to be unique"""
    actual_error_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.error_message_alert")
    ).get_attribute("innerText")
    expected_error_message = get_constant_data(
        "error_message.note_template.template_name_unique"
    )
    util.validate_equal_values(actual_error_message, expected_error_message)


def clears_template_name_field():
    """clears template name field"""
    template_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.template_name")
    )
    template_name.send_keys(Keys.CONTROL, "a")
    template_name.send_keys(Keys.BACKSPACE)


def deletes_note_template():
    """deletes note template"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.delete_button"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.delete_button")
    ).click()
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.util.warning_popup_confirm_button"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.util.warning_popup_confirm_button")
    ).click()


def search_with_deleted_note_template():
    """searches with deleted template to validate template is deleted successfully"""
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.search_list_view"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.search_list_view")
    ).send_keys(TEMPLATE_NAME_VALUE)
