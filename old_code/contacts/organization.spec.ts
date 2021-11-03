import expect from 'expect'
import { page, randomNumeric } from '../shared/constants'

const gloabalNumericAddress = randomNumeric(5)
const inputAddressLine1 = 'Address Line 1'
const inputAddressLine2 = 'Address Line 2'
const inputCity = 'Mumbai'
const inputStateCode = 'CA'
const inputZipCode = '94110'

let expectedOrganizationType: string | null = ''
let expectedCountry: string | null = ''

describe('Create user', () => {
  it('should login successfully', async () => {
    const inputUsername = 'Pankaj@12'
    const inputPassword = 'Pankaj@123'
    await page.waitForSelector('css=[data-testid="auth-username-username"]')
    await page.fill('css=[data-testid="auth-username-username"]', inputUsername)
    await page.click('css=[data-testid="auth-username-continue"]')

    //auth-login-password
    await page.waitForSelector('css=[data-testid="auth-login-password"]')
    await page.fill('css=[data-testid="auth-login-password"]', inputPassword)
    await page.click('css=[data-testid="auth-login-continue"]')
  })

  it('should able to create organization', async () => {
    await page.click('css=[data-testid="activity-Contacts"]')
    await page.click('css=[data-testid="menu-Organizations"]')
    await page.click('css=[data-testid="add-organization-button"]')
    await page.fill('css=[data-testid="add-organization-name"]', 'Procedure')
    await page.click('css=[data-testid="add-organization-type"]')
    await page.click('css=[data-testid="dialysis_center"]')
    await page.fill(
      'css=[data-testid="add-organization-phone-number"]',
      '1234567890'
    )
    await page.fill('css=[data-testid="add-facility-fax"]', '1234567890')
    await page.fill(
      'css=[data-testid="add-organization-email"]',
      'pankaj+' + gloabalNumericAddress + '@theprocedure.in'
    )
    await page.fill('css=[data-testid="add-org-add1"]', inputAddressLine1)
    await page.fill('css=[data-testid="add-org-add2"]', inputAddressLine2)
    await page.fill('css=[data-testid="add-facility-city"]', inputCity)
    await page.fill('css=[data-testid="add-org-state"]', inputStateCode)
    await page.fill('css=[data-testid="add-org-zip-code"]', inputZipCode)
    await page.click('css=[data-testid="add-org-country"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.fill('css=[data-testid="add-facility-name"]', 'Doctor')
    await page.click(
      "//body/div[@id='__next']/section[1]/section[1]/section[1]/section[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/form[1]/div[1]/div[8]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]"
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click("//span[contains(text(), 'Link')]")

    let scores = new Map<string, number>()
    // expectedEmail = ''
    // scores.set()
    await page.click('#submit-organization')
  })
})
