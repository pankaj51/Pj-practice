import expect from 'expect'
import { page, randomSsnGenerator } from '../shared/constants'
import { login } from '../shared/utils'

const globalRandomNumber = randomSsnGenerator().toString()
const inputFirstName = 'Pankaj'
const inputMiddleName = 'J'
const inputLastName = 'Jain'
let title: string | null = ''
let username: string | null = ''
let gender: string | null = ''
let dob: string | null = ''
let expectedUserType: string | null = ''
let expectedNPI: string | null = ''
let expectedDEA: string | null = ''
let expectedDeaExpirationDate: string | null = ''
let expectedStateLicense: string | null = ''
let expectedStateLicenseExpirationDate: string | null = ''
let expectedState: string | null = ''
let expectedAccessGroup: string[] = []

describe('Create user', () => {
  it('login with username and password', async () => {
    const username = 'rucheta7'
    const password = 'Rucheta@123'
    await login(page, username, password)
  })

  it('should able to open the add user form', async () => {
    await page.waitForSelector('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="menu-Users"]')
    await page.click('css=[data-testid="add-user-button"]')
  })

  it('should show correct tab name', async () => {
    const userTabName = await page.innerText(
      '.ant-tabs-tab.ant-tabs-tab-with-remove.ant-tabs-tab-active'
    )
    expect(userTabName).toBe('Add User')
  })

  // it('should check the list of Title', async () => {

  //   let flag = false
  //   let dropDownListOfTitle: string[] = ['Mx.','Mr.','Mrs.','Miss.','Ms.','Mstr.','Dr.','Prof.','Rev.','Sir','Sister']
  //   await page.click('css=[data-testid="add-user-title"]')
  //   // const titleListInnerText = await page.innerText('.rc-virtual-list-holder-inner')
  //   // const titleListArray = titleListInnerText.split("\n")
  //   const titleListInnerText:string[] = []
  //   let counter = 0
  //   for (const element of dropDownListOfTitle) {
  //     counter = counter + 1
  //     titleListInnerText.push(await page.innerText('css=[data-testid="' + element + '"]'))
  //     if (counter == 5) {
  //       const element = await page.$('.rc-virtual-list-holder-inner')
  //       element?.scrollIntoViewIfNeeded()
  //     }
  //     console.log(counter)
  //     console.log(titleListInnerText)
  //   }

  //   const titles = dropDownListOfTitle.filter(title => titleListInnerText.includes(title))
  //   console.log(titles.length)
  //   console.log(dropDownListOfTitle.length)
  //   if (titles.length === dropDownListOfTitle.length){
  //    flag = true
  //   }

  //   expect(flag).toBe(true)
  // })

  it('should check the list of Identifying Gender', async () => {
    let flag = false
    let dropDownListOfGender: string[] = [
      'Identifies as Male',
      'Identifies as Female',
      'Female-to-Male',
      'Male-to-Female',
      'Genderqueer',
      'Other',
      'Choose not to disclose'
    ]
    await page.click('css=[data-testid="add-user-gender"]')
    const genderListInnerText = await page.innerText(
      '[data-testid="add-user-gender"] div[class="rc-virtual-list"]'
    )
    const genderListArray = genderListInnerText.split('\n')

    const genders = dropDownListOfGender.filter(gender =>
      genderListArray.includes(gender)
    )
    if (genders.length === dropDownListOfGender.length) {
      flag = true
    }

    expect(flag).toBe(true)
  })

  it('should show validation message for all mandatory fields', async () => {
    let flag1 = false
    let flag2 = false
    await page.click('#create-user-submit')
    const expectedMandatoryValidationMessages: string[] = [
      'Select an option',
      'First name is required',
      'Last name is required',
      'Select an option',
      'Date of Birth is required',
      'This is a required field',
      'Email is required',
      'Select an option'
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

  it('should give validation error message if email address and SSN number already exists', async () => {
    await page.click('css=[data-testid="add-user-title"]')
    await page.click('css=[data-testid="Mr."]')
    await page.fill('css=[data-testid="add-user-first-name"]', inputFirstName)
    await page.fill('css=[data-testid="add-user-middle-name"]', inputMiddleName)
    await page.fill('css=[data-testid="add-user-last-name"]', inputLastName)
    await page.fill('css=[data-testid="add-user-ssn"]', '121212121')
    await page.click('css=[data-testid="add-user-gender"]')
    await page.click('css=[data-testid="identifies_as_male"]')
    await page.click('css=[data-testid="add-user-dob"]')
    await page.click('.ant-picker-month-btn')
    await page.click('css=[title="2003-01"]')
    await page.click('css=[title="2003-01-01"]')

    await page.click('css=[data-testid="add-user-auto-generate-btn"]')
    // await page.waitForFunction('document.getElementById("username_field").value != ""', {})
    await page.fill(
      'css=[data-testid="add-user-email"]',
      'pankaj@theprocedure.in'
    )
    await page.click('css=[data-testid="add-user-user-type"]')
    await page.click('css=[data-testid="doctor"]')
    await page.fill('css=[data-testid="add-user-npi"]', '1558444216')
    await page.fill('css=[data-testid="add-user-dea"]', 'EB7344196')
    await page.fill(
      'css=[data-testid="add-user-state-license"]',
      'MH1420110062821'
    )
    await page.fill('css=[data-testid="add-user-state"]', 'New York')

    await page.click('#create-user-submit')

    const ssnUniqueValidationMessage = await page.innerText(
      '//div[contains(text(),"This social security number has already been taken")]'
    )
    expect(ssnUniqueValidationMessage).toBe(
      'This social security number has already been taken.'
    )

    const emailUniqueValidationMessage = await page.innerText(
      '//div[contains(text(),"This field must be unique.")]'
    )
    expect(emailUniqueValidationMessage).toBe('This field must be unique.')
  })

  it('should give validation error message on enter alphanumeric value in SSN field', async () => {
    await page.fill('css=[data-testid="add-user-ssn"]', 'asdfqwer')

    const ssnFormatValidationMessage = await page.innerText(
      '//div[contains(text(),"Enter a valid SSN")]'
    )
    expect(ssnFormatValidationMessage).toBe('Enter a valid SSN')
  })

  it('should give validation error message on enter invalid format of email in email address field', async () => {
    await page.fill('css=[data-testid="add-user-email"]', 'asdfqwer')

    const emailFormatValidationMessage = await page.innerText(
      '//div[contains(text(),"This is not a valid email format.")]'
    )
    expect(emailFormatValidationMessage).toBe(
      'This is not a valid email format.'
    )
  })

  it('should able to create a user', async () => {
    await page.click('css=[data-testid="add-user-title"]')
    await page.click('css=[data-testid="Mr."]')
    await page.fill('css=[data-testid="add-user-first-name"]', inputFirstName)
    await page.fill('css=[data-testid="add-user-middle-name"]', inputMiddleName)
    await page.fill('css=[data-testid="add-user-last-name"]', inputLastName)
    await page.fill('css=[data-testid="add-user-ssn"]', globalRandomNumber)

    const emailUniqueValidationMessage = await page.innerText(
      '//div[contains(text(),"This field must be unique.")]'
    )
    expect(emailUniqueValidationMessage).toBe('This field must be unique.')
  })

  it('should give validation error message on enter alphanumeric value in SSN field', async () => {
    await page.fill('css=[data-testid="add-user-ssn"]', 'asdfqwer')

    const ssnFormatValidationMessage = await page.innerText(
      '//div[contains(text(),"Enter a valid SSN")]'
    )
    expect(ssnFormatValidationMessage).toBe('Enter a valid SSN')
  })

  it('should give validation error message on enter invalid format of email in email address field', async () => {
    await page.fill('css=[data-testid="add-user-email"]', 'asdfqwer')

    const emailFormatValidationMessage = await page.innerText(
      '//div[contains(text(),"This is not a valid email format.")]'
    )
    expect(emailFormatValidationMessage).toBe(
      'This is not a valid email format.'
    )
  })

  it('should able to create a user', async () => {
    let accessGroupInnerText: string[] = []
    await page.click('css=[data-testid="add-user-title"]')
    await page.click('css=[data-testid="Mr."]')
    await page.fill('css=[data-testid="add-user-first-name"]', inputFirstName)
    await page.fill('css=[data-testid="add-user-middle-name"]', inputMiddleName)
    await page.fill('css=[data-testid="add-user-last-name"]', inputLastName)
    await page.fill('css=[data-testid="add-user-ssn"]', globalRandomNumber)
    await page.click('css=[data-testid="add-user-gender"]')
    await page.click('css=[data-testid="identifies_as_male"]')
    await page.click('css=[data-testid="add-user-dob"]')
    await page.click('.ant-picker-month-btn')
    await page.click('css=[title="2003-01"]')
    await page.click('css=[title="2003-01-01"]')
    await page.click('css=[data-testid="add-user-auto-generate-btn"]')
    await page.fill(
      'css=[data-testid="add-user-email"]',
      'pankaj+' + globalRandomNumber + '@theprocedure.in'
    )
    await page.click('css=[data-testid="add-user-user-type"]')
    await page.click('css=[data-testid="physician_assistant"]')
    await page.fill('css=[data-testid="add-user-npi"]', '1558444216')
    await page.fill('css=[data-testid="add-user-dea"]', 'EB7344196')
    await page.click('css=[data-testid="add-user-dea-expiration-date"]')
    await page.fill(
      'css=[data-testid="add-user-dea-expiration-date"]',
      '02-05-2021'
    )
    await page.fill(
      'css=[data-testid="add-user-state-license"]',
      'MH1420110062821'
    )
    await page.click(
      'css=[data-testid="add-user-state-license-expiration-date"]'
    )
    await page.fill(
      'css=[data-testid="add-user-state-license-expiration-date"]',
      '02-05-2021'
    )
    await page.fill('css=[data-testid="add-user-state"]', 'New York')

    const accessGroupListArray = [
      'ea716c5a-edd2-478d-b4fa-6b6ae5db2ca2',
      'c1bb919a-2ac7-471a-81f3-aa337f0c1ef7'
    ]
    for (let index = 0; index < accessGroupListArray.length; index++) {
      await page.click(
        'css=[data-testid="add-user-access-management-dropdown"]'
      )
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      const varaccessGroup = await page.innerText(
        'css=[data-testid="add-user-access-management-dropdown"]'
      )
      const varaccessGroupSplit = varaccessGroup.split('\n')
      accessGroupInnerText.push(varaccessGroupSplit[1])
      await page.click('css=[data-testid="add-user-add-access-management"]')
    }
    expectedUserType = await page.innerText(
      'css=[data-testid="add-user-user-type"]'
    )
    expectedNPI = await page.getAttribute(
      'css=[data-testid="add-user-npi"]',
      'value'
    )
    expectedDEA = await page.getAttribute(
      'css=[data-testid="add-user-dea"]',
      'value'
    )
    expectedDeaExpirationDate = await page.getAttribute(
      'css=[data-testid="add-user-dea-expiration-date"]',
      'value'
    )
    expectedStateLicense = await page.getAttribute(
      'css=[data-testid="add-user-state-license"]',
      'value'
    )
    expectedStateLicenseExpirationDate = await page.getAttribute(
      'css=[data-testid="add-user-state-license-expiration-date"]',
      'value'
    )
    expectedState = await page.getAttribute(
      'css=[data-testid="add-user-state"]',
      'value'
    )
    expectedAccessGroup = accessGroupInnerText

    await page.click('#create-user-submit')

    title = await page.innerText('css=[data-testid="add-user-title"]')
    gender = await page.innerText('css=[data-testid="add-user-gender"]')
    dob = await page.getAttribute('css=[data-testid="add-user-dob"]', 'value')
    username = await page.getAttribute('#username_field', 'value')

    await page.waitForSelector('css=[data-testid="user-detail-view-heading"]')
    const userDetailViewTitle = await page.innerText(
      'css=[data-testid="user-detail-view-heading"]'
    )
    expect(userDetailViewTitle).toBe(
      title + ' ' + inputFirstName + ' ' + inputLastName
    )
  }, 30000)
})

describe('List view', () => {
  it('should able to find the recent created user', async () => {
    await page.click('div.ant-tabs-nav-wrap > div > div:nth-child(3) > button')
    await page.fill(
      '//input[@placeholder="Search users"]',
      'pankaj+' + globalRandomNumber + '@theprocedure.in'
    )
    const email = await page.innerText(
      '//td[contains(text(),"pankaj+' +
        globalRandomNumber +
        '@theprocedure.in")]'
    )

    expect(email).toBe('pankaj+' + globalRandomNumber + '@theprocedure.in')
  })
})

describe('Detail view', () => {
  it('should show correct details', async () => {
    await page.click(
      '//td[contains(text(),"pankaj+' +
        globalRandomNumber +
        '@theprocedure.in")]'
    )
    await page.click('css=[data-testid="show-ssn-button"]')
    await page.click('css=[data-testid="show-username-button"]')
    //wait to convert the value from mask to unmask
    await page.waitForTimeout(1000)

    const getSsn = await page.innerText('css=[data-testid="ssn-value"]')
    const getGender = await page.innerText('css=[data-testid="gender-value"]')
    const getDob = await page.innerText('css=[data-testid="dob-value"]')
    const getUsername = await page.innerText(
      'css=[data-testid="username-value"]'
    )
    const getEmailId = await page.innerText('css=[data-testid="email-value"]')
    const getUserType = await page.innerText(
      'css=[data-testid="user-user-type-value"]'
    )
    const getNPI = await page.innerText('css=[data-testid="user-npi-value"]')
    const getDEA = await page.innerText('css=[data-testid="user-dea-value"]')
    const getDeaExpirationDate = await page.innerText(
      'css=[data-testid="user-dea-license-expiration-date-value"]'
    )
    const getStateLicense = await page.innerText(
      'css=[data-testid="user-state-license-value"]'
    )
    const getStateLicenseExpirationDate = await page.innerText(
      'css=[data-testid="user-state-license-expiration-date-value"]'
    )
    const getState = await page.innerText(
      'css=[data-testid="user-state-value"]'
    )
    const actualAccessGroup: string[] = []
    for (let index = 0; index < expectedAccessGroup.length; index++) {
      await page.fill(
        '//input[@placeholder="Search"]',
        expectedAccessGroup[index]
      )
      await page.waitForTimeout(2000) //wait for debounce
      actualAccessGroup.push(
        await page.innerText(
          "//td[contains(text(),'" + expectedAccessGroup[index] + "')]"
        )
      )
    }

    expect(getSsn).toBe(globalRandomNumber.slice(0, 9))
    expect(getGender).toBe(gender)
    expect(getDob).toBe(dob)
    expect(getUsername).toBe(username)
    expect(getEmailId).toBe('pankaj+' + globalRandomNumber + '@theprocedure.in')
    expect(getUserType).toBe(expectedUserType)
    expect(getNPI).toBe(expectedNPI)
    expect(getDEA).toBe(expectedDEA)
    expect(getDeaExpirationDate).toBe(expectedDeaExpirationDate)
    expect(getStateLicense).toBe(expectedStateLicense)
    expect(getStateLicenseExpirationDate).toBe(
      expectedStateLicenseExpirationDate
    )
    expect(getState).toBe(expectedState)
    for (let index = 0; index < expectedAccessGroup.length; index++) {
      expect(actualAccessGroup[index]).toBe(expectedAccessGroup[index])
    }
  })
})

describe('Edit user', () => {
  it('should have prefilled data in all fields', async () => {
    await page.click('.ant-btn.ant-btn-primary.mr-2')
    //wait to convert the value from mask to unmask
    await page.waitForTimeout(3000)

    const getTitle = await page.innerText('css=[data-testid="add-user-title"]')
    const getFisrtName = await page.getAttribute(
      'css=[data-testid="add-user-first-name"]',
      'value'
    )
    const getMiddleName = await page.getAttribute(
      'css=[data-testid="add-user-middle-name"]',
      'value'
    )
    const getLastName = await page.getAttribute(
      'css=[data-testid="add-user-last-name"]',
      'value'
    )
    const getSsn = await page.getAttribute(
      'css=[data-testid="add-user-ssn"]',
      'value'
    )
    const getGender = await page.innerText(
      'css=[data-testid="add-user-gender"]'
    )
    const getDob = await page.getAttribute(
      'css=[data-testid="add-user-dob"]',
      'value'
    )
    const getUsername = await page.getAttribute('#username_field', 'value')
    const getEmailId = await page.getAttribute(
      'css=[data-testid="add-user-email"]',
      'value'
    )
    const getUserType = await page.innerText(
      'css=[data-testid="add-user-user-type"]'
    )
    const getNPI = await page.getAttribute(
      'css=[data-testid="add-user-npi"]',
      'value'
    )
    const getDEA = await page.getAttribute(
      'css=[data-testid="add-user-dea"]',
      'value'
    )
    const getDeaExpirationDate = await page.getAttribute(
      'css=[data-testid="add-user-dea-expiration-date"]',
      'value'
    )
    const getStateLicense = await page.getAttribute(
      'css=[data-testid="add-user-state-license"]',
      'value'
    )
    const getStateLicenseExpirationDate = await page.getAttribute(
      'css=[data-testid="add-user-state-license-expiration-date"]',
      'value'
    )
    const getState = await page.getAttribute(
      'css=[data-testid="add-user-state"]',
      'value'
    )
    const actualAccessGroup: string[] = []
    for (let index = 0; index < expectedAccessGroup.length; index++) {
      actualAccessGroup.push(
        await page.innerText(
          "//td[contains(text(),'" + expectedAccessGroup[index] + "')]"
        )
      )
    }

    expect(getTitle).toBe(title)
    expect(getFisrtName).toBe(inputFirstName)
    expect(getMiddleName).toBe(inputMiddleName)
    expect(getLastName).toBe(inputLastName)
    expect(getSsn).toBe(globalRandomNumber.slice(0, 9))
    expect(getGender).toBe(gender)
    expect(getDob).toBe(dob)
    expect(getUsername).toBe(username)
    expect(getEmailId).toBe('pankaj+' + globalRandomNumber + '@theprocedure.in')
    expect(getUserType).toBe(expectedUserType)
    expect(getNPI).toBe(expectedNPI)
    expect(getDEA).toBe(expectedDEA)
    expect(getDeaExpirationDate).toBe(expectedDeaExpirationDate)
    expect(getStateLicense).toBe(expectedStateLicense)
    expect(getStateLicenseExpirationDate).toBe(
      expectedStateLicenseExpirationDate
    )
    expect(getState).toBe(expectedState)
    for (let index = 0; index < expectedAccessGroup.length; index++) {
      expect(actualAccessGroup[index]).toBe(expectedAccessGroup[index])
    }
  })
})

describe('User Types', () => {
  it('should work with all user types', async () => {
    const userTypeAdditionalFields = ['doctor', 'nurse_practitioner']
    const userTypeTextAdditionalFields = ['Doctor', 'Nurse Practitioner']
    for (let i = 0; i < userTypeAdditionalFields.length; i++) {
      await page.click('css=[data-testid="add-user-user-type"]')
      await page.type(
        'css=[data-testid="add-user-user-type"]',
        '' + userTypeTextAdditionalFields[i] + ''
      )
      await page.click(
        'css=[data-testid="' + userTypeAdditionalFields[i] + '"]'
      )
      await page.fill('css=[data-testid="add-user-npi"]', '1558444216')
      await page.fill('css=[data-testid="add-user-dea"]', 'EB7344196')
      await page.click('css=[data-testid="add-user-dea-expiration-date"]')
      await page.fill(
        'css=[data-testid="add-user-dea-expiration-date"]',
        '02-05-2021'
      )
      await page.fill(
        'css=[data-testid="add-user-state-license"]',
        'MH1420110062821'
      )
      await page.click(
        'css=[data-testid="add-user-state-license-expiration-date"]'
      )
      await page.fill(
        'css=[data-testid="add-user-state-license-expiration-date"]',
        '02-05-2021'
      )
      await page.fill('css=[data-testid="add-user-state"]', 'New York')
      expectedUserType = await page.innerText(
        'css=[data-testid="add-user-user-type"]'
      )
      await page.click('#create-user-submit')

      const getUserType = await page.innerText(
        'css=[data-testid="user-user-type-value"]'
      )
      const getNPI = await page.innerText('css=[data-testid="user-npi-value"]')
      const getDEA = await page.innerText('css=[data-testid="user-dea-value"]')
      const getDeaExpirationDate = await page.innerText(
        'css=[data-testid="user-dea-license-expiration-date-value"]'
      )
      const getStateLicense = await page.innerText(
        'css=[data-testid="user-state-license-value"]'
      )
      const getStateLicenseExpirationDate = await page.innerText(
        'css=[data-testid="user-state-license-expiration-date-value"]'
      )
      const getState = await page.innerText(
        'css=[data-testid="user-state-value"]'
      )

      expect(getUserType).toBe(expectedUserType)
      expect(getNPI).toBe('1558444216')
      expect(getDEA).toBe('EB7344196')
      expect(getDeaExpirationDate).toBe('02-05-2021')
      expect(getStateLicense).toBe('MH1420110062821')
      expect(getStateLicenseExpirationDate).toBe('02-05-2021')
      expect(getState).toBe('New York')
      await page.click('.ant-btn.ant-btn-primary.mr-2')
    }

    //Dietician
    await page.click('css=[data-testid="add-user-user-type"]')
    await page.click('css=[data-testid="dietician"]')
    await page.fill(
      'css=[data-testid="add-user-state-license"]',
      'MH1420110062821'
    )
    await page.click(
      'css=[data-testid="add-user-state-license-expiration-date"]'
    )
    await page.fill(
      'css=[data-testid="add-user-state-license-expiration-date"]',
      '02-05-2021'
    )
    await page.fill('css=[data-testid="add-user-state"]', 'New York')
    expectedUserType = await page.innerText(
      'css=[data-testid="add-user-user-type"]'
    )
    await page.click('#create-user-submit')

    const actualUserTypeDietician = await page.innerText(
      'css=[data-testid="user-user-type-value"]'
    )
    const actualStateLicense = await page.innerText(
      'css=[data-testid="user-state-license-value"]'
    )
    const actualStateLicenseExpirationDate = await page.innerText(
      'css=[data-testid="user-state-license-expiration-date-value"]'
    )
    const actualState = await page.innerText(
      'css=[data-testid="user-state-value"]'
    )

    expect(actualUserTypeDietician).toBe(expectedUserType)
    expect(actualStateLicense).toBe('MH1420110062821')
    expect(actualStateLicenseExpirationDate).toBe('02-05-2021')
    expect(actualState).toBe('New York')

    //Social Worker
    const userTypeWithLicense = [
      'social_worker',
      'pharmacist',
      'nurse',
      'vocational_nurse'
    ]
    const userTypeTextWithLicense = [
      'Social Worker',
      'Pharmacist',
      'Nurse',
      'Vocational Nurse'
    ]
    for (let i = 0; i < userTypeWithLicense.length; i++) {
      await page.click('.ant-btn.ant-btn-primary.mr-2')
      await page.click('css=[data-testid="add-user-user-type"]')
      await page.type(
        'css=[data-testid="add-user-user-type"]',
        '' + userTypeTextWithLicense[i] + ''
      )
      await page.click('css=[data-testid="' + userTypeWithLicense[i] + '"]')
      await page.fill(
        'css=[data-testid="add-user-license-number"]',
        'MH1420110062821'
      )
      await page.click('css=[data-testid="add-user-license-expiration-date"]')
      await page.fill(
        'css=[data-testid="add-user-license-expiration-date"]',
        '02-05-2021'
      )
      expectedUserType = await page.innerText(
        'css=[data-testid="add-user-user-type"]'
      )
      await page.click('#create-user-submit')

      const actualUserTypeWithLicense = await page.innerText(
        'css=[data-testid="user-user-type-value"]'
      )
      const actualLicenseNumber = await page.innerText(
        'css=[data-testid="user-licence-number-value"]'
      )
      const actualLicenseExpirationDate = await page.innerText(
        'css=[data-testid="user-licence-expiration-date-value"]'
      )

      expect(actualUserTypeWithLicense).toBe(expectedUserType)
      expect(actualLicenseNumber).toBe('MH1420110062821')
      expect(actualLicenseExpirationDate).toBe('02-05-2021')
    }

    //Office Assistant
    const userTypeWithBasicInfo = [
      'office_assistant',
      'living_donor_advocate',
      'quality_coordinator',
      'financial_counselor',
      'director',
      'other'
    ]
    const userTypeTextWithBasicInfo = [
      'Office Assistant',
      'Living Donor Advocate',
      'Quality Coordinator',
      'Financial Counselor',
      'Director',
      'Other'
    ]
    for (let i = 0; i < userTypeWithBasicInfo.length; i++) {
      await page.click('.ant-btn.ant-btn-primary.mr-2')
      await page.click('css=[data-testid="add-user-user-type"]')
      await page.type(
        'css=[data-testid="add-user-user-type"]',
        '' + userTypeTextWithBasicInfo[i] + ''
      )
      await page.click('css=[data-testid="' + userTypeWithBasicInfo[i] + '"]')
      const expectedUserTypeInnerText = await page.innerText(
        'css=[data-testid="add-user-user-type"]'
      )
      const expectedUserTypeArray = expectedUserTypeInnerText.split('\n')
      expectedUserType = expectedUserTypeArray[1]
      await page.click('#create-user-submit')

      const actualUserTypeWithBasicInfo = await page.innerText(
        'css=[data-testid="user-user-type-value"]'
      )

      expect(actualUserTypeWithBasicInfo).toBe(expectedUserType)
    }
  }, 300000)
})
