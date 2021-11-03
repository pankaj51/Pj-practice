import expect from 'expect'
import { page, randomSsnGenerator } from '../shared/constants'

const globalRandomNumber = randomSsnGenerator().toString()
const inputFirstName = 'Pankaj'
const inputMiddleName = 'J'
const inputLastName = 'Jain'
let title: string | null = ''
let username: string | null = ''
let gender: string | null = ''
let dob: string | null = ''

describe('Create user', () => {
  it('should login successfully', async () => {
    const inputUsername = 'Pankaj@12'
    const inputPassword = 'Pankaj@123'
    await page.waitForSelector('css=[data-testid="auth-username-username"]')
    await page.fill('css=[data-testid="auth-username-username"]', inputUsername)
    await page.click('css=[data-testid="auth-username-continue"]')
    await page.fill('css=[data-testid="auth-login-password"]', inputPassword)
    await page.click('#password-continue')
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

  it('should check the list of Title', async () => {
    let flag = true
    let dropDownListOfTitle: string[] = [
      'Mx.',
      'Mr.',
      'Mrs.',
      'Miss.',
      'Ms.',
      'Mstr.',
      'Dr.',
      'Prof.',
      'Rev.',
      'Sir',
      'Sister'
    ]
    await page.click('css=[data-testid="add-user-title"]')
    const titleList = await page.innerText('.rc-virtual-list-holder-inner')
    const titleListArray = titleList.split('\n')

    for (var title = 0; title < dropDownListOfTitle.length; title++) {
      if (dropDownListOfTitle[title] != titleListArray[title]) {
        flag = false
      }
    }
    expect(flag).toBe(true)
  })

  it('should check the list of Identifying Gender', async () => {
    let flag = true
    let dropDownListOfGender: string[] = [
      'Identifies as Male',
      'Identifies as Female',
      'Female-to-Male',
      'Male-to-Female',
      'Genderqueer',
      'Other',
      'Choose not to disclose'
    ]
    await page.reload()
    await page.waitForSelector('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="menu-Users"]')
    await page.click('css=[data-testid="add-user-button"]')
    await page.click('css=[data-testid="add-user-gender"]')
    const genderList = await page.innerText('.rc-virtual-list-holder-inner')
    const genderListArray = genderList.split('\n')
    console.log(genderListArray)

    for (var gender = 0; gender < dropDownListOfGender.length; gender++) {
      if (dropDownListOfGender[gender] != genderListArray[gender]) {
        flag = false
      }
    }

    expect(flag).toBe(true)
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
    await page.click('css=[title="2002-01"]')
    await page.click('css=[title="2002-01-01"]')

    await page.click('css=[data-testid="add-user-auto-generate-btn"]')
    await page.fill(
      'css=[data-testid="add-user-email"]',
      'pankaj+1@theprocedure.in'
    )
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
    await page.click('css=[data-testid="add-user-gender"]')
    await page.click('css=[data-testid="identifies_as_male"]')
    await page.click('css=[data-testid="add-user-dob"]')
    await page.click('.ant-picker-month-btn')
    await page.click('css=[title="2002-01"]')
    await page.click('css=[title="2002-01-01"]')
    await page.click('css=[data-testid="add-user-auto-generate-btn"]')
    await page.fill(
      'css=[data-testid="add-user-email"]',
      'pankaj+' + globalRandomNumber + '@theprocedure.in'
    )
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
  })
})

describe('List view', () => {
  it('should able to find the recent created user', async () => {
    await page.reload()
    await page.waitForSelector('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="activity-Administrative"]')
    await page.click('css=[data-testid="menu-Users"]')
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

describe('Edit user', () => {
  it('should have prefilled data in all fields', async () => {
    await page.click(
      '//td[contains(text(),"pankaj+' +
        globalRandomNumber +
        '@theprocedure.in")]'
    )
    await page.click('.ant-btn.ant-btn-primary.mr-2')
    //wait to convert the value from mask to unmask
    await page.waitForTimeout(2000)

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

    expect(getTitle).toBe(title)
    expect(getFisrtName).toBe(inputFirstName)
    expect(getMiddleName).toBe(inputMiddleName)
    expect(getLastName).toBe(inputLastName)
    expect(getSsn).toBe(globalRandomNumber.slice(0, 9))
    expect(getGender).toBe(gender)
    expect(getDob).toBe(dob)
    expect(getUsername).toBe(username)
    expect(getEmailId).toBe('pankaj+' + globalRandomNumber + '@theprocedure.in')
  })
})
