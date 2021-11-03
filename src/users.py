from abc import get_cache_token
from argparse import Action
from audioop import add
from ctypes import c_ssize_t
from lib2to3.pgen2 import driver
from random import *
import time
from tkinter import E
from hamcrest import assert_that, equal_to
from selenium.webdriver.common.by import By
from selenium.webdriver.support import wait
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains


from get_data import *
import util

global_random_number = int(random() * (10 ** 10))
global_random_number = str(global_random_number)


def dashboard_title():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.side_menu.administrative"))
        )
    )
    title_name = util.DRIVER.title
    assert_that(title_name, equal_to("Dashboard | House Works"))


def administrative_icon():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.side_menu.administrative"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu.administrative")
    ).click()
    admin_text = util.DRIVER.find_element_by_css_selector(
        "#sidebar > div > div > h4"
    ).text
    assert_that(admin_text, equal_to("Administrative"))


def user_menu():
    util.DRIVER.find_element_by_css_selector(
        "[data-testid='menu-Users']").click()
    util.wait_function(
        ec.visibility_of_element_located(
            (By.XPATH, "//div[contains(@id,'tab-Users')]")
        )
    )
    user_tab_text = util.DRIVER.find_element_by_xpath(
        "//div[contains(@id,'tab-Users')]"
    ).text
    assert_that(user_tab_text, equal_to("Users"))


def add_user_button():
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.add_user_button")).click()


def add_form():
    add_user_tab_text = util.DRIVER.find_element_by_xpath(
        "//div[contains(@id,'tab-UserForm')]"
    ).text
    assert_that(add_user_tab_text, equal_to("Add User"))


def title_field():
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.title_field")).click()


def list_of_title():
    flag_for_user_title = True
    i = 0
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-testid="Mx."]')
        )
    )
    while i < len(get_constant_data("list.expected_user_title_drop_down")):
        actual_user_title_drop_down = util.DRIVER.find_element_by_css_selector(
            '[data-testid="add-user-title"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
        ).text
        if actual_user_title_drop_down != get_constant_data("list.expected_user_title_drop_down[" + str(i) + "]"):
            flag_for_user_title = False
        i += 1
        actions = ActionChains(util.DRIVER)
        actions.send_keys(Keys.ARROW_DOWN).perform()
    assert_that(flag_for_user_title, equal_to(True))


def gender_field():
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.gender_field")).click()


def list_of_identifying_gender():
    flag_for_user_gender = True
    i = 0
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-testid="identifies_as_male"]')
        )
    )
    while i < len(get_constant_data("list.expected_user_gender_drop_down")):
        actual_user_gender_drop_down = util.DRIVER.find_element_by_css_selector(
            '[data-testid="add-user-gender"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
        ).text
        if actual_user_gender_drop_down != get_constant_data("list.expected_user_gender_drop_down[" + str(i) + "]"):
            flag_for_user_gender = False
        i += 1
        actions = ActionChains(util.DRIVER)
        actions.send_keys(Keys.ARROW_DOWN).perform()
    assert_that(flag_for_user_gender, equal_to(True))


def click_on_user_add_button():
    util.DRIVER.find_element_by_id(get_element(
        "elements.user.create_user_button")).click()


def check_mandatory_validation():
    flag_for_validation_message = True
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, '[role="alert"]')
        )
    )
    actual_validation_message = util.DRIVER.find_elements_by_css_selector(
        '[role="alert"]'
    )

    i = 0
    while i < len(actual_validation_message):
        if actual_validation_message[i].text != get_constant_data("error_message.user.expected_validation_message[" + str(i) + "]"):
            flag_for_validation_message = False
        i += 1

    assert_that(flag_for_validation_message, equal_to(True))


def fill_the_details():
    global expected_gender, expected_title, expected_dob, expected_access_group, expected_username
    global expected_user_type, expected_npi, expected_dea, expected_dea_expiration_date, expected_state_license, expected_state_license_expiration_date, expected_state
    expected_user_type = []
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.title_field")).click()
    util.DRIVER.find_element_by_css_selector("[data-testid='Mr.']").click()
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.first_name_field")
    ).send_keys(get_config_data("user_data.first_name"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.middle_name_field")
    ).send_keys(get_config_data("user_data.middle_name"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.last_name_field")
    ).send_keys(get_config_data("user_data.last_name"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.ssn_field")
    ).send_keys(get_config_data("user_data.already_exists_ssn"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.gender_field")
    ).click()
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, "[data-testid='identifies_as_male']")
        )
    )
    util.DRIVER.find_element_by_css_selector(
        "[data-testid='identifies_as_male']"
    ).click()
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_dob")).click()
    util.DRIVER.find_element_by_class_name("ant-picker-month-btn").click()
    util.DRIVER.find_element_by_css_selector("[title='2003-01']").click()
    util.DRIVER.find_element_by_css_selector("[title='2003-01-01']").click()
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.username_generate_button")
    ).click()
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    ).send_keys(get_config_data("user_data.email"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_type_field")
    ).click()
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, "[data-testid='doctor']")
        )
    )
    util.DRIVER.find_element_by_css_selector("[data-testid='doctor']").click()
    util.DRIVER.find_element_by_css_selector(get_element("elements.user.npi_field")).send_keys(
        get_config_data("user_data.npi")
    )
    util.DRIVER.find_element_by_css_selector(get_element("elements.user.dea_field")).send_keys(
        get_config_data("user_data.dea")
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.dea_expiration_date_field")
    ).send_keys(get_config_data("user_data.date"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_license")
    ).send_keys(get_config_data("user_data.state_license"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_license_expiration_date_field")
    ).send_keys(get_config_data("user_data.date"))
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_field")
    ).send_keys(get_config_data("user_data.state"))
    access_group_inner_text = []
    i = 0
    while i < 2:
        util.DRIVER.find_element_by_css_selector(
            get_element("elements.user.access_management_drop_down")
        ).click()
        actions = ActionChains(util.DRIVER)
        actions.send_keys(Keys.ARROW_DOWN).perform()
        actions.send_keys(Keys.ENTER).perform()
        access_group = util.DRIVER.find_element_by_xpath(
            '//div[@data-testid="add-user-access-management-dropdown"]//following-sibling::span'
        ).text
        access_group_inner_text.append(access_group)
        util.DRIVER.find_element_by_css_selector(
            get_element("elements.user.access_management_add_button")
        ).click()
        i = i + 1

    expected_user_type.append(util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_type_field")
    ).text)
    expected_npi = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.npi_field")
    ).get_attribute("value")
    expected_dea = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.dea_field")
    ).get_attribute("value")
    expected_dea_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.dea_expiration_date_field")
    ).get_attribute("value")
    expected_state_license = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_license")
    ).get_attribute("value")
    expected_state_license_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element(
            "elements.user.state_license_expiration_date_field")
    ).get_attribute("value")
    expected_state = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_field")
    ).get_attribute("value")
    expected_access_group = access_group_inner_text

    util.DRIVER.find_element_by_id(
        get_element("elements.user.create_user_button")).click()

    expected_title = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.title_field")
    ).text
    expected_gender = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.gender_field")
    ).text
    expected_dob = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_dob")
    ).get_attribute("value")
    expected_username = util.DRIVER.find_element_by_id(
        get_element("elements.user.username_field")).get_attribute("value")


def already_exists_message():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.XPATH,
             get_element("elements.user.ssn_already_exists_alert"))
        )
    )
    ssn_unique_validation_message = util.DRIVER.find_element_by_xpath(
        get_element("elements.user.ssn_already_exists_alert")
    ).text
    email_unique_validation_message = util.DRIVER.find_element_by_xpath(
        get_element("elements.user.email_unique_alert")
    ).text
    assert_that(
        ssn_unique_validation_message,
        equal_to(get_constant_data(
            "error_message.user.ssn_already_exists_message")),
    )
    assert_that(email_unique_validation_message,
                equal_to(get_constant_data("error_message.user.unique_email_message")))


def enter_alphanumeric_ssn():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.user.ssn_field"))
        )
    )
    clear_ssn = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.ssn_field")
    )
    clear_ssn.send_keys(Keys.CONTROL + "a")
    clear_ssn.send_keys(Keys.DELETE)
    util.DRIVER.find_element_by_css_selector(get_element("elements.user.ssn_field")).send_keys(
        get_config_data("user_data.invalid_ssn")
    )


def invalid_ssn_message():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.XPATH, get_element("elements.user.ssn_invalid_alert"))
        )
    )
    ssn_invalid_message = util.DRIVER.find_element_by_xpath(
        get_element("elements.user.ssn_invalid_alert")
    ).text
    assert_that(ssn_invalid_message, equal_to(
        get_constant_data("error_message.user.invalid_ssn_message")))


def enter_invalid_email():
    clear_email = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    )
    clear_email.send_keys(Keys.CONTROL + "a")
    clear_email.send_keys(Keys.DELETE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    ).send_keys(get_config_data("user_data.invalid_email"))


def invalid_email_message():
    email_invalid_message = util.DRIVER.find_element_by_xpath(
        get_element("elements.user.email_invalid_alert")
    ).text
    assert_that(email_invalid_message, equal_to(
        get_constant_data("error_message.user.invalid_email_message")))


def enter_valid_ssn():
    clear_ssn = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.ssn_field")
    )
    clear_ssn.send_keys(Keys.CONTROL + "a")
    clear_ssn.send_keys(Keys.DELETE)
    util.DRIVER.find_element_by_css_selector(get_element("elements.user.ssn_field")).send_keys(
        global_random_number
    )


def enter_valid_email():
    clear_email = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    )
    clear_email.send_keys(Keys.CONTROL + "a")
    clear_email.send_keys(Keys.DELETE)
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    ).send_keys("pankaj+" + global_random_number + "@theprocedure.in")


def click_create_button():
    # time.sleep(5)
    util.DRIVER.find_element_by_id(get_element(
        "elements.user.create_user_button")).click()


def user_title():
    util.wait_function(
        ec.text_to_be_present_in_element(
            (By.CSS_SELECTOR,
             get_element("elements.user.detail_view_heading")), expected_title + " " +
            get_config_data("user_data.last_name") + "," + " " + get_config_data(
                "user_data.first_name") + " " + get_config_data("user_data.middle_name")
        )
    )
    heading = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_heading")
    ).text
    assert_that(heading, equal_to(expected_title + " " +
                get_config_data("user_data.last_name") + "," + " " + get_config_data("user_data.first_name") + " " + get_config_data("user_data.middle_name")))


def search_user():
    util.DRIVER.find_element_by_xpath(
        "//div[contains(@class,'ant-tabs-tab-active')]/button/span"
    ).click()
    util.DRIVER.find_element_by_xpath(
        '//input[@placeholder="Search users"]'
    ).send_keys("pankaj+" + global_random_number + "@theprocedure.in")


def verify_search_result():
    util.wait_function(
        ec.visibility_of_element_located(
            (By.XPATH, '//td[contains(text(),"pankaj+'
             + global_random_number
             + '@theprocedure.in")]')
        )
    )

    email = util.DRIVER.find_element_by_xpath(
        '//td[contains(text(),"pankaj+' +
        global_random_number + '@theprocedure.in")]'
    ).text
    assert_that(email, equal_to(
        "pankaj+" + global_random_number + "@theprocedure.in"))


def click_on_the_user():
    util.DRIVER.find_element_by_xpath(
        '//td[contains(text(),"pankaj+' +
        global_random_number + '@theprocedure.in")]'
    ).click()
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.user.detail_view_heading"))
        )
    )
    text_message = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_heading")
    ).text
    assert_that(text_message, equal_to(expected_title + " " +
                get_config_data("user_data.last_name") + "," + " " + get_config_data("user_data.first_name") + " " + get_config_data("user_data.middle_name")))


def verify_the_details_of_user():
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.show_ssn_button")).click()
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.show_username_button")
    ).click()
    time.sleep(2)
    get_ssn = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_ssn_value")
    ).text
    get_gender = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_gender_value")
    ).text
    get_dob = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_dob_value")
    ).text
    get_username = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_username_value")
    ).text
    get_emailid = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_email_value")
    ).text
    get_usertype = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_user_type_value")
    ).text
    get_npi = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_user_npi_value")
    ).text
    get_dea = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_user_dea_value")
    ).text
    get_dea_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element(
            "elements.user.detail_view_user_dea_license_expiration_date_value")
    ).text
    get_state_licence = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_state_license_value")
    ).text
    get_state_licence_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element(
            "elements.user.detail_view_state_license_expiration_date_value")
    ).text
    get_state = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.detail_view_state_value")
    ).text
    actual_access_group = []
    for i in range(len(expected_access_group)):

        util.DRIVER.find_element_by_css_selector(get_element("elements.user.search_bar_for_access_management")).send_keys(
            expected_access_group[i]
        )
        time.sleep(2)
        actual_access_group.append(
            util.DRIVER.find_element_by_xpath(
                "//td[contains(text(),'" + expected_access_group[i] + "')]"
            ).text
        )
        util.DRIVER.find_element_by_css_selector(
            get_element("elements.user.search_bar_for_access_management")).send_keys(Keys.BACKSPACE*len(expected_access_group[i]))

    assert_that(get_ssn, equal_to(global_random_number[0:9]))

    assert_that(get_gender, equal_to(expected_gender))
    assert_that(get_dob, equal_to(expected_dob))
    assert_that(get_username, equal_to(expected_username))
    assert_that(
        get_emailid, equal_to(
            "pankaj+" + global_random_number + "@theprocedure.in")
    )
    assert_that(get_usertype, equal_to(expected_user_type[0]))
    assert_that(get_npi, equal_to(expected_npi))
    assert_that(get_dea, equal_to(expected_dea))
    assert_that(get_dea_expiration_date, equal_to(
        expected_dea_expiration_date))
    assert_that(get_state_licence, equal_to(expected_state_license))
    assert_that(
        get_state_licence_expiration_date,
        equal_to(expected_state_license_expiration_date),
    )
    assert_that(get_state, equal_to(expected_state))
    for i in range(len(expected_access_group)):
        assert_that(actual_access_group[i], equal_to(expected_access_group[i]))


def click_on_edit():
    util.DRIVER.find_element_by_xpath(
        get_element("elements.user.edit_button")).click()


def validate_prefilled_data():
    time.sleep(3)
    get_title = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.title_field")
    ).text
    get_fisrt_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.first_name_field")
    ).get_attribute("value")
    get_middle_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.middle_name_field")
    ).get_attribute("value")
    get_last_name = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.last_name_field")
    ).get_attribute("value")
    get_ssn = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.ssn_field")
    ).get_attribute("value")
    get_gender = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.gender_field")
    ).text
    get_dob = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_dob")
    ).get_attribute("value")
    get_username = util.DRIVER.find_element_by_id(get_element("elements.user.username_field")).get_attribute(
        "value"
    )
    get_email_id = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.email_field")
    ).get_attribute("value")
    get_user_type = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.user_type_field")
    ).text
    get_npi = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.npi_field")
    ).get_attribute("value")
    get_dea = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.dea_field")
    ).get_attribute("value")
    get_dea_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.dea_expiration_date_field")
    ).get_attribute("value")
    get_state_license = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_license")
    ).get_attribute("value")
    get_state_license_expiration_date = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_license_expiration_date_field")
    ).get_attribute("value")
    get_state = util.DRIVER.find_element_by_css_selector(
        get_element("elements.user.state_field")
    ).get_attribute("value")
    actual_access_group = []
    for i in range(len(expected_access_group)):
        actual_access_group.append(
            util.DRIVER.find_element_by_xpath(
                "//td[contains(text(),'" + expected_access_group[i] + "')]"
            ).text
        )

    assert_that(get_title, equal_to(expected_title))
    assert_that(get_fisrt_name, equal_to(
        get_config_data("user_data.first_name")))
    assert_that(get_middle_name, equal_to(
        get_config_data("user_data.middle_name")))
    assert_that(get_last_name, equal_to(
        get_config_data("user_data.last_name")))
    assert_that(get_ssn, equal_to(global_random_number[0:9]))
    assert_that(get_gender, equal_to(expected_gender))
    assert_that(get_dob, equal_to(expected_dob))
    assert_that(get_username, equal_to(expected_username))
    assert_that(
        get_email_id, equal_to(
            "pankaj+" + global_random_number + "@theprocedure.in")
    )
    assert_that(get_user_type, equal_to(expected_user_type[0]))
    assert_that(get_npi, equal_to(expected_npi))
    assert_that(get_dea, equal_to(expected_dea))
    assert_that(get_dea_expiration_date, equal_to(
        expected_dea_expiration_date))
    assert_that(get_state_license, equal_to(expected_state_license))
    assert_that(get_state_license_expiration_date, equal_to(
        expected_state_license_expiration_date))
    assert_that(get_state, equal_to(expected_state))
    for i in range(len(expected_access_group)):
        assert_that(actual_access_group[i], equal_to(expected_access_group[i]))


def verify_all_user_types():
    additional_user_types_text = ["Physician Assistant", "Nurse Practitioner", "Dietician", "Social Worker", "Pharmacist", "Nurse",
                                  "Vocational Nurse", "Office Assistant", "Living Donor Advocate", "Quality Coordinator", "Financial Counselor", "Director", "Other"]
    additional_user_types = ["physician_assistant", "nurse_practitioner", "dietician", "social_worker", "pharmacist", "nurse",
                             "vocational_nurse", "office_assistant", "living_donor_advocate", "quality_coordinator", "financial_counselor", "director", "other"]
    flag_to_enter_data = True
    for i in range(len(additional_user_types_text)):
        util.DRIVER.find_element_by_css_selector(
            get_element("elements.user.user_type_field")
        ).click()
        util.DRIVER.find_element_by_xpath(
            '//*[@data-testid="add-user-user-type"]//input'
        ).send_keys(additional_user_types_text[i])
        time.sleep(2)  # wait to get text from selected user field
        util.DRIVER.find_element_by_css_selector(
            "[data-testid='" +
            additional_user_types[i] + "']").click()
        time.sleep(1)  # wait to get text from selected user field
        expected_user_type.append(util.DRIVER.find_element_by_css_selector(
            get_element("elements.user.user_type_field")
        ).text)

        if additional_user_types_text[i] in "Dietician":
            util.DRIVER.find_element_by_id(get_element(
                "elements.user.create_user_button")).click()
            actual_user_type_dietician = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_type_value")).text
            actual_state_license = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_state_license_value")).text
            actual_state_license_expiration_date = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_state_license_expiration_date_value")).text
            actual_state = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_state_value")).text

            assert_that(actual_user_type_dietician,
                        equal_to(expected_user_type[i+1]))
            assert_that(actual_state_license, equal_to(expected_state_license))
            assert_that(actual_state_license_expiration_date, equal_to(
                expected_state_license_expiration_date))
            assert_that(actual_state, equal_to(expected_state))

            util.DRIVER.find_element_by_xpath(
                get_element("elements.user.edit_button")).click()

        elif additional_user_types_text[i] in 'Office Assistant, Living Donor Advocate, Quality Coordinator, Financial Counselor, Director, Other':
            util.DRIVER.find_element_by_id(get_element(
                "elements.user.create_user_button")).click()

            actual_user_type_basic_info = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_type_value")).text

            assert_that(actual_user_type_basic_info,
                        equal_to(expected_user_type[i+1]))
            util.DRIVER.find_element_by_xpath(
                get_element("elements.user.edit_button")).click()

        elif additional_user_types_text[i] in 'Social Worker, Pharmacist, Nurse, Vocational Nurse':
            if flag_to_enter_data == True:
                flag_to_enter_data = False
                util.DRIVER.find_element_by_css_selector(
                    get_element("elements.user.license_number_field")).send_keys('MH1420110062821')
                util.DRIVER.find_element_by_css_selector(
                    get_element("elements.user.license_expiration_date")).send_keys('02/05/2021')

            util.DRIVER.find_element_by_id(get_element(
                "elements.user.create_user_button")).click()

            actual_user_type_license = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_type_value")).text
            actual_license_number = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_license_number_value")).text
            actual_license_expiration_date = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_licence_expiration_date_value")).text

            assert_that(actual_user_type_license,
                        equal_to(expected_user_type[i+1]))
            assert_that(actual_license_number, equal_to(
                get_config_data("user_data.state_license")))
            assert_that(actual_license_expiration_date,
                        equal_to('02/05/2021'))
            util.DRIVER.find_element_by_xpath(
                get_element("elements.user.edit_button")).click()

        elif additional_user_types_text[i] in "Physician Assistant, Nurse Practitioner":
            util.DRIVER.find_element_by_id(get_element(
                "elements.user.create_user_button")).click()
            get_user_type = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_type_value")
            ).text
            get_npi = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_npi_value")
            ).text
            get_dea = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_user_dea_value")
            ).text
            get_dea_expiration_date = util.DRIVER.find_element_by_css_selector(
                get_element(
                    "elements.user.detail_view_user_dea_license_expiration_date_value")
            ).text
            get_state_license = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_state_license_value")
            ).text
            get_state_license_expiration_date = util.DRIVER.find_element_by_css_selector(
                get_element(
                    "elements.user.detail_view_state_license_expiration_date_value")
            ).text
            get_state = util.DRIVER.find_element_by_css_selector(
                get_element("elements.user.detail_view_state_value")
            ).text

            assert_that(get_user_type, equal_to(expected_user_type[i+1]))
            assert_that(get_npi, equal_to(expected_npi))
            assert_that(get_dea, equal_to(expected_dea))
            assert_that(get_dea_expiration_date, equal_to(
                expected_dea_expiration_date))
            assert_that(get_state_license, equal_to(expected_state_license))
            assert_that(get_state_license_expiration_date, equal_to(
                expected_state_license_expiration_date))
            assert_that(get_state, equal_to(expected_state))

            util.DRIVER.find_element_by_xpath(
                get_element("elements.user.edit_button")).click()
