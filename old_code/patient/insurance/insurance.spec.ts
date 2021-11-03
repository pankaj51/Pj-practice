import { page } from '../../shared/constants'
import { randomSsnGenerator, randomNumeric } from '../../shared/constants'
import { login, createPatient } from '../../shared/utils'
import { Page } from 'playwright'

const globalRandomNumber = randomSsnGenerator().toString()
const gloabalNumericAddress = randomNumeric(16)
const inputFirstName = 'Pankaj'
const inputLastName = 'Jain'
const inputAddressLine1 = 'Address Line 1'
const inputCity = 'Mumbai'
const inputStateCode = 'CA'
const inputZipCode = '94110'

let expectedPriority: string | null = ''
let expectedPlan: string | null = ''
let expectedPlanAddress: string | null = ''
let expectedPAPS: string | null = ''
let expectedPAPSAddress: string | null = ''
let expectedReleaseInformation: string | null = ''
let expectedInsuranceCode: string | null = ''
let expectedClaimFileIndicator: string | null = ''
let expectedSubscriberTitle: string | null = ''
let expectedSubscriberGender: string | null = ''
let expectedSubscriberRelationshipWithPatient: string | null = ''
let expectedSubscriberSsn: string | null = ''
let expectedSubscriberCountry: string | null = ''
let expectedPhoneNumber: string | null = ''
let expectedSubscriberEmployerCountry: string | null = ''
let expectedSignOnfile: string | null = ''
let expectedEffectiveDate: string | null = ''
let expectedTerminationDate: string | null = ''

describe('add-patient', () => {
  //login
  it('login with username and password', async () => {
    const username = 'rucheta7'
    const password = 'Rucheta@123'
    await login(page, username, password)
  })

  //opening add patient tab
  it('should open add patient tab', async () => {
    await page.waitForSelector('css=[data-testid="activity-Patients"]')
    await page.click('css=[data-testid="activity-Patients"]')

    await page.click('css=[data-testid="menu-CreatePatient"]')

    await page.waitForSelector('css=[data-testid="add-patient-title"]')

    const expectedTitleDetailFacility = await page.innerText(
      'css=[data-testid="add-patient-title"]'
    )
    expect(expectedTitleDetailFacility).toBe('Create Patient')
  })

  //creating new patient
  it('should create new patient', async () => {
    //calling create patient function
    await createPatient(page)
  }, 30000)
})

describe('Add Insurance', () => {
  it('should show validation message for all mandatory fields', async () => {
    let flag1 = false
    let flag2 = false

    await page.waitForSelector('//*[@id="rc-tabs-0-tab-insurance"]')
    await page.click('//*[@id="rc-tabs-0-tab-insurance"]')

    await page.waitForTimeout(2000) // to avoid unexpected error

    await page.click('#create-insurance')

    await page.click('css=[data-testid="add-insurance-subscriber-other"]')
    await page.click('#update-patient-submit')
    const expectedMandatoryValidationMessages: string[] = [
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field',
      'This is a required field'
    ]
    const actualMandatoryValidationMessages = await page.$$eval(
      'css=[role="alert"]',
      elements => elements.map(item => item.textContent)
    )

    if (
      actualMandatoryValidationMessages.length ===
      expectedMandatoryValidationMessages.length
    ) {
      flag1 = true
    }

    for (var index in actualMandatoryValidationMessages) {
      if (
        expectedMandatoryValidationMessages[index] ===
        actualMandatoryValidationMessages[index]
      ) {
        flag2 = true
      }
    }

    expect(flag1).toBe(true)
    expect(flag2).toBe(true)
  })

  const fillSubsciberDetails = async (page: Page) => {
    await page.click('css=[data-testid="add-insurance-subscriber-other"]')
    await page.click('css=[data-testid="add-insurance-subscriber-title"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-first-name"]',
      inputFirstName
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-last-name"]',
      inputLastName
    )
    await page.click('css=[data-testid="add-insurance-subscriber-gender"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-insurance-subscriber-dob"]')
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-dob"]',
      '02-05-2021'
    )
    await page.click(
      'css=[data-testid="add-insurance-subscriber-relationship-with-patient"]'
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-ssn"]',
      globalRandomNumber
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-email"]',
      'pankaj+' + gloabalNumericAddress + '@theprocedure.in'
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-current-address"]',
      inputAddressLine1
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-city"]',
      inputCity
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-state"]',
      inputStateCode
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-zip-code"]',
      inputZipCode
    )
    await page.click('css=[data-testid="add-insurance-subscriber-country"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click(
      'css=[data-testid="add-insurance-subscriber-phone-number-type"]'
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-phone-number"]',
      '9999999999'
    )
    await page.click(
      'css=[data-testid="add-insurance-subscriber-date-of-retirement"]'
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-date-of-retirement"]',
      '02-05-2021'
    )
  }

  const fillSubscriberEmployerDetails = async (page: Page) => {
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-name"]',
      inputFirstName
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-id"]',
      '1234567890'
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-address"]',
      inputAddressLine1
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-city"]',
      inputCity
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-state"]',
      inputStateCode
    )
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-employer-zipcode"]',
      inputZipCode
    )
    await page.click(
      'css=[data-testid="add-insurance-subscriber-employer-country"]'
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
  }

  it('Add insurance', async () => {
    await page.waitForSelector('css=[data-testid="add-insurance-priority"]')
    await page.click('css=[data-testid="add-insurance-priority"]')
    await page.click('css=[data-testid="primary"]')
    await page.click('css=[data-testid="add-insurance-plan"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-insurance-plan-address"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-insurance-paps"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-insurance-paps-address"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill(
      'css=[data-testid="add-insurance-subscriber-policy-number"]',
      globalRandomNumber
    )
    await page.fill('css=[data-testid="add-insurance-copay"]', '0.00')
    await page.fill('css=[data-testid="add-insurance-deductible"]', '0.00')
    await page.fill(
      'css=[data-testid="add-insurance-patient-policy-number"]',
      globalRandomNumber
    )
    await page.fill(
      'css=[data-testid="add-insurance-group-number"]',
      globalRandomNumber
    )
    await page.fill(
      'css=[data-testid="add-insurance-group-name"]',
      'Test Group'
    )
    await page.click('css=[data-testid="add-insurance-sign-on"]')
    await page.click('.ant-picker-cell-inner')
    await page.click('css=[data-testid="add-insurance-effective-date"]')
    await page.fill(
      'css=[data-testid="add-insurance-effective-date"]',
      '02-05-2021'
    )
    await page.click('css=[data-testid="add-insurance-termination-date"]')
    await page.fill(
      'css=[data-testid="add-insurance-termination-date"]',
      '02-05-2021'
    )
    await page.click('css=[data-testid="add-insurance-release-information"]')
    await page.click('css=[data-testid="yes"]')
    await page.fill('css=[data-testid="add-insurance-exception-code"]', '1234')
    await page.fill('css=[data-testid="add-insurance-person-code"]', '1234')
    await page.fill(
      'css=[data-testid="add-insurance-wcb-carrier-code"]',
      '1234'
    )
    await page.click('css=[data-testid="add-insurance-insurance-code"]')
    await page.click('css=[data-testid="HM"]')
    await page.click('css=[data-testid="add-insurance-claim-indicator"]')
    await page.click('css=[data-testid="self_pay"]')
    await page.fill(
      'css=[data-testid="add-insurance-comments"]',
      'Test comments'
    )

    //Upload an image
    await page.setInputFiles(
      'css=[data-testid="add-insurance-upload-insurance-card-front"]',
      'sample-insurance-image1.jpg'
    )
    await page.setInputFiles(
      'css=[data-testid="add-insurance-upload-insurance-card-back"]',
      'sample-insurance-image1.jpg'
    )
    await page.setInputFiles(
      'css=[data-testid="add-insurance-upload-id-card-front"]',
      'sample-insurance-image1.jpg'
    )

    await fillSubsciberDetails(page)

    await fillSubscriberEmployerDetails(page)

    //fetch the value to compare the value shown in detail view
    expectedPriority = await page.innerText(
      'css=[data-testid="add-insurance-priority"]'
    )
    expectedPlan = await page.innerText(
      'css=[data-testid="add-insurance-plan"]'
    )
    expectedPlanAddress = await page.innerText(
      'css=[data-testid="add-insurance-plan-address"]'
    )
    expectedPAPS = await page.innerText(
      'css=[data-testid="add-insurance-paps"]'
    )
    expectedPAPSAddress = await page.innerText(
      'css=[data-testid="add-insurance-paps-address"]'
    )
    expectedReleaseInformation = await page.innerText(
      'css=[data-testid="add-insurance-release-information"]'
    )
    expectedInsuranceCode = await page.innerText(
      'css=[data-testid="add-insurance-insurance-code"]'
    )
    expectedClaimFileIndicator = await page.innerText(
      'css=[data-testid="add-insurance-claim-indicator"]'
    )
    expectedSignOnfile = await page.getAttribute(
      'css=[data-testid="add-insurance-sign-on"]',
      'value'
    )
    expectedEffectiveDate = await page.getAttribute(
      'css=[data-testid="add-insurance-effective-date"]',
      'value'
    )
    expectedTerminationDate = await page.getAttribute(
      'css=[data-testid="add-insurance-termination-date"]',
      'value'
    )

    // expectedSubscriber = await page.getAttribute('css=[data-testid="add-insurance-subscriber-other"]', 'value')
    expectedSubscriberTitle = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-title"]'
    )
    expectedSubscriberGender = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-gender"]'
    )
    expectedSubscriberRelationshipWithPatient = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-relationship-with-patient"]'
    )
    expectedSubscriberSsn = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-ssn"]',
      'value'
    )
    expectedSubscriberCountry = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-country"]'
    )
    expectedPhoneNumber = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-phone-number-type"]'
    )

    const expectedSubscriberEmployerCountryInnerText = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-employer-country"]'
    )
    const expectedSubscriberEmployerArray =
      expectedSubscriberEmployerCountryInnerText.split('\n')
    expectedSubscriberEmployerCountry = expectedSubscriberEmployerArray[1]

    await page.click('#update-patient-submit')
  }, 500000)
})

describe('Detail view', () => {
  const checkSubsciberDetailsInDetailView = async (page: Page) => {
    const actualSubscriberName = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-first-name"]'
    )
    const actualSubscriberGender = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-gender"]'
    )
    const actualSubscriberDOB = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-date-of-birth"]'
    )
    const actualSubscriberRelationshipWithPatient = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-relationship-with-patient"]'
    )
    const actualSubscriberContact = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-phone-number"]'
    )
    const actualSubscriberEmail = await page.getAttribute(
      'css=[data-testid="detail-insurance-subscriber-email"]',
      'aria-label'
    )
    const actualSubscriberRetirement = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-date-of-retirement"]'
    )
    const actualSubscriberAddress = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-address"]'
    )

    expect(actualSubscriberName).toBe(inputFirstName + ' ' + inputLastName)
    expect(actualSubscriberGender).toBe(expectedSubscriberGender)
    expect(actualSubscriberDOB).toBe('02-05-2021')
    expect(actualSubscriberRelationshipWithPatient).toBe(
      expectedSubscriberRelationshipWithPatient
    )
    expect(actualSubscriberContact).toBe('9999999999')
    expect(actualSubscriberEmail).toBe(
      'pankaj+' + gloabalNumericAddress + '@theprocedure.in'
    )
    expect(actualSubscriberRetirement).toBe('02-05-2021')
    //Bug added in jira card no. 568
    // expect(actualSubscriberAddress).toBe(inputAddressLine1 +", "+ inputCity + inputStateCode + ", "+ expectedSubscriberCountry + ", " + inputZipCode + ".")
  }

  const checkSubscriberEmployerDetailsInDetailView = async (page: Page) => {
    const actualEmployerName = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-employer-name"]'
    )
    const actualEmployerID = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-employee-id"]'
    )
    const actualEmployerAddress = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-address"]'
    )

    expect(actualEmployerName).toBe(inputFirstName)
    expect(actualEmployerID).toBe('1234567890')
    //Bug added in jira card no. 568
    // expect(actualEmployerAddress).toBe(inputAddressLine1 +", "+ inputCity + ", " + inputStateCode + ", "+ expectedSubscriberEmployerCountry + ", " + inputZipCode + ".")
  }

  it('should show correct details in detail view', async () => {
    await page.waitForTimeout(10000)
    // await page.fill('//input[@placeholder="Search Insurance Policies"]', globalRandomNumber)
    await page.fill('//input[@placeholder="Search.."]', globalRandomNumber)
    await page.click('//td[contains(text(),"' + globalRandomNumber + '")]')
    await page.waitForTimeout(10000)
    const actualPlan = await page.innerText(
      'css=[data-testid="detail-insurance-plan-name"]'
    )
    const actualPriority = await page.innerText(
      'css=[data-testid="detail-insurance-priority"]'
    )
    const actualSubscriberPolicyNumber = await page.innerText(
      'css=[data-testid="detail-insurance-subscriber-policy-number"]'
    )
    const actualPatientPolicyNumber = await page.innerText(
      'css=[data-testid="detail-insurance-patient-policy-number"]'
    )
    const actualGroupNumber = await page.innerText(
      'css=[data-testid="detail-insurance-group-number"]'
    )
    const actualGroupName = await page.innerText(
      'css=[data-testid="detail-insurance-group-name"]'
    )
    const actualPAPS = await page.innerText(
      'css=[data-testid="detail-insurance-payer-authorizing-professional-service"]'
    )
    const actualPAPSAddress = await page.innerText(
      'css=[data-testid="detail-insurance-payer-authorizing-professional-service-address"]'
    )
    const actualSignOnFile = await page.innerText(
      'css=[data-testid="detail-insurance-sign-on-file"]'
    )
    const actualTerminationDate = await page.innerText(
      'css=[data-testid="detail-insurance-termination-date"]'
    )
    const actualEffectiveDate = await page.innerText(
      'css=[data-testid="detail-insurance-effective-date"]'
    )
    const actualReleaseInformation = await page.innerText(
      'css=[data-testid="detail-insurance-release-information"]'
    )
    const actualExpectionCode = await page.innerText(
      'css=[data-testid="detail-insurance-exception-code"]'
    )
    const actualPersonCode = await page.innerText(
      'css=[data-testid="detail-insurance-person-code"]'
    )
    const actulWCBCarrierCode = await page.innerText(
      'css=[data-testid="detail-insurance-wcb-carrier-code"]'
    )
    const actualInsuranceCode = await page.getAttribute(
      'css=[data-testid="detail-insurance-insurance-code"]',
      'aria-label'
    )
    const actualClaimFileIndicator = await page.innerText(
      'css=[data-testid="detail-insurance-commercial-file-indicator"]'
    )
    const actualCopay = await page.innerText(
      'css=[data-testid="detail-insurance-copay"]'
    )
    const actualDeductible = await page.innerText(
      'css=[data-testid="detail-insurance-deductible"]'
    )
    const actualPlanAddress = await page.innerText(
      'css=[data-testid="detail-insurance-plan-address"]'
    )
    const actualComments = await page.innerText(
      'css=[data-testid="detail-insurance-comments"]'
    )

    await checkSubsciberDetailsInDetailView(page)

    await checkSubscriberEmployerDetailsInDetailView(page)

    expect(actualPlan).toBe(expectedPlan)
    expect(actualPriority).toBe(expectedPriority)
    expect(actualSubscriberPolicyNumber).toBe(globalRandomNumber)
    expect(actualPatientPolicyNumber).toBe(globalRandomNumber)
    expect(actualGroupNumber).toBe(globalRandomNumber)
    expect(actualGroupName).toBe('Test Group')
    expect(actualPAPS).toBe(expectedPAPS)
    expect(actualPAPSAddress).toBe(expectedPAPSAddress)
    expect(actualSignOnFile).toBe(expectedSignOnfile)
    expect(actualTerminationDate).toBe(expectedTerminationDate)
    expect(actualEffectiveDate).toBe(expectedEffectiveDate)
    //Added bug in jira card no 568
    // expect(actualReleaseInformation).toBe(expectedReleaseInformation)
    expect(actualExpectionCode).toBe('1234')
    expect(actualPersonCode).toBe('1234')
    expect(actulWCBCarrierCode).toBe('1234')
    expect(actualInsuranceCode).toBe(expectedInsuranceCode)
    expect(actualClaimFileIndicator).toBe(expectedClaimFileIndicator)
    expect(actualCopay).toBe('0.00')
    expect(actualDeductible).toBe('0.00')
    expect(actualPlanAddress).toBe(expectedPlanAddress)
    expect(actualComments).toBe('Test comments')
  }, 50000)
})

describe('Edit view', () => {
  const checkSubscriberDetailsInEditView = async (page: Page) => {
    const actualSubscriberTitle = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-title"]'
    )
    const actualSubscriberFirstName = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-first-name"]',
      'value'
    )
    const actualSubscriberLastName = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-last-name"]',
      'value'
    )
    const actualSubscriberGender = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-gender"]'
    )
    const actualSubscriberDOB = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-dob"]',
      'value'
    )
    const actualSubscriberRelationshipWithPatient = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-relationship-with-patient"]'
    )
    const actualSubscriberSSN = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-ssn"]',
      'value'
    )
    const actualSubscriberEmail = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-email"]',
      'value'
    )
    const actualSubscriberAddress = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-current-address"]',
      'value'
    )
    const actualSubscriberCity = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-city"]',
      'value'
    )
    const actualSubscriberStateCode = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-state"]',
      'value'
    )
    const actualSubscriberZipCode = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-zip-code"]',
      'value'
    )
    const actualSubscriberCountry = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-country"]'
    )
    const actualSubscriberPhoneNumberType = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-phone-number-type"]'
    )
    const actualSubscriberPhoneNumber = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-phone-number"]',
      'value'
    )
    const actualSubscriberRetirement = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-date-of-retirement"]',
      'value'
    )

    expect(
      await page.isChecked('css=[data-testid="add-insurance-subscriber-other"]')
    ).toBeTruthy()
    expect(actualSubscriberTitle).toBe(expectedSubscriberTitle)
    expect(actualSubscriberFirstName).toBe(inputFirstName)
    expect(actualSubscriberLastName).toBe(inputLastName)
    expect(actualSubscriberGender).toBe(expectedSubscriberGender)
    expect(actualSubscriberDOB).toBe('02-05-2021')
    expect(actualSubscriberRelationshipWithPatient).toBe(
      expectedSubscriberRelationshipWithPatient
    )
    expect(actualSubscriberSSN).toBe(expectedSubscriberSsn)
    expect(actualSubscriberEmail).toBe(
      'pankaj+' + gloabalNumericAddress + '@theprocedure.in'
    )
    expect(actualSubscriberAddress).toBe(inputAddressLine1)
    expect(actualSubscriberCity).toBe(inputCity)
    expect(actualSubscriberStateCode).toBe(inputStateCode)
    expect(actualSubscriberZipCode).toBe(inputZipCode)
    expect(actualSubscriberCountry).toBe(expectedSubscriberCountry)
    expect(actualSubscriberPhoneNumberType).toBe(expectedPhoneNumber)
    expect(actualSubscriberPhoneNumber).toBe('9999999999')
    expect(actualSubscriberRetirement).toBe('02-05-2021')
  }

  const checkSubscriberEmployerDetailsInEditView = async (page: Page) => {
    const actualSubscriberEmployerName = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-name"]',
      'value'
    )
    const actualSubscriberEmployerID = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-id"]',
      'value'
    )
    const actualSubscriberEmployerAddress = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-address"]',
      'value'
    )
    const actualSubsciberEmployerCity = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-city"]',
      'value'
    )
    const actualSubscriberEmplyerStateCode = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-state"]',
      'value'
    )
    const actualSubscriberEmployerZipCode = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-employer-zipcode"]',
      'value'
    )
    const actualSubscriberEmployerCountry = await page.innerText(
      'css=[data-testid="add-insurance-subscriber-employer-country"]'
    )

    expect(actualSubscriberEmployerName).toBe(inputFirstName)
    expect(actualSubscriberEmployerID).toBe('1234567890')
    expect(actualSubscriberEmployerAddress).toBe(inputAddressLine1)
    expect(actualSubsciberEmployerCity).toBe(inputCity)
    expect(actualSubscriberEmplyerStateCode).toBe(inputStateCode)
    expect(actualSubscriberEmployerZipCode).toBe(inputZipCode)
    expect(actualSubscriberEmployerCountry).toBe(
      expectedSubscriberEmployerCountry
    )
  }

  it('should populate the correct values', async () => {
    await page.click('#edit-insurance')
    const actualPriority = await page.innerText(
      'css=[data-testid="add-insurance-priority"]'
    )
    await page.waitForTimeout(2000)
    const actualPlan = await page.innerText(
      'css=[data-testid="add-insurance-plan"]'
    )
    const actualPlanAddress = await page.innerText(
      'css=[data-testid="add-insurance-plan-address"]'
    )
    const actualPAPS = await page.innerText(
      'css=[data-testid="add-insurance-paps"]'
    )
    const actualPAPSAddress = await page.innerText(
      'css=[data-testid="add-insurance-paps-address"]'
    )
    const actualSubscriberPolicyNumber = await page.getAttribute(
      'css=[data-testid="add-insurance-subscriber-policy-number"]',
      'value'
    )
    const actualCopay = await page.getAttribute(
      'css=[data-testid="add-insurance-copay"]',
      'value'
    )
    const actualDeductible = await page.getAttribute(
      'css=[data-testid="add-insurance-deductible"]',
      'value'
    )
    const actualPatientPolicyNumber = await page.getAttribute(
      'css=[data-testid="add-insurance-patient-policy-number"]',
      'value'
    )
    const actualGroupNumber = await page.getAttribute(
      'css=[data-testid="add-insurance-group-number"]',
      'value'
    )
    const actualGroupName = await page.getAttribute(
      'css=[data-testid="add-insurance-group-name"]',
      'value'
    )
    const actualSignOnFile = await page.getAttribute(
      'css=[data-testid="add-insurance-sign-on"]',
      'value'
    )
    const actualEffectiveDate = await page.getAttribute(
      'css=[data-testid="add-insurance-effective-date"]',
      'value'
    )
    const actualTerminationDate = await page.getAttribute(
      'css=[data-testid="add-insurance-termination-date"]',
      'value'
    )
    const actualReleaseInformation = await page.innerText(
      'css=[data-testid="add-insurance-release-information"]'
    )
    const actualExceptionCode = await page.getAttribute(
      'css=[data-testid="add-insurance-exception-code"]',
      'value'
    )
    const actualPersonCode = await page.getAttribute(
      'css=[data-testid="add-insurance-person-code"]',
      'value'
    )
    const actulWCBCarrierCode = await page.getAttribute(
      'css=[data-testid="add-insurance-wcb-carrier-code"]',
      'value'
    )
    const actualInsuranceCode = await page.innerText(
      'css=[data-testid="add-insurance-insurance-code"]'
    )
    const actualClaimFileIndicator = await page.innerText(
      'css=[data-testid="add-insurance-claim-indicator"]'
    )
    const actualComments = await page.innerHTML(
      'css=[data-testid="add-insurance-comments"]'
    )

    expect(actualPriority).toBe(expectedPriority)
    expect(actualPlan).toBe(expectedPlan)
    expect(actualPlanAddress).toBe(expectedPlanAddress)
    expect(actualPAPS).toBe(expectedPAPS)
    expect(actualPAPSAddress).toBe(expectedPAPSAddress)
    expect(actualSubscriberPolicyNumber).toBe(globalRandomNumber)
    expect(actualCopay).toBe('0.00')
    expect(actualDeductible).toBe('0.00')
    expect(actualPatientPolicyNumber).toBe(globalRandomNumber)
    expect(actualGroupNumber).toBe(globalRandomNumber)
    expect(actualGroupName).toBe('Test Group')
    expect(actualSignOnFile).toBe(expectedSignOnfile)
    expect(actualEffectiveDate).toBe(expectedEffectiveDate)
    expect(actualTerminationDate).toBe(expectedTerminationDate)
    expect(actualReleaseInformation).toBe(expectedReleaseInformation)
    expect(actualExceptionCode).toBe('1234')
    expect(actualPersonCode).toBe('1234')
    expect(actulWCBCarrierCode).toBe('1234')
    expect(actualInsuranceCode).toBe(expectedInsuranceCode)
    expect(actualClaimFileIndicator).toBe(expectedClaimFileIndicator)
    expect(actualComments).toBe('Test comments')

    await checkSubscriberDetailsInEditView(page)

    await checkSubscriberEmployerDetailsInEditView(page)
  })
})
