*** Keywords ***
User right clicks on ${text} side menu
    user_right_clicks_on_side_menu  ${text}

User clicks on open to the side
    clicks_on_open_on_side

User clicks on open to the ${side_number} side for ${text}
    open_on_side  ${text}  ${side_number}

Tab with title ${text} is open on ${side_number} side
    validate_open_on_side  ${text}  ${side_number}
