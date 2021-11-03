import { Page } from 'playwright'

//defining expected values
//defining globally they are being used in global function createPatient
export let expectedTitle: string = ''
export const expectedFirstName: string = 'automation'
export const expectedLastName: string = 'patient'
export let expectedDob: string | null = ''
export const expectedMiddleName: string = 'code'
export let expectedSex: string = ''

export const login = async (page: Page, username: string, password: string) => {
  await page.waitForSelector('[data-testid="auth-username-username"]')
  await page.fill('[data-testid="auth-username-username"]', username)
  await page.click('[data-testid="auth-username-continue"]')

  //auth-login-password
  await page.waitForSelector('[data-testid="auth-login-password"]')
  await page.fill('[data-testid="auth-login-password"]', password)
  await page.click('[data-testid="auth-login-continue"]')
}

//function to open patients tab
export const openPatientTab = async (page: Page) => {
  await page.waitForSelector('[data-testid="activity-Patients"]')
  await page.click('[data-testid="activity-Patients"]')

  await page.click('[data-testid="menu-CreatePatient"]')

  await page.waitForSelector('[data-testid="add-patient-title"]')
  // validating the title
  const expectedTitleDetailFacility = await page.innerText(
    '[data-testid="add-patient-title"]'
  )
  expect(expectedTitleDetailFacility).toBe('Create Patient')
}

//function to create patient
//defining globally to be able to use the same for all patient sub categories such as insurance, demographics
//this function might require more than 15000 ms
export const createPatient = async (page: Page) => {
  //selecting title
  await page.waitForSelector('[data-testid="add-patient-title-input"]')
  await page.click('[data-testid="add-patient-title-input"]')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  //entering first, middle and last name
  await page.fill('[data-testid="add-patient-first-name"]', expectedFirstName)

  await page.fill('[data-testid="add-patient-middle-name"]', expectedMiddleName)

  await page.fill('[data-testid="add-patient-last-name"]', expectedLastName)

  //selecting dob
  await page.waitForSelector('[data-testid="add-patient-dob"]')
  await page.click('[data-testid="add-patient-dob"]')

  await page.click('.ant-picker-cell-inner')

  //fetching all the values entered to validate on detail page
  expectedTitle = await page.innerText(
    '[data-testid="add-patient-title-input"]'
  )

  expectedDob = await page.getAttribute(
    '[data-testid="add-patient-dob"]',
    'value'
  )

  //click on check button
  await page.click('[data-testid="add-patient-check-button"]')

  const checkButtonStatus = page.getAttribute(
    '[data-testid="add-patient-check-button"]',
    'disabled'
  )

  //if record found waiting for 10 sec, else click on create button to create patient
  if (checkButtonStatus) {
    await page.waitForTimeout(10000)
    await page.click('[data-testid="add-patient-check-button"]')
  } else {
    await page.click('[data-testid="add-patient-check-button"]')
  }
}

//function to validate detail view details
//defining globally to be able to use the same for all patient sub categories such as insurance, demographics
export const validateDetailViewPagePatient = async (page: Page) => {
  const expectedStatus = 'Active'
  const expectedDefaultCountry = 'United States of America (the)'

  await page.waitForSelector('[data-testid="patient-details-title"]')
  const actualTitleDetailPatient = await page.innerText(
    '[data-testid="patient-details-title"]'
  )
  await page.click('[aria-label="remove"]')

  await page.hover(
    '(//*[@data-testid="patient-status"])//preceding-sibling::span[2]'
  )

  let actualDob = await page.innerText('(//*[@class="ant-tooltip-inner"])[2]')

  const actualStatus = await page.innerText('[data-testid="patient-status"]')

  // const actualStatusColor = await page.getAttribute(
  //   '[data-testid="patient-status"]',
  //   'color'
  // )

  const actualDefaultConutry = await page.innerText(
    '[data-testid="demographics-current-add-value"]'
  )

  expect(actualTitleDetailPatient).toContain(
    expectedTitle +
      ' ' +
      expectedLastName +
      ', ' +
      expectedFirstName +
      ' ' +
      expectedMiddleName[0]
  )

  expect(actualDob).toContain(expectedDob)
  expect(actualStatus).toBe(expectedStatus)
  //expect(actualStatusColor).toBe('green')
  //issue raised in jira
  //expect(actualDefaultConutry).toBe(expectedDefaultCountry)
}

//function to open note template tab
export const openNoteTemplateTab = async (page: Page) => {
  await page.waitForSelector('[data-testid="activity-Administrative"]')
  await page.click('[data-testid="activity-Administrative"]')

  //opening the note-template list view
  await page.waitForSelector('[data-testid="menu-NoteTemplates"]')
  await page.click('[data-testid="menu-NoteTemplates"]')
}
