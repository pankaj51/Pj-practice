*** Keywords ***

Open the browser
    [Arguments]  ${browser}
    start_browser  ${browser}

User on Houseworks page 
    login.title

User enter correct username in username field
    login.enter_correct_username

User enter the correct password
    login.enter_correct_password

User should see Dashboard
    login.dashboard

Close the browser
    util.quit_browser

# Administrative

User clicks on ${text} side menu
    user_clicks_on_side_menu  ${text}

# Note template

Note template list view should be displayed
    note_template_list_view_validation

# Note editor

User enters text in the start
    user_enters_text_in_editor

User clicks on ${text} formatter
    note_editor_mark_button  ${text}

User enters text for ${text} formatter validation
    user_enters_text_validation  ${text}

Text should be displayed in ${text}
    vaidation_text  ${text}

User enters list for ${text} formatter validation
    user_enters_text_list_validation  ${text}

List should be displayed in ${text} format
    list_vaidation_text  ${text}

User enters search keyword for no data
    enters_search_for_no_data

Search keyword should not be found
    search_keyword_not_found

Navigation arrows should be disabled
    navigation_arrows_disabled

Search keyword entered
    enters_search_keyword

Search keyword should be found
    search_validation

User should be able to navigate with search arrows
    validate_navigating_arrows_for_search

Count of the mandatory fields should be zero
    when_mandatory_fields_not_present_count_validation

User should not be able to navigate with mandatory field's arrows
    navigation_arrows_for_mandatory_disabled

Enters mandatory fields
    enters_mandatory_fields_in_note_editor

Count of the mandatory fields should be as expected
    count_of_mandatory_fields_validation

User should be able to navigate with mandatory field's arrows
    validate_navigating_arrows_for_mandatory_fields

User should be able to navigate with shortcut function keys F2 and F3
    validate_navigating_keys_for_mandatory_fields

# list view
User searches with keyword which does not exists for ${text}
    search_with_no_result  ${text}

No result should be found for ${text}
    no_result_found_validation  ${text}

User clears the search of ${text}
    clear_search  ${text}

All the records should be displayed for ${text}
    after_clear_search_validation  ${text}

User searches with keyword for ${text}
    search_with_keyword  ${text}

All the records containing the keyword should be displayed for ${text}
    search_result_validation  ${text}

Number of records and pages should be displayed as per option selected for ${text}
    number_of_records_validation  ${text}

User click on any record note template
    clicks_on_random_record_note_template

Detail view of that record should be displayed for ${text}
    detail_view_validation_for_list  ${text}

# Patient

Patient list view should be displayed
    patient_list_view_validation

User click on any record patient
    clicks_on_random_record_patient
