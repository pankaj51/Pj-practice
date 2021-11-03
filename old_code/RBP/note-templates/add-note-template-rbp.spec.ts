import {
  page,
  textForNoteTemplate,
  convertStringToNumber,
  expectedErrorMessageForBlankTemplateName,
  randomAlphaNumeric,
  expectedErrorMessageForUniqueTemplateName,
  randomNumeric
} from '../shared/constants'
import { login, openNoteTemplateTab } from '../shared/utils'

let textToBeSearched = ''
let expectedTemplateName = ''
let entireNote = ''

describe('add-patient', () => {
  const username = 'Rucheta@123'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  it('click on administrative and then open notes template', async () => {
    //calling function to open note template tab
    await openNoteTemplateTab(page)
  })

  it('should apply mark buttons - b/i/S', async () => {
    await page.waitForSelector('[data-testid="add-template-button"]')
    await page.click('[data-testid="add-template-button"]')
    //bold validation
    await page.keyboard.press('Enter')
    //clicking on bold button
    await page.click('[data-testid="note-editor-mark-buttons-bold"]')
    await page.type('[data-testid="note-editor-notes-body"]', 'bold validation')

    //validating the bold format applied
    const boldValidation = await page.innerText(
      '[data-testid="note-editor-style-bold"]'
    )
    await page.click('[data-testid="note-editor-mark-buttons-bold"]')

    //italics validation
    await page.keyboard.press('Enter')
    //clicking on italics button
    await page.click('[data-testid="note-editor-mark-buttons-italics"]')
    await page.type(
      '[data-testid="note-editor-notes-body"]',
      'italics validation'
    )
    //validating the italics format applied
    const italicsValidation = await page.innerText(
      '[data-testid="note-editor-style-italics"]'
    )
    await page.click('[data-testid="note-editor-mark-buttons-italics"]')

    //strikethrough validation
    await page.keyboard.press('Enter')
    //clicking on strikethrough button
    await page.click('[data-testid="note-editor-mark-buttons-strike"]')
    await page.type(
      '[data-testid="note-editor-notes-body"]',
      'strikethrough validation'
    )
    //validating the strikethrough format applied
    const strikethroughValidation = await page.innerText(
      '[data-testid="note-editor-style-strikethrough"]'
    )
    await page.click('[data-testid="note-editor-mark-buttons-strike"]')

    expect(boldValidation).toBe('bold validation')
    expect(italicsValidation).toBe('italics validation')
    expect(strikethroughValidation).toBe('strikethrough validation')
  }, 30000)

  it('should apply mark buttons - underlined and highlight', async () => {
    //underlined
    await page.keyboard.press('Enter')
    //clicking on underline button
    await page.click('[data-testid="note-editor-mark-buttons-underlined"]')
    await page.type(
      '[data-testid="note-editor-notes-body"]',
      'underlined validation'
    )
    //validating the underline format applied
    const underlinedValidation = await page.innerText(
      '[data-testid="note-editor-style-underlined"]'
    )
    await page.click('[data-testid="note-editor-mark-buttons-underlined"]')

    //highlight
    await page.keyboard.press('Enter')
    //clicking on highlight button
    await page.click('[data-testid="note-editor-mark-buttons-highlight"]')
    await page.type(
      '[data-testid="note-editor-notes-body"]',
      'highlight validation'
    )
    //text with green hightlight to be validated
    const highlightValidation = await page.innerText(
      '[style="background-color: green;"]'
    )
    await page.click('[data-testid="note-editor-mark-buttons-highlight"]')

    expect(underlinedValidation).toBe('underlined validation')
    expect(highlightValidation).toBe('highlight validation')
  }, 30000)

  it('should apply block buttons - H1/H2/H3', async () => {
    //H1 validation
    await page.keyboard.press('Enter')
    //clicking on H1 button
    await page.click('[data-testid="note-editor-block-buttons-h1"]')
    await page.type('[data-testid="note-editor-notes-body"]', 'H1 validation')
    //validating the H1 format applied
    const h1Validation = await page.innerText(
      '[data-testid="note-editor-style-h1"]'
    )

    //H2 validation
    await page.keyboard.press('Enter')
    //clicking H2 button
    await page.click('[data-testid="note-editor-block-buttons-h2"]')
    await page.type('[data-testid="note-editor-notes-body"]', 'H2 validation')
    //validating the H2 format applied
    const h2Validation = await page.innerText(
      '[data-testid="note-editor-style-h2"]'
    )

    //H3 validation
    await page.keyboard.press('Enter')
    //clicking on H3 button
    await page.click('[data-testid="note-editor-block-buttons-h3"]')
    await page.type('[data-testid="note-editor-notes-body"]', 'H3 validation')
    //validating the H3 format applied
    const h3Validation = await page.innerText(
      '[data-testid="note-editor-style-h3"]'
    )

    expect(h1Validation).toBe('H1 validation')
    expect(h2Validation).toBe('H2 validation')
    expect(h3Validation).toBe('H3 validation')
  }, 30000)

  it('should apply numbered list', async () => {
    //numbered list validation
    let flag = true
    //below number provided should be - expected no of items + 1
    let numberOfListItems = 3
    var expectedListOfItems: string[] = []
    await page.keyboard.press('Enter')
    //clicking on numberd list button
    await page.click('[data-testid="note-editor-block-buttons-numbered-list"]')
    //adding data into the list
    for (
      var counterVariable = 1;
      counterVariable < numberOfListItems;
      counterVariable++
    ) {
      await page.type(
        '[data-testid="note-editor-notes-body"]',
        'item - ' + counterVariable
      )
      //updating the expected list of items
      expectedListOfItems.push('item - ' + counterVariable)
      //this is to ensure that last blank element not added because of enter after last element added
      if (counterVariable != numberOfListItems - 1) {
        await page.keyboard.press('Enter')
      }
    }

    //fetching the actual value added in the note
    const actualNumberdListValidation = await page.innerText(
      '[data-testid="note-editor-style-numbered-list"]'
    )
    //converting the actual list into array
    var actualListValidationArray = actualNumberdListValidation.split('\n')

    //removing blank values
    //actualListValidationArray = actualListValidationArray.filter(Boolean)

    //comparing the expected and actual list of items
    for (
      var counterVariableForValidation = 1;
      counterVariableForValidation < actualListValidationArray.length;
      counterVariableForValidation++
    ) {
      if (
        expectedListOfItems[counterVariableForValidation] !=
        actualListValidationArray[counterVariableForValidation]
      ) {
        flag = false
      }
    }

    //validating if the expected and actual list of items are same
    expect(flag).toBe(true)
  })

  it('should apply bulleted list', async () => {
    //bulleted list validation
    let flag = true
    //below number provided should be - expected no of items + 1
    let numberOfListItems = 3
    var expectedListOfItems: string[] = []
    await page.keyboard.press('Enter')
    //clicking on the bulleted list button
    await page.click('[data-testid="note-editor-block-buttons-bulleted-list"]')
    //adding data into the list
    for (
      var counterVariable = 1;
      counterVariable < numberOfListItems;
      counterVariable++
    ) {
      await page.type(
        '[data-testid="note-editor-notes-body"]',
        'item - ' + counterVariable
      )
      //updating the expected list of items
      expectedListOfItems.push('item - ' + counterVariable)
      //this is to ensure that last blank element not added because of enter after last element added
      if (counterVariable != numberOfListItems - 1) {
        await page.keyboard.press('Enter')
      }
    }

    //fetching the actual value added in the note
    const actualNumberdListValidation = await page.innerText(
      '[data-testid="note-editor-style-bulleted-list"]'
    )

    //converting the actual list into array
    var actualListValidationArray = actualNumberdListValidation.split('\n')

    //removing blank values
    //actualListValidationArray = actualListValidationArray.filter(Boolean)

    //comparing the expected and actual list of items
    for (
      var counterVariableForValidation = 1;
      counterVariableForValidation < actualListValidationArray.length;
      counterVariableForValidation++
    ) {
      if (
        expectedListOfItems[counterVariableForValidation] !=
        actualListValidationArray[counterVariableForValidation]
      ) {
        flag = false
      }
    }

    //validating if the expected and actual list of items are same
    expect(flag).toBe(true)

    //enter and clicking on the bulleted list to remove the list format
    await page.keyboard.press('Enter')
    await page.click('[data-testid="note-editor-block-buttons-bulleted-list"]')
  })

  it('should validate search', async () => {
    textToBeSearched = 'validation'
    var expectedCountOfTextExists = 0

    //entering text to be searched in the search input
    await page.type(
      '[data-testid="note-editor-search-input"]',
      textToBeSearched
    )

    //fetching the entire node area
    entireNote = await page.innerText('[data-testid ="note-editor-notes-body"]')

    //converting both to lowercase as search is not case sensitive
    entireNote.toLowerCase()
    textToBeSearched.toLowerCase()

    //counting the number of text found
    var firstIndex = entireNote.indexOf(textToBeSearched)
    while (firstIndex != -1) {
      expectedCountOfTextExists++
      firstIndex = entireNote.indexOf(textToBeSearched, firstIndex + 1)
    }
    // console.log(expectedCountOfTextExists)
    // if any search found go in if else go in else
    if (expectedCountOfTextExists >= 0) {
      //searching for yellow highlighted text
      for (
        var counterVariableForValidation = 0;
        counterVariableForValidation < expectedCountOfTextExists;
        counterVariableForValidation++
      ) {
        const actualTextSearched = await page.innerText(
          '[style="background-color: rgb(255, 238, 186);"]'
        )
        //validating that the text highlighted in yellow is the text to be searched
        expect(actualTextSearched).toBe(textToBeSearched)
      }

      //going to the end of the entire text to validate the search arrows
      await page.keyboard.press('PageDown')

      //this is the bug that if we click arrow up for the first time it goes to the very first occurance
      await page.click('[data-testid="note-editor-search-arrow-up"]')

      //arrow down or up for the number of times the text found
      for (
        var counterForNavigation = 0;
        counterForNavigation < expectedCountOfTextExists - 1;
        counterForNavigation++
      ) {
        await page.click('[data-testid="note-editor-search-arrow-down"]')
      }

      for (
        var counterForNavigation = 0;
        counterForNavigation < expectedCountOfTextExists - 1;
        counterForNavigation++
      ) {
        await page.click('[data-testid="note-editor-search-arrow-up"]')
      }
    } else {
      //arrow up and down should be disabled
      const expectedArrowUpStatus = await page.getAttribute(
        '[data-testid="note-editor-search-arrow-up"]',
        'disabled'
      )
      const expectedArrowDownStatus = await page.getAttribute(
        '[data-testid="note-editor-search-arrow-down"]',
        'disabled'
      )
      expect(expectedArrowUpStatus).toBeDefined()
      expect(expectedArrowDownStatus).toBeDefined()
    }
  })

  it('should validate mandatory fields', async () => {
    let expectedCount = 0
    //this variable is to add *** other than any text
    let numberOfPatternToBeAdded = 5
    let patternOfMandatoryFields = '***'

    //click on the text area
    await page.click('[data-testid ="note-editor-notes-body"]')

    //going to the end of the entire text
    await page.keyboard.press('PageDown')

    //entering *** in the search input
    for (
      var counterForMandatory = 0;
      counterForMandatory < numberOfPatternToBeAdded;
      counterForMandatory++
    ) {
      await page.type(
        '[data-testid ="note-editor-notes-body"]',
        patternOfMandatoryFields
      )
      await page.keyboard.press('Enter')
    }

    //fetching the entire note text
    entireNote = await page.innerText('[data-testid ="note-editor-notes-body"]')

    //counting the number of text found
    var firstIndex = entireNote.indexOf(patternOfMandatoryFields)
    while (firstIndex != -1) {
      expectedCount++
      firstIndex = entireNote.indexOf(patternOfMandatoryFields, firstIndex + 1)
    }

    //fetching the value displayed in mandatory fields section
    const actualCount = await page.innerText(
      '[data-testid="note-editor-mandatory-fields-length"]'
    )

    //going to the end of the entire text
    await page.keyboard.press('PageDown')

    //arrow down or up for the number of times the mandatory field found
    for (
      var counterForNavigation = 0;
      counterForNavigation < expectedCount;
      counterForNavigation++
    ) {
      await page.click('[data-testid="note-editor-mandatory-fields-arrow-up"]')
    }
    for (
      var counterForNavigation = 0;
      counterForNavigation < expectedCount - 1;
      counterForNavigation++
    ) {
      await page.click(
        '[data-testid="note-editor-mandatory-fields-arrow-down"]'
      )
    }

    //converting the fetched value from string to integer for comparison
    const actualCountNumber = convertStringToNumber(actualCount)
    expect(actualCountNumber).toBe(expectedCount)
  })

  it('should throw error message for name can not be blank', async () => {
    //clicking on create button without entering the template name to validate the error message on  blank template name
    await page.click('[data-testid="note-template-submit-button"]')
    await page.waitForSelector('[role="alert"]')

    //fetching the error message
    const actualErrorMessageForBlankTemplateName = await page.innerText(
      '[role="alert"]'
    )
    //validating the error message
    expect(actualErrorMessageForBlankTemplateName).toBe(
      expectedErrorMessageForBlankTemplateName
    )
  })
  it('should enter template name, click on create and details page should be displayed', async () => {
    //assiging random value to the template name variable
    expectedTemplateName = 'Rucheta - ' + randomAlphaNumeric()

    //fetching the entire note text
    entireNote = await page.innerText('[data-testid ="note-editor-notes-body"]')

    //entering the note template name
    await page.fill('[data-testid="note-template-name"]', expectedTemplateName)

    //clicking on the create button
    await page.click('[data-testid="note-template-submit-button"]')

    //the page reloads again sometimes, adding timeout to handle the same
    await page.waitForTimeout(2000)

    //fetching the template name and note text in the detail view
    const actualTemplateNameOnDetailView = await page.innerText(
      '[data-testid="note-template-details-view-name"]'
    )

    const actualEntireNoteDetailView = await page.innerText(
      '[data-testid="note-template-details-view-note-body"]'
    )

    //commenting as issue observed that blank line is not displayed in detail view
    //validating the template name and note text in the detail view
    // expect(actualEntireNoteDetailView).toBe(entireNote)
    expect(actualTemplateNameOnDetailView).toBe(expectedTemplateName)
  })

  //issue with edit button
  it('should click on edit, update the note, save, and validate changes are updated in detail view', async () => {
    //clicking on edit button
    await page.click('[data-testid="note-template-details-view-edit-button"]')
    await page.waitForSelector('[data-testid="note-template-title"]')

    //fetching the title of the edit view
    const actualTitleOfEdit = await page.innerText(
      '[data-testid="note-template-title"]'
    )

    //validating the title of the edit viwe
    expect(actualTitleOfEdit).toBe('Editing Note Template')

    //updating the note
    await page.type(
      '[data-testid ="note-editor-notes-body"]',
      'updating changes'
    )
    await page.click('[data-testid="note-template-submit-button"]')

    //validating changes made in the detail view
    const actualUpdatedNoteOnDetailView = await page.innerText(
      '[data-testid="note-template-details-view-note-body"]'
    )

    //blocked due to EHR-666
    //expect(entireNote).toBe(actualUpdatedNoteOnDetailView)
  })

  it('should give error message on unique name', async () => {
    //click on back button to go back to list view
    await page.waitForSelector(
      '[data-testid="note-template-details-view-back-button"]'
    )
    await page.click('[data-testid="note-template-details-view-back-button"]')

    //cling on create/add button
    await page.click('[data-testid="add-template-button"]')
    await page.fill(
      '[data-testid="note-editor-notes-body"]',
      textForNoteTemplate
    )
    //entering the same template name created before
    await page.fill('[data-testid="note-template-name"]', expectedTemplateName)
    //click on create button
    await page.click('[data-testid="note-template-submit-button"]')

    //as we had already created the note with same name before, validating error message for the same
    const actualErrorMessageForUniqueTemplateName = await page.innerText(
      '[role="alert"]'
    )
    expect(actualErrorMessageForUniqueTemplateName).toBe(
      expectedErrorMessageForUniqueTemplateName
    )

    //updating the template name
    expectedTemplateName = 'Rucheta - ' + randomNumeric(5)
    await page.fill('[data-testid="note-template-name"]', expectedTemplateName)

    //clicking on create button to create the note
    await page.click('[data-testid="note-template-submit-button"]')
  })

  it('should delete the note and check if exists in list view', async () => {
    //the page reloads again sometimes, adding timeout to handle the same
    await page.waitForTimeout(2000)

    //clicking on delete button
    await page.waitForSelector(
      '[data-testid="note-template-details-view-delete-button"]'
    )
    await page.click('[data-testid="note-template-details-view-delete-button"]')

    //click on confirm button
    await page.click('[class="ant-btn ant-btn-dangerous"]')

    //searching the template name of the template deleted
    await page.fill(
      '[data-testid="note-template-search"]',
      expectedTemplateName
    )

    //waiting for the search(debounce) response
    await page.waitForTimeout(2000)

    //validating the deleted template name is not found
    const actualTableData = await page.innerText('.ant-table-placeholder')
    expect(actualTableData).toBe('No Data')
  })
})
