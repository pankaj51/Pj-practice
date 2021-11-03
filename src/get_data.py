"""imports"""
import json
import jsonpath


def get_config_data(location_name):
    """to access the config value using the jsonpath provided"""
    file_path = open("./config/config.json", "r", encoding="UTF-8")
    response = json.loads(file_path.read())
    value = jsonpath.jsonpath(response, location_name)
    file_path.close()
    return value[0]


def get_element(location_name):
    """to access the element using the jsonpath provided"""
    file_path = open("./config/element.json", "r", encoding="UTF-8")
    response = json.loads(file_path.read())
    value = jsonpath.jsonpath(response, location_name)
    file_path.close()
    return value[0]


def get_constant_data(location_name):
    """to access the constane value using the jsonpath provided"""
    file_path = open("./config/constant.json", "r", encoding="UTF-8")
    response = json.loads(file_path.read())
    value = jsonpath.jsonpath(response, location_name)
    file_path.close()
    return value[0]
