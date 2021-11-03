import { page, randomNumeric, randomAlphaNumeric } from '../shared/constants'
import { expectedTitleDropDown } from './constants/constants'
import {
  login,
  createPatient,
  validateDetailViewPagePatient,
  expectedFirstName,
  expectedMiddleName,
  expectedLastName,
  expectedSuffix,
  expectedTitle,
  expectedSsn,
  expectedDob,
  openPatientTab
} from '../shared/utils'
import {
  expectedSuffixDropDown,
  expectedSexBiologicalDropDown,
  expectedSexualOrientationDropDown,
  expectedGenderIdentityDropDown,
  phoneNumberTypeDropDownTestIds,
  phoneNumberTypeDropDown,
  expectedMaritalStatusDropDown,
  expectedMaritalStatusTestIds,
  expectedEthnicityDropDown,
  expectedReligionDropDown,
  expectedRaceDropDown,
  expectedWorkStatusDropDown,
  expectedPreferredLanguageDropDown,
  expectedCountryDropDown,
  expectedErroMessageOnMandatoryFields
} from './constants/constants'
// import { it, expect } from '@playwright/test'

describe('demographics', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'

  //defining expected values
  let expectedSex: string = ''
  //let title = 'Prof.'
  let expectedMaritalStatus: string = ''
  let expectedGenderIdentity: string = ''
  let expectedSexualOrientation: string = ''
  const expectedPreviousFirstName: string = 'RP'
  const expectedPreviousLastName: string = 'GP'
  const expectedMothersMaidenFirstName: string = 'RM'
  const expectedMothersMaidenLastName: string = 'GM'
  const expectedCurrentAddressLine1: string = 'current address line 1'
  const expectedCurrentAddressLine2: string = 'current address line 2'
  const expectedCurrentAddressCity: string = 'current city'
  const expectedCurrentAddressStateCode: string = 'current state'
  let expectedCurrentAddressZipCode: string | null = ''
  let expectedCurrentAddressCountry: string = ''
  const expectedAlternateAddressLine1: string = 'alternate address line 1'
  const expectedAlternateAddressLine2: string = 'alternate address line 2'
  const expectedAlternateAddressCity: string = 'alternate city'
  const expectedAlternateAddressStateCode: string = 'alternate state'
  let expectedAlternateAddressZipCode: string | null = ''
  let expectedAlternateAddressCountry: string = ''
  let expectedPrimaryFacilityLocation: string = ''
  const expectedChartNumber: string = '7738615273'
  let expectedWorkStatus: string = ''
  let expectedEthnicity: string = ''
  let expectedReligion: string = ''
  let expectedRace: string = ''
  let expectedPreferredLanguages: string = ''
  let expectedReferralOrganization: string = ''
  let expectedReferralRemarks: string | null = ''
  const expectedExternalRegistrationNumber: string =
    'test External Registration Number'
  const expectedComments: string = 'test comments'
  let expectedPhoneNumberList = [['', '', '']]
  let expectedEmailList = ['']
  let expectedOrganizationList = [['', '']]

  //function to upload photo
  const uploadProfilePhoto = async () => {
    await page.setInputFiles(
      '[data-testid="demographics-upload-profile-photo-no-photo-uploaded"]',
      'sample-5.jpg'
    )
    await page.setInputFiles(
      '[data-testid="upload-ssn-photo-no-photo-uploaded"]',
      'sample-5.jpg'
    )
  }

  //function to fetch basic information
  //this function might take more than 15000 ms
  const fillBasicInformation = async () => {
    //updating blank/not selected values
    await page.click('[data-testid="demographics-marital-status"]')
    await page.click('[data-testid="divorced"]')

    await page.click('[data-testid="demographics-sex"]')
    await page.click('[data-testid="female"]')

    await page.click('[data-testid="demographics-gender-identity"]')
    await page.click('[data-testid="identifies_as_female"]')

    await page.click('[data-testid="demographics-sexual-orientation"]')
    await page.click('[data-testid="homosexual"]')

    await page.fill(
      '[data-testid="demographics-prev-first-name"]',
      expectedPreviousFirstName
    )
    await page.fill(
      '[data-testid="demographics-prev-last-name"]',
      expectedPreviousLastName
    )
    await page.fill(
      '[data-testid="demographics-mothers-maiden-first-name"]',
      expectedMothersMaidenFirstName
    )
    await page.fill(
      '[data-testid="demographics-mothers-maiden-last-name"]',
      expectedMothersMaidenLastName
    )
    //filling out current address section
    await page.fill(
      '[data-testid="demographics-curr-add-line1"]',
      expectedCurrentAddressLine1
    )
    await page.fill(
      '[data-testid="demographics-curr-add-line2"]',
      expectedCurrentAddressLine2
    )
    await page.fill(
      '[data-testid="demographics-curr-add-city"]',
      expectedCurrentAddressCity
    )
    await page.fill(
      '[data-testid="demographics-curr-add-state-code"]',
      expectedCurrentAddressStateCode
    )
    await page.fill(
      '[data-testid="demographics-curr-add-zip-code"]',
      randomNumeric(5)
    )

    await page.click('[data-testid="demographics-current-add-country"]')
    await page.type(
      '[data-testid="demographics-current-add-country"]',
      'Ukraine'
    )
    await page.click('[data-testid="ua"]')

    //check - have an alternate address checkbox
    await page.click('[data-testid="demographics-have-alt-address"]')

    //filling out alternate address section
    await page.waitForSelector('[data-testid="demographics-alt-add-line1"]')
    await page.fill(
      '[data-testid="demographics-alt-add-line1"]',
      expectedAlternateAddressLine1
    )
    await page.fill(
      '[data-testid="demographics-alt-add-line2"]',
      expectedAlternateAddressLine2
    )
    await page.fill(
      '[data-testid="demographics-alt-add-city"]',
      expectedAlternateAddressCity
    )
    await page.fill(
      '[data-testid="demographics-alt-add-state-code"]',
      expectedAlternateAddressStateCode
    )
    await page.fill(
      '[data-testid="demographics-alt-add-zip-code"]',
      randomNumeric(5)
    )
    await page.click('[data-testid="demographics-alternate-add-country"]')
    await page.type(
      '[data-testid="demographics-alternate-add-country"]',
      'Ukraine'
    )
    await page.click('(//*[@data-testid="ua"])[2]')
  }

  //function to change photo - ssn and profile
  const changePhoto = async () => {
    //this needs to be added as everytime any data is updated it takes time to load the data
    await page.waitForTimeout(5000)
    await page.waitForSelector('[data-testid="demographics-edit-button"]')
    await page.click('[data-testid="demographics-edit-button"]')
    await page.setInputFiles(
      '[data-testid="demographics-upload-profile-photo-change-button"]',
      'profilePhoto.PNG'
    )
    await page.setInputFiles(
      '[data-testid="upload-ssn-photo-change-button"]',
      'ssnCard.PNG'
    )

    await page.click('[data-testid="demographics-update-button"]')
    await page.waitForSelector('[data-testid="demographics-edit-button"]')
  }

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //opening add patient tab
  it('should open add patient tab', async () => {
    //calling function to open patients tab
    await openPatientTab(page)
  })

  //creating new patient
  it('should create new patient', async () => {
    //calling create patient function
    await createPatient(page)
  }, 30000)

  //detail tab should be displayed
  it('should display detail page', async () => {
    //calling function for detail view validation
    await validateDetailViewPagePatient(page)
  }, 60000)

  //edit patient demographics
  it('should autopopulate all the data as entered while creating', async () => {
    //clicking on edit button
    await page.click('[data-testid="demographics-edit-button"]')

    await page.waitForSelector('[data-testid="demographics-edit-title"]')

    //fetching all the data
    const actualTitleOfEdit = await page.innerText(
      '[data-testid="demographics-edit-title"]'
    )

    const actualEditTitleDropDown = await page.innerText(
      '[data-testid="demographics-title"]'
    )
    const actualEditSuffix = await page.innerText(
      '[data-testid="demographics-suffix"]'
    )
    const actualEditFirstName = await page.getAttribute(
      '[data-testid="demographics-first-name"]',
      'value'
    )
    const actualEditMiddleName = await page.getAttribute(
      '[data-testid="demographics-middle-name"]',
      'value'
    )
    const actualEditLastName = await page.getAttribute(
      '[data-testid="demographics-last-name"]',
      'value'
    )
    const actualEditDob = await page.getAttribute(
      '[data-testid="demographics-dob"]',
      'value'
    )
    const actualEditSsn = await page.getAttribute(
      '[data-testid="demographics-ssn"]',
      'value'
    )

    //validating all the data is as expected on edit view
    expect(actualTitleOfEdit).toBe('Edit Demographics')

    expect(actualEditTitleDropDown).toBe(expectedTitle)
    expect(actualEditSuffix).toBe(expectedSuffix)
    expect(actualEditFirstName).toBe(expectedFirstName)
    expect(actualEditMiddleName).toBe(expectedMiddleName)
    expect(actualEditLastName).toBe(expectedLastName)
    expect(actualEditDob).toBe(expectedDob)
    expect(actualEditSsn).toBe(expectedSsn)
    expect(
      await page.isChecked('[data-testid="demographics-have-alt-address"]')
    ).toBe(false)
  }, 30000)

  //validating the dropdown values and editing the demographics
  it('should validate dropdown values', async () => {
    let actualSuffixDropDownList,
      actualSexBiologicalDropDownList,
      actualSexualOrientationDropDown,
      actualGenderIdentityDropDown,
      actualEthnicityDropDown,
      actualReligionDropDown,
      actualRaceDropDown,
      actualPhoneNumberDropDown
    let actualSuffixDropDownListArray,
      actualSexBiologicalDropDownListArray,
      actualSexualOrientationDropDownArray,
      actualGenderIdentityDropDownArray,
      actualTitleDropDown,
      actualMaritalStatusDropDown

    let flagForSuffix = true
    let flagForSexBiological = true
    let flagForSexualOrientation = true
    let flagForGenderIdentity = true
    let flagForTitle = true
    let flagForMaritalStatus = true
    let flagForEthnicity = true
    let flagForReligion = true
    let flagForRace = true
    let flagForPhoneNumber = true

    let i = 0

    //suffix
    await page.click('[data-testid="demographics-suffix"]')
    actualSuffixDropDownList = await page.innerText(
      '[data-testid="demographics-suffix"] div[class="rc-virtual-list"]'
    )
    actualSuffixDropDownListArray = actualSuffixDropDownList.split('\n')

    for (
      var counterForSuffixDropDown = 0;
      counterForSuffixDropDown < expectedSuffixDropDown.length;
      counterForSuffixDropDown++
    ) {
      if (
        actualSuffixDropDownListArray[counterForSuffixDropDown] !=
        expectedSuffixDropDown[counterForSuffixDropDown]
      ) {
        flagForSuffix = false
      }
    }

    //sex biological
    await page.click('[data-testid="demographics-sex"]')
    actualSexBiologicalDropDownList = await page.innerText(
      '[data-testid="demographics-sex"] div[class="rc-virtual-list"]'
    )
    actualSexBiologicalDropDownListArray =
      actualSexBiologicalDropDownList.split('\n')

    for (
      var counterForSexBiologicalDropDown = 0;
      counterForSexBiologicalDropDown < expectedSexBiologicalDropDown.length;
      counterForSexBiologicalDropDown++
    ) {
      if (
        actualSexBiologicalDropDownListArray[counterForSexBiologicalDropDown] !=
        expectedSexBiologicalDropDown[counterForSexBiologicalDropDown]
      ) {
        flagForSexBiological = false
      }
    }

    //sexual orientation
    await page.click('[data-testid="demographics-sexual-orientation"]')
    actualSexualOrientationDropDown = await page.innerText(
      '[data-testid="demographics-sexual-orientation"] div[class="rc-virtual-list"]'
    )
    actualSexualOrientationDropDownArray =
      actualSexualOrientationDropDown.split('\n')

    for (
      var counterForSexualOrientationDropDown = 0;
      counterForSexualOrientationDropDown <
      expectedSexualOrientationDropDown.length;
      counterForSexualOrientationDropDown++
    ) {
      if (
        actualSexualOrientationDropDownArray[
          counterForSexualOrientationDropDown
        ] !=
        expectedSexualOrientationDropDown[counterForSexualOrientationDropDown]
      ) {
        flagForSexualOrientation = false
      }
    }

    //title
    // blocked due to EHR-382
    // i = 0
    // await page.click('[data-testid="demographics-title"]')
    // while (i < expectedTitleDropDown.length) {

    //   actualTitleDropDown = await page.innerText(
    //     '[data-testid="demographics-title"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
    //   )
    //   if (actualTitleDropDown != expectedTitleDropDown[i]) {
    //     flagForTitle = false
    //   }
    //   i += 1
    //   await page.keyboard.press('ArrowDown')
    // }

    // console.log(actualTitleDropDown)
    // console.log(expectedTitleDropDown)
    // console.log(flagForTitle)

    //marital status
    i = 0
    await page.click('[data-testid="demographics-marital-status"]')
    while (i < expectedMaritalStatusDropDown.length) {
      actualMaritalStatusDropDown = await page.innerText(
        '[data-testid="demographics-marital-status"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )

      if (actualMaritalStatusDropDown != expectedMaritalStatusDropDown[i]) {
        flagForMaritalStatus = false
        console.log(actualMaritalStatusDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //gender identity
    await page.click('[data-testid="demographics-gender-identity"]')
    actualGenderIdentityDropDown = await page.innerText(
      '[data-testid="demographics-gender-identity"] div[class="rc-virtual-list"]'
    )
    actualGenderIdentityDropDownArray = actualGenderIdentityDropDown.split('\n')

    for (
      var counterForGenderIdentity = 0;
      counterForGenderIdentity < expectedGenderIdentityDropDown.length;
      counterForGenderIdentity++
    ) {
      if (
        actualGenderIdentityDropDownArray[counterForGenderIdentity] !=
        expectedGenderIdentityDropDown[counterForGenderIdentity]
      ) {
        flagForGenderIdentity = false
      }
    }

    //ethnicity
    i = 0
    await page.click('[data-testid="demographics-ethnicity"]')
    while (i < expectedEthnicityDropDown.length) {
      actualEthnicityDropDown = await page.innerText(
        '[data-testid="demographics-ethnicity"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualEthnicityDropDown != expectedEthnicityDropDown[i]) {
        flagForEthnicity = false
        console.log(actualEthnicityDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //religion
    i = 0
    await page.click('[data-testid="demographics-religion"]')
    while (i < expectedReligionDropDown.length) {
      actualReligionDropDown = await page.innerText(
        '[data-testid="demographics-religion"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualReligionDropDown != expectedReligionDropDown[i]) {
        flagForReligion = false
        console.log(actualReligionDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //race
    i = 0
    await page.click('[data-testid="demographics-race"]')
    while (i < expectedRaceDropDown.length) {
      actualRaceDropDown = await page.innerText(
        '[data-testid="demographics-race"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualRaceDropDown != expectedRaceDropDown[i]) {
        flagForRace = false
        console.log(actualRaceDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //Phone number
    i = 0
    await page.click('[data-testid="demographics-phone-type"]')
    while (i < phoneNumberTypeDropDown.length) {
      actualPhoneNumberDropDown = await page.innerText(
        '[data-testid="demographics-phone-type"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualPhoneNumberDropDown != phoneNumberTypeDropDown[i]) {
        flagForPhoneNumber = false
        console.log(actualPhoneNumberDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    expect(flagForSuffix).toBe(true)
    expect(flagForSexBiological).toBe(true)
    expect(flagForSexualOrientation).toBe(true)
    expect(flagForTitle).toBe(true)
    expect(flagForMaritalStatus).toBe(true)
    expect(flagForGenderIdentity).toBe(true)
    expect(flagForEthnicity).toBe(true)
    expect(flagForReligion).toBe(true)
    expect(flagForRace).toBe(true)
    expect(flagForPhoneNumber).toBe(true)
  }, 90000)

  it('should validate dropdown - work status and preferred language', async () => {
    let actualPreferredLanguageDropDown, actualWorkStatusDropDown
    let flagForPreferredLanguage = true
    let flagForWorkStatus = true
    //preferred language
    let i = 0
    await page.click('[data-testid="demographics-pref-lang"]')
    while (i < expectedPreferredLanguageDropDown.length) {
      actualPreferredLanguageDropDown = await page.innerText(
        '[data-testid="demographics-pref-lang"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (
        actualPreferredLanguageDropDown != expectedPreferredLanguageDropDown[i]
      ) {
        flagForPreferredLanguage = false
        console.log(actualPreferredLanguageDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //work status
    i = 0
    await page.click('[data-testid="demographics-work-status"]')
    while (i < expectedWorkStatusDropDown.length) {
      actualWorkStatusDropDown = await page.innerText(
        '[data-testid="demographics-work-status"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualWorkStatusDropDown != expectedWorkStatusDropDown[i]) {
        flagForWorkStatus = false
        console.log(actualWorkStatusDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    expect(flagForPreferredLanguage).toBe(true)
    expect(flagForWorkStatus).toBe(true)
  }, 90000)

  it('should validate dropdown - country - current address', async () => {
    let actualCurrentAddressCountryDropDown
    let flagForCurrentAddressCountry = true

    //current address country
    let i = 0

    //to reset country value from default US to first value
    await page.click('[data-testid="demographics-current-add-country"]')
    await page.type(
      '[data-testid="demographics-current-add-country"]',
      expectedCountryDropDown[0]
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('[data-testid="demographics-current-add-country"]')

    while (i < expectedCountryDropDown.length) {
      actualCurrentAddressCountryDropDown = await page.innerText(
        '[data-testid="demographics-current-add-country"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualCurrentAddressCountryDropDown != expectedCountryDropDown[i]) {
        flagForCurrentAddressCountry = false
        console.log(actualCurrentAddressCountryDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }
    expect(flagForCurrentAddressCountry).toBe(true)
  }, 90000)

  it('should validate dropdown - country - alternate address', async () => {
    let actualAlternateAddressCountryDropDown
    let flagForAlternateAddressCountry = true
    let i = 0

    //alternate address country
    //click on have an alternate address
    await page.click('[data-testid="demographics-have-alt-address"]')

    //to reset country value from default US to first value
    await page.click('[data-testid="demographics-alternate-add-country"]')
    await page.type(
      '[data-testid="demographics-alternate-add-country"]',
      expectedCountryDropDown[0]
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('[data-testid="demographics-alternate-add-country"]')

    while (i < expectedCountryDropDown.length) {
      actualAlternateAddressCountryDropDown = await page.innerText(
        '[data-testid="demographics-alternate-add-country"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )
      if (actualAlternateAddressCountryDropDown != expectedCountryDropDown[i]) {
        flagForAlternateAddressCountry = false
        console.log(actualAlternateAddressCountryDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }
    expect(flagForAlternateAddressCountry).toBe(true)
  }, 90000)

  //validating mandatory fields
  it('should validate error message on mandatory fields when blank', async () => {
    let flag = true

    await page.fill('[data-testid="demographics-first-name"]', '')
    await page.fill('[data-testid="demographics-last-name"]', '')
    await page.click('[data-testid="demographics-have-alt-address"]')

    await page.click('[data-testid="demographics-update-button"]')

    const actualErrorMessagesArray = await page.$$eval(
      '[role="alert"]',
      elements => elements.map(item => item.textContent)
    )

    for (
      var counterForErrorMessages = 0;
      counterForErrorMessages < actualErrorMessagesArray.length - 1;
      counterForErrorMessages++
    ) {
      if (
        actualErrorMessagesArray[counterForErrorMessages]?.includes(
          'date_of_birth'
        )
      ) {
        continue
      } else if (
        expectedErroMessageOnMandatoryFields[counterForErrorMessages] !=
        actualErrorMessagesArray[counterForErrorMessages]
      ) {
        flag = false
      }
    }

    expect(flag).toBe(true)
    await page.click('[data-testid="demographics-cancel-button"]')
    await page.click('[data-testid="demographics-edit-button"]')
  })

  //editing the demographics
  it('should upload profile photo', async () => {
    //calling function to upload profile photo
    await uploadProfilePhoto()
  })

  it('should edit demogrpahics - Basic information', async () => {
    //calling function to fill basic infromation
    await fillBasicInformation()
  }, 30000)

  it('should edit demographics - phone number and email', async () => {
    //adding multiple phone numbers
    expect(
      await page.isDisabled(
        '[data-testid="demographics-add-update-phone-number-button"]'
      )
    ).toBe(true)

    for (
      var counterForPhoneNumber = 0;
      counterForPhoneNumber < phoneNumberTypeDropDown.length;
      counterForPhoneNumber++
    ) {
      await page.click('[data-testid="demographics-phone-type"]')
      await page.click(
        '[data-testid="' +
          phoneNumberTypeDropDownTestIds[counterForPhoneNumber] +
          '"]'
      )
      let expectedPhoneNumber = randomNumeric(16)

      await page.fill(
        '[data-testid="demographics-phone-number"]',
        expectedPhoneNumber
      )
      const expectedPhoneNumberNotes = randomAlphaNumeric()

      await page.fill(
        '[data-testid="demographics-phone-number-notes"]',
        expectedPhoneNumberNotes
      )

      await page.click(
        '[data-testid="demographics-add-update-phone-number-button"]'
      )

      let expectedPhoneNumberType =
        phoneNumberTypeDropDown[counterForPhoneNumber]

      //adding primary for the first record added
      if (counterForPhoneNumber == 0) {
        expectedPhoneNumberType = expectedPhoneNumberType + ' (Primary)'
      }

      expectedPhoneNumberList.push([
        expectedPhoneNumberType,
        expectedPhoneNumber,
        expectedPhoneNumberNotes
      ])
    }

    //deleting last element
    let variableForEditDeleteIconPhoneNumber =
      phoneNumberTypeDropDownTestIds.length
    await page.click(
      '(//*[@data-testid="demographics-phone-number-delete-icon"])[' +
        variableForEditDeleteIconPhoneNumber +
        ']'
    )

    //validating delete popup message - phone number
    let actualPhoneNumberDeletePopupMessage = await page.innerText(
      '[class=ant-modal-confirm-title]'
    )

    let expectedPhoneNumberDeletePopupMessage =
      'Are you sure you want to delete the phone number ' +
      expectedPhoneNumberList[variableForEditDeleteIconPhoneNumber][1] +
      '?'

    expect(actualPhoneNumberDeletePopupMessage).toBe(
      expectedPhoneNumberDeletePopupMessage
    )

    await page.click('[class="ant-btn ant-btn-dangerous"]')
    expectedPhoneNumberList.pop()

    //editing last element
    variableForEditDeleteIconPhoneNumber =
      variableForEditDeleteIconPhoneNumber - 1

    await page.click(
      '(//*[@data-testid="demographics-phone-number-edit-icon"])[' +
        variableForEditDeleteIconPhoneNumber +
        ']'
    )
    await page.click('[data-testid="demographics-phone-type"]')
    await page.click(
      '[data-testid="' +
        phoneNumberTypeDropDownTestIds[variableForEditDeleteIconPhoneNumber] +
        '"]'
    )
    let expectedPhoneNumber = randomNumeric(16)

    await page.fill(
      '[data-testid="demographics-phone-number"]',
      expectedPhoneNumber
    )
    const expectedPhoneNumberNotes = randomAlphaNumeric()

    await page.fill(
      '[data-testid="demographics-phone-number-notes"]',
      expectedPhoneNumberNotes
    )

    await page.click(
      '[data-testid="demographics-add-update-phone-number-button"]'
    )

    expectedPhoneNumberList[variableForEditDeleteIconPhoneNumber][0] =
      phoneNumberTypeDropDown[variableForEditDeleteIconPhoneNumber]

    expectedPhoneNumberList[variableForEditDeleteIconPhoneNumber][1] =
      expectedPhoneNumber

    expectedPhoneNumberList[variableForEditDeleteIconPhoneNumber][2] =
      expectedPhoneNumberNotes

    //adding multiple email
    let emailRandomValue
    expect(
      await page.isDisabled(
        '[data-testid="demographics-add-update-email-button"]'
      )
    ).toBe(true)
    for (var counterForEmail = 0; counterForEmail < 5; counterForEmail++) {
      emailRandomValue = 'rucheta' + randomNumeric(5) + '@theprocedure.in'
      await page.fill('[data-testid="demographics-email"]', emailRandomValue)

      //adding primary for the first record added
      if (counterForEmail == 0) {
        emailRandomValue = emailRandomValue + ' (Primary)'
      }
      await page.click('[data-testid="demographics-add-update-email-button"]')
      expectedEmailList.push(emailRandomValue)
    }

    //deleting last element
    let variableForEditDeleteIcon = expectedEmailList.length - 1
    await page.click(
      '(//*[@data-testid="demographics-email-delete-icon"])[' +
        variableForEditDeleteIcon +
        ']'
    )

    //validating delete popup message - email
    let actualEmailDeletePopupMessage = await page.innerText(
      '[class=ant-modal-confirm-title]'
    )
    let expectedEmailDeletePopupMessage =
      'Are you sure you want to delete the email ' +
      expectedEmailList[variableForEditDeleteIcon] +
      '?'

    expect(actualEmailDeletePopupMessage).toBe(expectedEmailDeletePopupMessage)

    await page.click('[class="ant-btn ant-btn-dangerous"]')
    expectedEmailList.pop()

    //editing last element
    variableForEditDeleteIcon = variableForEditDeleteIcon - 1
    emailRandomValue = 'rucheta' + randomNumeric(5) + '@theprocedure.in'
    await page.click(
      '(//*[@data-testid="demographics-email-edit-icon"])[' +
        variableForEditDeleteIcon +
        ']'
    )
    await page.fill('[data-testid="demographics-email"]', emailRandomValue)
    await page.click('[data-testid="demographics-add-update-email-button"]')
    expectedEmailList[variableForEditDeleteIcon] = emailRandomValue
  }, 60000)

  it('should edit demographics - rest details', async () => {
    //updating rest details
    await page.click('[data-testid="demographics-primary-facility-location"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.fill(
      '[data-testid="demographics-chart-no"]',
      expectedChartNumber
    )
    await page.click('[data-testid="demographics-work-status"]')
    await page.click('[data-testid="student_full_time"]')

    await page.click('[data-testid="demographics-ethnicity"]')
    await page.click('[data-testid="belearic_islander"]')

    await page.click('[data-testid="demographics-religion"]')
    await page.click('[data-testid="african_religions"]')

    await page.click('[data-testid="demographics-race"]')
    await page.click('[data-testid="hispanic_other_born_in_us"]')

    await page.click('[data-testid="demographics-pref-lang"]')
    await page.click('[data-testid="arabic"]')
    await page.click('[data-testid="armenian"]')
    await page.click('[data-testid="demographics-pref-lang"]')
    //updating other information
    await page.click('[data-testid="referral-organization"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill('[data-testid="referral-remarks"]', 'test')

    await page.fill('[data-testid="demographics-comments"]', expectedComments)
  }, 90000)

  it('should fetch random generated and dropdown values - basic details', async () => {
    //fetching random generated and dropdown values from edit view
    expectedMaritalStatus = await page.innerText(
      '[data-testid="demographics-marital-status"]'
    )
    expectedSex = await page.innerText('[data-testid="demographics-sex"]')
    expectedGenderIdentity = await page.innerText(
      '[data-testid="demographics-gender-identity"]'
    )
    expectedSexualOrientation = await page.innerText(
      '[data-testid="demographics-sexual-orientation"]'
    )

    expectedCurrentAddressCountry = await page.innerText(
      '[data-testid="demographics-current-add-country"]'
    )
    expectedAlternateAddressCountry = await page.innerText(
      '[data-testid="demographics-alternate-add-country"]'
    )

    expectedCurrentAddressZipCode = await page.getAttribute(
      '[data-testid="demographics-curr-add-zip-code"]',
      'value'
    )

    expectedAlternateAddressZipCode = await page.getAttribute(
      '[data-testid="demographics-alt-add-zip-code"]',
      'value'
    )
  }, 90000)

  it('should fetch random generated and dropdown values - other details and save', async () => {
    //fetching random generated and dropdown values from edit view
    expectedPrimaryFacilityLocation = await page.innerText(
      '[data-testid="demographics-primary-facility-location"]'
    )

    expectedWorkStatus = await page.innerText(
      '[data-testid="demographics-work-status"]'
    )

    expectedEthnicity = await page.innerText(
      '[data-testid="demographics-ethnicity"]'
    )

    expectedReligion = await page.innerText(
      '[data-testid="demographics-religion"]'
    )
    expectedRace = await page.innerText('[data-testid="demographics-race"]')

    expectedPreferredLanguages = await page.innerText(
      '[data-testid="demographics-pref-lang"]'
    )

    expectedReferralRemarks = await page.getAttribute(
      '[data-testid="referral-remarks"]',
      'value'
    )

    await page.click('[data-testid="demographics-update-button"]')
    await page.waitForSelector('[data-testid="demographics-sex-value"]')
  }, 30000)

  it('should fetch and validate phone number details', async () => {
    //fetch phone number
    let actualPhoneNumberList = [['', '', '']]
    let actualPhoneNumberType
    let actualPhoneNumber
    let actualPhoneNumberNotes
    let flag = true

    await page.waitForTimeout(5000)
    for (
      var counterForPhoneNumber = 2;
      counterForPhoneNumber <= expectedPhoneNumberList.length;
      counterForPhoneNumber++
    ) {
      actualPhoneNumberType = await page.innerText(
        '(//*[@data-testid="demographics-details-phone-number-table"])/div/div/table/tbody/tr[' +
          counterForPhoneNumber +
          ']/td[1]'
      )

      actualPhoneNumber = await page.innerText(
        '(//*[@data-testid="demographics-details-phone-number-table"])/div/div/table/tbody/tr[' +
          counterForPhoneNumber +
          ']/td[2]'
      )
      actualPhoneNumberNotes = await page.innerText(
        '(//*[@data-testid="demographics-details-phone-number-table"])/div/div/table/tbody/tr[' +
          counterForPhoneNumber +
          ']/td[3]'
      )
      actualPhoneNumberList.push([
        actualPhoneNumberType,
        actualPhoneNumber,
        actualPhoneNumberNotes
      ])
    }

    //validate phone number
    for (
      var counterForPhoneNumber = 0;
      counterForPhoneNumber < expectedPhoneNumberList.length;
      counterForPhoneNumber++
    ) {
      //updated because of EHR-739
      //if(expectedPhoneNumberList[counterForPhoneNumber]!=actualPhoneNumberList[counterForPhoneNumber])
      //{
      //   flag = true
      // }
      for (
        var innerLoopCounter = 0;
        innerLoopCounter < actualPhoneNumberList.length;
        innerLoopCounter++
      ) {
        if (
          expectedPhoneNumberList[counterForPhoneNumber][0] !=
            actualPhoneNumberList[innerLoopCounter][0] &&
          expectedPhoneNumberList[counterForPhoneNumber][1] !=
            actualPhoneNumberList[innerLoopCounter][1] &&
          expectedPhoneNumberList[counterForPhoneNumber][2] !=
            actualPhoneNumberList[innerLoopCounter][2]
        ) {
          flag = false
        } else {
          flag = true
          break
        }
      }
    }

    expect(flag).toBe(true)
  }, 90000)

  it('should fetch and validate emails', async () => {
    let flagForEmail = false
    await page.waitForTimeout(5000)

    let actualEmailList = await page.innerText(
      '[data-testid="demographics-details-email-table"] tbody'
    )

    let actualEmailListArray = actualEmailList.split('\n')
    actualEmailListArray.shift()

    for (
      var counterForEmail = 1;
      counterForEmail < expectedEmailList.length;
      counterForEmail++
    ) {
      for (
        var innerLoopCounterForEmail = 1;
        innerLoopCounterForEmail < actualEmailListArray.length;
        innerLoopCounterForEmail++
      ) {
        if (
          expectedEmailList[counterForEmail] !=
          actualEmailListArray[innerLoopCounterForEmail]
        ) {
          flagForEmail = false
        } else {
          flagForEmail = true
          break
        }
      }
    }

    expect(flagForEmail).toBe(true)
  })

  it('should fetch and validate organization details', async () => {
    //adding multiple external registration numbers
    let expectedReferralOrganization
    let counterForNumberOfOrganizationsToBeAdded = 4
    expect(
      await page.isDisabled(
        '[data-testid="demographics-external-registration-add-update-button"]'
      )
    ).toBe(true)

    for (
      var counterForOrganization = 1;
      counterForOrganization <= counterForNumberOfOrganizationsToBeAdded;
      counterForOrganization++
    ) {
      await page.click('[data-testid="demographics-organization"]')

      for (
        var innerLoopCounterForOrganization = 1;
        innerLoopCounterForOrganization <= counterForOrganization;
        innerLoopCounterForOrganization++
      ) {
        await page.keyboard.press('ArrowDown')
      }
      await page.keyboard.press('Enter')

      await page.fill(
        '[data-testid="demographics-external-ref-no"]',
        expectedExternalRegistrationNumber
      )

      expectedReferralOrganization = await page.innerText(
        '[data-testid="demographics-organization"]'
      )

      await page.click(
        '[data-testid="demographics-external-registration-add-update-button"]'
      )

      expectedOrganizationList.push([
        expectedReferralOrganization,
        expectedExternalRegistrationNumber
      ])
    }

    //deleting last element
    await page.click(
      '(//*[@data-testid="demographics-external-organization-delete-icon"])[' +
        counterForNumberOfOrganizationsToBeAdded +
        ']'
    )

    //validating delete popup message - organization
    let actualOrganizationDeletePopupMessage = await page.innerText(
      '[class=ant-modal-confirm-title]'
    )
    let expectedOrganizationDeletePopupMessage =
      'Are you sure you want to delete this entry?'

    expect(actualOrganizationDeletePopupMessage).toBe(
      expectedOrganizationDeletePopupMessage
    )

    await page.click('[class="ant-btn ant-btn-dangerous"]')
    expectedOrganizationList.pop()

    //editing last element
    counterForNumberOfOrganizationsToBeAdded =
      counterForNumberOfOrganizationsToBeAdded - 1
    await page.click(
      '(//*[@data-testid="demographics-external-organization-edit-icon"])[' +
        counterForNumberOfOrganizationsToBeAdded +
        ']'
    )
    await page.click('[data-testid="demographics-organization"]')

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.fill(
      '[data-testid="demographics-external-ref-no"]',
      expectedExternalRegistrationNumber
    )

    expectedReferralOrganization = await page.innerText(
      '[data-testid="demographics-organization"]'
    )

    await page.click(
      '[data-testid="demographics-external-registration-add-update-button"]'
    )

    expectedOrganizationList[counterForNumberOfOrganizationsToBeAdded][0] =
      expectedReferralOrganization
    expectedOrganizationList[counterForNumberOfOrganizationsToBeAdded][1] =
      expectedExternalRegistrationNumber

    //fetch phone number
    let actualOrganizationList = [['', '']]
    let actualReferralOrganization, actualExternalRegistrationNumber
    let flagForOrganization = true

    for (
      var counterForOrganization = 1;
      counterForOrganization < expectedOrganizationList.length;
      counterForOrganization++
    ) {
      actualReferralOrganization = await page.innerText(
        '(//*[@data-testid="demographics-details-external-registration-number-table"]/div/div/table/tbody/tr[' +
          counterForOrganization +
          ']/td[1])'
      )
      actualExternalRegistrationNumber = await page.innerText(
        '(//*[@data-testid="demographics-details-external-registration-number-table"]/div/div/table/tbody/tr[' +
          counterForOrganization +
          ']/td[2])'
      )

      actualOrganizationList.push([
        actualReferralOrganization,
        actualExternalRegistrationNumber
      ])
    }

    //validate phone number
    for (
      var counterForOrganization = 0;
      counterForOrganization < expectedOrganizationList.length;
      counterForOrganization++
    ) {
      //updated because of EHR-739
      //if(expectedPhoneNumberList[counterForPhoneNumber]!=actualPhoneNumberList[counterForPhoneNumber])
      //{
      //   flag = true
      // }
      for (
        var innerLoopCounter = 0;
        innerLoopCounter < actualOrganizationList.length;
        innerLoopCounter++
      ) {
        if (
          expectedOrganizationList[counterForOrganization][0] !=
            actualOrganizationList[innerLoopCounter][0] &&
          expectedOrganizationList[counterForOrganization][1] !=
            actualOrganizationList[innerLoopCounter][1]
        ) {
          flagForOrganization = false
        } else {
          flagForOrganization = true
          break
        }
      }
    }

    expect(flagForOrganization).toBe(true)
  }, 90000)

  it('should display all the changes in details view', async () => {
    //waiting for data to load on detail view
    await page.waitForTimeout(5000)

    //fetching all the values from detail view to validate further
    await page.hover(
      '//*[@data-testid="detail-patient-title"]//following-sibling::button'
    )
    const actualSexPatientInfo = await page.innerText(
      '(//*[@class="ant-tooltip-inner"])[2]'
    )

    const actualSex = await page.innerText(
      '[data-testid="demographics-sex-value"]'
    )

    const actualGenderIdentity = await page.innerText(
      '[data-testid="demographics-gender-identity-value"]'
    )
    const actualSexualOrientation = await page.innerText(
      '[data-testid="demographics-sexual-orientation-value"]'
    )

    const actualMaritalStatus = await page.innerText(
      '[data-testid="demographics-marital-status-value"]'
    )

    const actualSsn = await page.innerText(
      '[data-testid="demographics-ssn-value"]'
    )

    const actualPreviousName = await page.innerText(
      '[data-testid="demographics-prev-name-value"]'
    )

    const actualMothersMaidenName = await page.innerText(
      '[data-testid="demographics-mothers-maiden-name-value"]'
    )

    const actualCurrentAddress = await page.innerText(
      '[data-testid="demographics-current-add-value"]'
    )

    const actualAlternateAddress = await page.innerText(
      '[data-testid="demographics-alternative-add-value"]'
    )

    const actualPrimaryFacilityLocation = await page.innerText(
      '[data-testid="demographics-primary-facility-value"]'
    )

    const actualChartNumber = await page.innerText(
      '[data-testid="demographics-chart-no-value"]'
    )

    const actualWorkStatus = await page.innerText(
      '[data-testid="demographics-work-status-value"]'
    )

    const actualEthnicity = await page.innerText(
      '[data-testid="demographics-ethnicity-value"]'
    )

    const actualReligion = await page.getAttribute(
      '[data-testid="demographics-religion-value"]',
      'aria-label'
    )

    const actualRace = await page.innerText(
      '[data-testid="demographics-race-value"]'
    )

    let flag = true
    const expectedPreferredLanguagesArray =
      expectedPreferredLanguages.split('\n')

    let actualPreferredLanguages = await page.innerText(
      '[data-testid="demographics-pref-lang-value"]'
    )
    let actualPreferredLanguagesArray = actualPreferredLanguages.split(', ')

    for (
      var counterForPreferredLanguage = 0;
      counterForPreferredLanguage < expectedPreferredLanguagesArray.length;
      counterForPreferredLanguage++
    ) {
      if (
        expectedPreferredLanguagesArray[counterForPreferredLanguage] !=
        actualPreferredLanguagesArray[counterForPreferredLanguage]
      ) {
        flag = false
      }
    }

    expect(flag).toBe(true)

    // const actualReferralOrganization = await page.innerText(
    //   '[data-testid="demographics-referral-organization-value"]'
    // )

    const actualReferralRemarks = await page.innerText(
      '[data-testid="demographics-referral-remarks-value"]'
    )
    const actualComments = await page.innerText(
      '[data-testid="demographics-comments-value"]'
    )

    const actualPhoneNumberList = ['', '', '']

    //validating values entered in edit with displayed in detail view
    expect(actualSexPatientInfo).toBe(expectedSex)
    expect(actualSex).toBe(expectedSex)
    expect(actualGenderIdentity).toBe(expectedGenderIdentity)
    expect(actualSexualOrientation).toBe(expectedSexualOrientation)
    expect(actualMaritalStatus).toBe(expectedMaritalStatus)
    expect(actualSsn).toBe(expectedSsn)
    expect(actualPreviousName).toBe(
      expectedPreviousFirstName + ' ' + expectedPreviousLastName
    )
    expect(actualMothersMaidenName).toBe(
      expectedMothersMaidenFirstName + ' ' + expectedMothersMaidenLastName
    )

    const expectedCurrentAddress =
      expectedCurrentAddressLine1 +
      ', ' +
      expectedCurrentAddressLine2 +
      ', ' +
      expectedCurrentAddressCity +
      ', ' +
      expectedCurrentAddressStateCode +
      ', ' +
      expectedCurrentAddressCountry +
      ', ' +
      expectedCurrentAddressZipCode

    const expectedAlternateAddress =
      expectedAlternateAddressLine1 +
      ', ' +
      expectedAlternateAddressLine2 +
      ', ' +
      expectedAlternateAddressCity +
      ', ' +
      expectedAlternateAddressStateCode +
      ', ' +
      expectedAlternateAddressCountry +
      ', ' +
      expectedAlternateAddressZipCode

    expect(actualCurrentAddress).toBe(expectedCurrentAddress)

    expect(actualAlternateAddress).toBe(expectedAlternateAddress)

    expect(actualPrimaryFacilityLocation).toBe(expectedPrimaryFacilityLocation)

    expect(actualChartNumber).toBe(expectedChartNumber)
    expect(actualWorkStatus).toBe(expectedWorkStatus)
    expect(actualEthnicity).toBe(expectedEthnicity)
    expect(actualReligion).toBe(expectedReligion)
    expect(actualRace).toBe(expectedRace)
    //expect(actualReferralOrganization).toBe(expectedReferralOrganization)
    expect(actualReferralRemarks).toBe(expectedReferralRemarks)
    expect(actualComments).toBe(expectedComments)
  }, 30000)

  it('should change the profile and ssn photo and update', async () => {
    //calling function to change photo - ssn and profile
    await changePhoto()
  }, 30000)

  it('should hover and validate popup image', async () => {
    //this needs to be added as everytime any data is updated it takes time to load the data
    await page.waitForTimeout(5000)
    await page.waitForSelector('[data-testid="demographics-profile-photo"]')
    await page.hover('[data-testid="demographics-profile-photo"]')
    expect(
      await page.isVisible('[data-testid="demographics-profile-photo-popover"]')
    ).toBe(true)
  })

  it('should remove the profile and ssn photo and validate', async () => {
    //this needs to be added as everytime any data is updated it takes time to load the data
    await page.waitForTimeout(5000)
    await page.click('[data-testid="demographics-edit-button"]')

    await page.waitForSelector(
      '[data-testid="demographics-upload-profile-photo-remove-button"]'
    )
    await page.click(
      '[data-testid="demographics-upload-profile-photo-remove-button"]'
    )
    await page.click('[data-testid="upload-ssn-photo-remove-button"]')

    const actualNoProfilePhotoUploadedState = await page.isVisible(
      '[data-testid="demographics-upload-profile-photo-no-photo-uploaded"]'
    )

    const actualNoSsnCardUploadedState = await page.isVisible(
      '[data-testid="demographics-upload-profile-photo-no-photo-uploaded"]'
    )

    await page.click('[data-testid="demographics-update-button"]')
    expect(actualNoProfilePhotoUploadedState).toBe(false)
    expect(actualNoSsnCardUploadedState).toBe(false)
    await page.waitForSelector('[data-testid="demographics-edit-button"]')
  }, 90000)
})
