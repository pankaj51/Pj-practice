*** Keywords ***

User is on login page
    title

User enters valid username
    enter_correct_username

User clicks on create button
    user_clicks_on_create

Note template create form should be displayed
    note_template_create_form_validation

User clicks on submit button
    clicks_on_submit

User should get error message on template name should not be blank
    error_message_on_blank_template_name_validation

User enters template name
    enters_template_name

Detail view page should be displayed with template name
    detail_view_name_validation

Note template detail view should be displayed
    detail_view_validation

User clicks on edit
    clicks_on_edit

User adds some text in note editor
    updates_text_in_note_editor

User clicks on save
    clicks_on_save

Changes made should be displayed in detail view
    changes_of_note_detail_view_validation

Note template edit form should be displayed
    note_template_edit_form_validation

User should click on back button
    clicks_on_back_button_from_detail

User enters template name which already exist
    enters_template_name_that_already_exists

User should get error message on template name should be unique
    unique_template_name_validation

User clears the template name field
    clears_template_name_field

User deletes the note template
    deletes_note_template

Search with same template name in list view
    search_with_deleted_note_template