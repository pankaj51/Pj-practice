import expect from 'expect'
import { page } from '../shared/constants'

describe('Auth', () => {
  it('should show correct title', async () => {
    const title = await page.title()
    expect(title).toBe('Login | House Works')
  })

  it('should give error message on enter invalid username', async () => {
    const usernameInput = 'Pankaj'
    await page.fill('css=[data-testid="auth-username-username"]', usernameInput)
    await page.click('css=[data-testid="auth-username-continue"]')
    const invalidUsernameErrorMessage = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(invalidUsernameErrorMessage).toBe('Invalid username')
  })

  it('should give error message on empty field of username', async () => {
    await page.fill('css=[data-testid="auth-username-username"]', '')
    const usernameEmptyMessage = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(usernameEmptyMessage).toBe('Please enter your username')
  })

  //Positive scenario
  it('should continue on enter correct username', async () => {
    const inputUsername = 'Pankaj@123'
    await page.waitForSelector('css=[data-testid="auth-username-username"]')
    await page.fill('css=[data-testid="auth-username-username"]', inputUsername)
    await page.click('css=[data-testid="auth-username-continue"]')
    await page.waitForSelector('css=[data-testid="auth-login-username"]')
    const username = await page.getAttribute(
      'css=[data-testid="auth-login-username"]',
      'value'
    )
    expect(username).toBe(inputUsername)
  })

  it('should give error message on password entered less than 8 characters', async () => {
    const inputPassword = 'asdfqwe'
    await page.waitForSelector('css=[data-testid="auth-login-password"]')
    await page.fill('css=[data-testid="auth-login-password"]', inputPassword)
    const passwordErrorMessage = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(passwordErrorMessage).toBe('Minimum 8 characters are required')
    //to check the button is in disabled state
    const buttonStatus = await page.getAttribute(
      '#password-continue',
      'disabled'
    )
    expect(buttonStatus).toBeDefined()
  })

  it('should give error message for invalid password', async () => {
    const inputPassword = 'asdfqwer'
    await page.type('css=[data-testid="auth-login-password"]', inputPassword, {
      delay: 100
    })
    await page.click('#password-continue')
    const passwordErrorMessage = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(passwordErrorMessage).toBe('Invalid password')
    //to check button is in enabled state
    const buttonStatus = await page.getAttribute(
      '#password-continue',
      'disabled'
    )
    expect(buttonStatus).toBeNull()
  })

  it('should visible the password onclick crossed eye icon', async () => {
    await page.click('css=[data-icon="eye-invisible"]')
    const passwordVisible = await page.getAttribute(
      '.ant-input-password.ant-input-affix-wrapper input',
      'type'
    )
    expect(passwordVisible).toBe('text')
  })

  it('should hide the password onclick eye icon', async () => {
    await page.click('css=[data-icon="eye"]')
    const passwordNotVisible = await page.getAttribute(
      '.ant-input-password.ant-input-affix-wrapper input',
      'type'
    )
    expect(passwordNotVisible).toBe('password')
  })

  it('should give error message on empty field of password', async () => {
    await page.fill('css=[data-testid="auth-login-password"]', '')
    const passwordEmptyMessage = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(passwordEmptyMessage).toBe('Please enter your password')
  })

  it('should successfully login into HW', async () => {
    const inputPassword = 'Pankaj@123'
    await page.fill('css=[data-testid="auth-login-password"]', inputPassword)
    await page.click('#password-continue')
    await page.waitForFunction(
      'window.location.href == "https://staging-emr.houseworksinc.co/dashboard"'
    )
    const dashboard = await page.url()
    expect(dashboard).toBe('https://staging-emr.houseworksinc.co/dashboard')

    const title = await page.title()
    expect(title).toBe('Dashboard | House Works')
  })
})

//div.ant-tabs-nav-wrap > div > div:nth-child(1) : - tab selector
