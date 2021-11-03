"""imports"""
import math
import random
import time
from hamcrest import assert_that, is_not, contains_string, equal_to
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import selenium.webdriver.support.expected_conditions as ec
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import IEDriverManager, EdgeChromiumDriverManager
from webdriver_manager.opera import OperaDriverManager
from webdriver_manager.utils import ChromeType
from get_data import get_element, get_constant_data, get_config_data


def start_browser(browser_name):
    """initialize and open login page"""
    global DRIVER
    DRIVER = choose_web_driver(browser_name)

    DRIVER.implicitly_wait(15)

    DRIVER.get(get_config_data("application_data.url"))
    DRIVER.maximize_window()

    assert_that(DRIVER.title, "Login | House Works")
    return DRIVER


def choose_web_driver(browser_name):
    """to choose, download, install, and return the webdriver"""
    if browser_name == "Firefox":
        driver_selected = webdriver.Firefox(
            executable_path=GeckoDriverManager().install()
        )
        return driver_selected
    if browser_name == "Chromium":
        driver_selected = webdriver.Chrome(
            executable_path=ChromeDriverManager(
                chrome_type=ChromeType.CHROMIUM
            ).install()
        )
        return driver_selected
    if browser_name == "Opera":
        driver_selected = webdriver.Opera(
            executable_path=OperaDriverManager().install()
        )
        return driver_selected
    if browser_name == "Edge":
        driver_selected = webdriver.Edge(EdgeChromiumDriverManager().install())
        return driver_selected
    if browser_name == "IE":
        # version issue observed for IE
        driver_selected = webdriver.Ie(IEDriverManager().install())
        return driver_selected
    # if no match found run chrome
    driver_selected = webdriver.Chrome(executable_path=ChromeDriverManager().install())
    return driver_selected


def quit_browser():
    """to close browser instance"""
    DRIVER.quit()


def wait_function(element_locator):
    """waits till the condition mentioned is fulfilled"""
    time_out_error_message = "Element not found"
    WebDriverWait(DRIVER, 20).until(element_locator, message=time_out_error_message)


def random_alpha_numeric():
    """generates random alphabet and numeric combination text"""
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for _ in range(5):
        text += possible[math.floor(random.random() * len(possible))]

    return text


def random_numeric(input_variable):
    """generates random numeric text"""
    text = ""
    possible = "0123456789"

    for _ in range(input_variable):
        text += possible[(math.floor(random.random() * len(possible)))]

    return text


def random_numeric_for_list_view(input_variable):
    """generates random numeric for list"""
    text = ""
    possible = "23456789"

    for _ in range(input_variable):
        text += possible[(math.floor(random.random() * len(possible)))]

    return text


def random_longitude():
    """generates random numeric value as per longitude format"""
    text = ""
    possible = "0123456789"
    number = ""
    length = 4
    number += possible[(math.floor(random.random() * length))]

    text += math.floor(random.random() * (180 - -180)) + "." + number
    return text


def random_latitude():
    """generates random numeric value as per latitude format"""
    text = ""
    possible = "0123456789"
    number = ""
    length = 4

    number += possible[(math.floor(random.random() * length))]
    text += math.floor(random.random() * (90 - -90)) + "." + number
    return text


def validate_equal_values(actual_value, expected_value):
    """validate expected and actual values provided are equal"""
    assert_that(actual_value, equal_to(expected_value))


# Administrative
def user_clicks_on_side_menu(text):
    """to click on administrative side menu"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.side_menu." + text))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements.side_menu." + text)
    ).click()


# Note template


def note_template_list_view_validation():
    """validating note template list view is displayed"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_template.create"))
        )
    )
    add_note_template_button = DRIVER.find_element_by_css_selector(
        get_element("elements.note_template.create")
    ).get_attribute("disabled")
    validate_equal_values(add_note_template_button, None)


# Note editor


def user_enters_text_in_editor():
    """enters text in editor"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_editor.body"))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(get_config_data("note_editor.starting_text"))
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(Keys.ENTER)


def note_editor_mark_button(text):
    """clicks on button specified in text - B/I/U/$/H1/H2/H3/ numbered or bullet list"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_editor." + text + "_button"))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor." + text + "_button")
    ).click()


def user_enters_text_validation(text):
    """enters text to validate - B/I/U/$/H1/H2/H3"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_editor.body"))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(get_config_data("note_editor." + text + "_text"))
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).send_keys(Keys.ENTER)


def vaidation_text(text):
    """validate text entered for - B/I/U/$/H1/H2/H3"""
    wait_function(
        ec.element_to_be_clickable(
            (
                By.CSS_SELECTOR,
                get_element("elements.note_editor." + text + "_validation"),
            )
        )
    )
    validation_text = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor." + text + "_validation")
    ).get_attribute("innerText")
    validate_equal_values(
        validation_text, get_config_data("note_editor." + text + "_text")
    )


def user_enters_text_list_validation(text):
    """enters text for numbered or bullet list"""
    wait_function(
        ec.element_to_be_clickable(
            (By.CSS_SELECTOR, get_element("elements.note_editor.body"))
        )
    )
    expected_text_array = get_config_data("note_editor." + text + "_text")
    for i in expected_text_array:
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.body")
        ).send_keys(i)
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.body")
        ).send_keys(Keys.ENTER)


def list_vaidation_text(text):
    """validate text entered for numbered or bullet list"""
    wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.note_editor." + text + "_validation"),
            )
        )
    )
    list_validation_text = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor." + text + "_validation")
    ).get_attribute("innerText")
    list_validation_array = list_validation_text.split("\n")
    validate_equal_values(
        list_validation_array, get_config_data("note_editor." + text + "_text")
    )


def enters_search_for_no_data():
    """enters text which does not exists in note"""
    wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.note_editor.search_field"))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.search_field")
    ).send_keys(get_config_data("util.search_keyword_with_no_data"))


def search_keyword_not_found():
    """search text to validate no data state in editor search"""
    entire_note_text = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).get_attribute("innerText")
    entire_note_text.lower()
    text_to_be_searched = get_config_data("util.search_keyword_with_no_data").lower()
    assert_that(entire_note_text, is_not(contains_string(text_to_be_searched)))


def navigation_arrows_disabled():
    """validating search arrows are disabled"""
    up_arrow = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.search_up_arrow")
    ).get_attribute("disabled")
    validate_equal_values(up_arrow, "true")
    down_arrow = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.search_down_arrow")
    ).get_attribute("disabled")
    validate_equal_values(down_arrow, "true")


def enters_search_keyword():
    """enters text that exists in note"""
    wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.note_editor.search_field"))
        )
    )
    search_field = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.search_field")
    )
    search_field.send_keys(Keys.CONTROL, "a")
    search_field.send_keys(Keys.BACKSPACE)
    search_field.send_keys(get_config_data("note_editor.search_keyword"))


def search_validation():
    """validate search text is highlighted in editor search"""
    entire_note_text = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).get_attribute("innerText")
    entire_note_text.lower()
    text_to_be_searched = get_config_data("note_editor.search_keyword").lower()
    assert_that(entire_note_text, contains_string(text_to_be_searched))
    global NUMBER_OF_MATCH_FOUND
    NUMBER_OF_MATCH_FOUND = entire_note_text.count(text_to_be_searched)
    wait_function(
        ec.visibility_of_element_located(
            (
                By.CSS_SELECTOR,
                get_element("elements.note_editor.search_found_highlight"),
            )
        )
    )
    actual_text = DRIVER.find_elements_by_css_selector(
        get_element("elements.note_editor.search_found_highlight")
    )
    validate_equal_values(len(actual_text), NUMBER_OF_MATCH_FOUND)
    for i in range(NUMBER_OF_MATCH_FOUND - 1):
        validate_equal_values(actual_text[i].text, text_to_be_searched)


def validate_navigating_arrows_for_search():
    """validating able to navigate with search arrow keys"""
    # this is the bug that if we click arrow up for the first time,
    # it goes to the very first occurance
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.search_up_arrow")
    ).click()
    for _ in range(NUMBER_OF_MATCH_FOUND):
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.search_down_arrow")
        ).click()
    for _ in range(NUMBER_OF_MATCH_FOUND):
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.search_up_arrow")
        ).click()


def when_mandatory_fields_not_present_count_validation():
    """validating mandatory field count when no mandatory fields are present"""
    actual_count_of_mandatory_fields = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.mandatory_field_length")
    ).get_attribute("innerText")
    # count should be zero
    validate_equal_values(int(actual_count_of_mandatory_fields), 0)


def navigation_arrows_for_mandatory_disabled():
    """validating mandatory field arrows are disabled when no mandatory fields are present"""
    up_arrow_mandatory = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.mandatory_field_up_arrow")
    ).get_attribute("disabled")
    validate_equal_values(up_arrow_mandatory, "true")
    down_arrow_mandatory = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.mandatory_field_down_arrow")
    ).get_attribute("disabled")
    validate_equal_values(down_arrow_mandatory, "true")


def enters_mandatory_fields_in_note_editor():
    """enter mandatory fields in note"""
    DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    ).click()
    global EXPECTED_COUNT_OF_MANDATORY_FIELDS
    EXPECTED_COUNT_OF_MANDATORY_FIELDS = get_config_data(
        "note_editor.number_of_mandatory_fields"
    )
    note_editor_body = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    )
    note_editor_body.send_keys(Keys.PAGE_DOWN)
    for _ in range(EXPECTED_COUNT_OF_MANDATORY_FIELDS):
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.body")
        ).send_keys(get_config_data("note_editor.mandatory_field_pattern"))
        note_editor_body.send_keys(Keys.ENTER)


def count_of_mandatory_fields_validation():
    """validate mandatory field count value"""
    actual_count_of_mandatory_fields = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.mandatory_field_length")
    ).get_attribute("innerText")
    validate_equal_values(
        EXPECTED_COUNT_OF_MANDATORY_FIELDS, int(actual_count_of_mandatory_fields)
    )


def validate_navigating_arrows_for_mandatory_fields():
    """validating able to navigate with mandatory field arrow keys"""
    for _ in range(EXPECTED_COUNT_OF_MANDATORY_FIELDS):
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.mandatory_field_up_arrow")
        ).click()
    for _ in range(EXPECTED_COUNT_OF_MANDATORY_FIELDS - 1):
        DRIVER.find_element_by_css_selector(
            get_element("elements.note_editor.mandatory_field_down_arrow")
        ).click()


def validate_navigating_keys_for_mandatory_fields():
    """validating able to navigate with mandatory field shortcut keys"""
    note_editor_body = DRIVER.find_element_by_css_selector(
        get_element("elements.note_editor.body")
    )
    note_editor_body.click()
    note_editor_body.send_keys(Keys.PAGE_UP)
    for _ in range(EXPECTED_COUNT_OF_MANDATORY_FIELDS):
        note_editor_body.send_keys(Keys.F2)
    for _ in range(EXPECTED_COUNT_OF_MANDATORY_FIELDS - 1):
        note_editor_body.send_keys(Keys.F3)


# list view
def no_result_found_validation(text):
    """validating search of list view when no match found"""
    # with debounce, search requires 2 to 3 second to get the result
    time.sleep(3)
    actual_no_data_text = DRIVER.find_element_by_xpath(
        get_element("elements." + text + ".search_no_data")
    ).get_attribute("innerText")
    validate_equal_values(
        actual_no_data_text,
        get_constant_data("error_message." + text + ".no_data_text_" + text),
    )


def search_with_no_result(text):
    """search with keyword that does not exists in records"""
    wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements." + text + ".search_list_view"))
        )
    )
    global PAGE_NUMBER_COUNT
    PAGE_NUMBER_COUNT = DRIVER.find_element_by_xpath(
        get_element("elements." + text + ".page_number_count")
    ).get_attribute("innerText")
    DRIVER.find_element_by_css_selector(
        get_element("elements." + text + ".search_list_view")
    ).send_keys(get_config_data("util.search_keyword_with_no_data"))


def clear_search(text):
    """clear the search field"""
    search_field = DRIVER.find_element_by_css_selector(
        get_element("elements." + text + ".search_list_view")
    )
    search_field.send_keys(Keys.CONTROL, "a")
    search_field.send_keys(Keys.BACKSPACE)
    # with debounce, search requires 2 to 3 second to get the result
    time.sleep(3)


def after_clear_search_validation(text):
    """validating after clearing the search, all records are displayed"""
    after_clear_search_page_count = DRIVER.find_element_by_xpath(
        get_element("elements." + text + ".page_number_count")
    ).get_attribute("innerText")
    validate_equal_values(after_clear_search_page_count, PAGE_NUMBER_COUNT)


def search_with_keyword(text):
    """search with keyword that exists in records"""
    wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements." + text + ".search_list_view"))
        )
    )
    DRIVER.find_element_by_css_selector(
        get_element("elements." + text + ".search_list_view")
    ).send_keys(get_config_data(text + ".search_keyword"))


def search_result_validation(text):
    """validate search result is displayed as per the keyword entered"""
    # with debounce, search requires 2 to 3 second to get the result
    time.sleep(3)
    after_search_page_count = DRIVER.find_element_by_xpath(
        get_element("elements." + text + ".page_number_count")
    ).get_attribute("innerText")
    for _ in range(1, int(after_search_page_count)):
        all_records = DRIVER.find_element_by_xpath(
            get_element("elements." + text + ".table_all_records")
        ).get_attribute("innerText")
        search_keyword = get_config_data(text + ".search_keyword")
        # converting and removing unnecessary details of table
        all_records_array = all_records.split("\n")
        del all_records_array[0:10]
        for i in range(2):
            record_array = all_records_array[i].split("\t")
            del record_array[2:]
            record_array[0] = record_array[0].lower()
            record_array[1] = record_array[1].lower()
            search_keyword.lower()
            actual_data = record_array[0] + record_array[1]
            assert_that(actual_data, contains_string(search_keyword))
        DRIVER.find_element_by_xpath(
            get_element("elements." + text + ".next_page")
        ).click()
        # adding sleep till next page records are displayed
        time.sleep(1)


def number_of_records_validation(text):
    """validate number of records per page are displayed as per the option selected"""
    # closing patient master for no of page element to be uniquely identified
    if text != "patient":
        DRIVER.find_element_by_css_selector(
            get_element("elements.util.remove_tab")
        ).click()
    records_per_page_options = get_constant_data(text + ".records_per_page_value")
    total_number_of_records = DRIVER.find_element_by_xpath(
        get_element("elements." + text + ".total_number_of_records")
    ).text
    # spliting the array to get the count. ex: ['Total', '219', 'item(s)']
    total_number_of_records = total_number_of_records.split(" ")
    for i in records_per_page_options:
        DRIVER.find_element_by_xpath(
            get_element("elements." + text + ".records_per_page")
        ).click()
        wait_function(
            ec.visibility_of_element_located(
                (By.CSS_SELECTOR, "[title='" + i + " / page']")
            )
        )
        DRIVER.find_element_by_css_selector("[title='" + i + " / page']").click()
        # adding sleep to update the records as per option selected
        time.sleep(1)
        expected_number_of_pages = math.ceil(int(total_number_of_records[1]) / int(i))
        actual_number_of_pages = DRIVER.find_element_by_xpath(
            get_element("elements." + text + ".page_number_count")
        ).text
        validate_equal_values(int(actual_number_of_pages), expected_number_of_pages)


def clicks_on_random_record_note_template():
    """click on any record of list view of note template"""
    global RECORD_DATA
    record_selected = DRIVER.find_element_by_xpath(
        get_element("elements.note_template.table_all_records")
        + "/tr["
        + random_numeric_for_list_view(1)
        + "]/td[1]"
    )
    RECORD_DATA = record_selected.get_attribute("innerText")
    record_selected.click()


def detail_view_validation_for_list(text):
    """validate detail view of record is displayed when clicked on the record"""
    # to load the data
    time.sleep(3)
    detail_view_data = DRIVER.find_element_by_css_selector(
        get_element("elements." + text + ".record_validation_detail_view")
    ).text
    validate_equal_values(RECORD_DATA, detail_view_data)


# Patient
def patient_list_view_validation():
    """validating patient list view is displayed"""
    wait_function(
        ec.visibility_of_element_located(
            (By.CSS_SELECTOR, get_element("elements.patient.search_list_view"))
        )
    )


def clicks_on_random_record_patient():
    """click on any record of list view of patient"""
    global RECORD_DATA
    record_selected = DRIVER.find_element_by_xpath(
        get_element("elements.patient.table_all_records")
        + "/tr["
        + random_numeric_for_list_view(1)
        + "]/td[2]"
    )
    RECORD_DATA = record_selected.get_attribute("innerText")
    record_selected.click()
