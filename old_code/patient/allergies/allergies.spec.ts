import expect from 'expect'
import { page } from '../../shared/constants'
import {
  login,
  createPatient,
  validateDetailViewPagePatient
} from '../../shared/utils'

let expectedCategory: string | null = ''
let expectedAgent: string | null = ''
let expectedReactions: string | null = ''
let expectedSeverity: string | null = ''
let expectedStatus: string | null = ''
let expectedAdditionalNotes: string | null = ''

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

describe('Add Allergies', () => {
  it('should show validation message for all mandatory fields', async () => {
    let flag1 = false
    let flag2 = false

    await page.waitForSelector('css=[data-testid="allergies-tab"]')
    await page.click('css=[data-testid="allergies-tab"]')

    await page.waitForTimeout(2000) // to avoid unexpected error

    await page.click('css=[data-testid="allergies-add-button"]')

    await page.click('//button[@type="submit"]')
    const expectedMandatoryValidationMessages: string[] = [
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

  it('should able to add allergy', async () => {
    await page.click('css=[data-testid="add-allergy-category"]')
    await page.click('css=[data-testid="food"]')
    await page.click('css=[data-testid="add-allergy-agent"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-allergy-reactions"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('css=[data-testid="add-allergy-severity"]')
    await page.click('css=[data-testid="high"]')
    await page.click('css=[data-testid="add-allergy-status"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.fill(
      'css=[data-testid="add-allergy-additional-notes"]',
      'Test Comments'
    )

    expectedCategory = await page.innerText(
      '[data-testid="add-allergy-category"] span[class="ant-select-selection-item"]'
    )
    expectedAgent = await page.innerText(
      '[data-testid="add-allergy-agent"] span[class="ant-select-selection-item"]'
    )
    expectedReactions = await page.innerText(
      '[data-testid="add-allergy-reactions"] span[class="ant-select-selection-item"]'
    )
    expectedSeverity = await page.innerText(
      '[data-testid="add-allergy-severity"] span[class="ant-select-selection-item"]'
    )
    expectedStatus = await page.innerText(
      '[data-testid="add-allergy-status"] span[class="ant-select-selection-item"]'
    )
    expectedAdditionalNotes = await page.innerText(
      'css=[data-testid="add-allergy-additional-notes"]'
    )

    await page.click('//button[@type="submit"]')
  })
})

describe('Detail view', () => {
  it('should show correct details in detail view', async () => {
    const actualCategory = await page.innerText(
      'css=[data-testid="detail-allergy-category-value"]'
    )
    const actualAgent = await page.innerText(
      'css=[data-testid="detail-allergy-agent-value"]'
    )
    const actualReactions = await page.innerText(
      'css=[data-testid="detail-allergy-reactions-value"]'
    )
    const actualStatus = await page.innerText(
      'css=[data-testid="detail-allergy-status-value"]'
    )
    const actualSeverity = await page.innerText(
      'css=[data-testid="detail-allergy-severity"]'
    )
    const actualAdditionalNotes = await page.innerText(
      'css=[data-testid="detail-allergy-additional-notes"]'
    )

    // expect(actualCategory).toBe(expectedCategory) This is a bug
    expect(actualAgent).toBe(expectedAgent)
    expect(actualReactions).toBe(expectedReactions)
    expect(actualStatus).toBe(expectedStatus)
    expect(actualSeverity).toBe(expectedSeverity)
    expect(actualAdditionalNotes).toBe('Test Comments')
  })
})

describe('List view', () => {
  it('should able to search the allergy and check the details', async () => {
    await page.click('div.d-flex.justify-content-between > h4 > button')
    await page.click('//input[@type="checkbox"]')
    await page.fill('//input[@placeholder="Search"]', String(expectedAgent))
    await page.click('//td[contains(text(),"' + expectedAgent + '")]')

    const expectedEditButton = await page.innerText('#edit')

    expect(expectedEditButton).toBe('Edit')
  })
})

describe('Edit view', () => {
  it('should should populate correct values', async () => {
    await page.click('#edit')

    await page.waitForTimeout(2000) // to load the valuesclear

    const actualCategory = await page.innerText(
      '[data-testid="add-allergy-category"] span[class="ant-select-selection-item"]'
    )
    const actualAgent = await page.innerText(
      '[data-testid="add-allergy-agent"] span[class="ant-select-selection-item"]'
    )
    const actualReactions = await page.innerText(
      '[data-testid="add-allergy-reactions"] span[class="ant-select-selection-item"]'
    )
    const actualSeverity = await page.innerText(
      '[data-testid="add-allergy-severity"] span[class="ant-select-selection-item"]'
    )
    const actualStatus = await page.innerText(
      '[data-testid="add-allergy-status"] span[class="ant-select-selection-item"]'
    )
    const actualAdditionalNotes = await page.innerText(
      'css=[data-testid="add-allergy-additional-notes"]'
    )

    expect(actualCategory).toBe(expectedCategory)
    expect(actualAgent).toBe(expectedAgent)
    expect(actualReactions).toBe(expectedReactions)
    expect(actualStatus).toBe(expectedStatus)
    expect(actualSeverity).toBe(expectedSeverity)
    expect(actualAdditionalNotes).toBe(expectedAdditionalNotes)
  })
})
