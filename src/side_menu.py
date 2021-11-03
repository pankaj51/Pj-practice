"""imports"""
from hamcrest import assert_that, contains_string
from selenium.webdriver.common.by import By
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver import ActionChains
from get_data import get_element
import util


def user_right_clicks_on_side_menu(text):
    """right click on side menu to view the options"""
    action_chain = ActionChains(util.DRIVER)
    create_patient_side_menu = util.DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu." + text)
    )
    util.wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.side_menu." + text))
        )
    )
    action_chain.context_click(create_patient_side_menu).perform()


def clicks_on_open_on_side():
    """clicks on open to the side menu for opening three side at the begining"""
    util.wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.side_menu.open_to_the_side"))
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu.open_to_the_side")
    ).click()


def open_on_side(text, side_number):
    """clicks to open feature as per the text and on each group as per the side number given"""
    util.wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.side_menu." + text + "_group_" + side_number),
            )
        )
    )
    util.DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu." + text + "_group_" + side_number)
    ).click()


def validate_open_on_side(text, side_number):
    """validating tab is displayed after each side opening"""
    inner_text = util.DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu.active_tab_side_" + side_number)
    ).get_attribute("innerText")
    assert_that(inner_text, contains_string(text))
