import { expectedErrMsInvalidUsername } from '../shared/constants'
import {
  expectedErrMsgPasswordPolicy,
  onClearErrMsgCode,
  onClearErrMsgPassword,
  expectedErrMsgPasswordNotMatch,
  expectedErrMsgInvalidCode
} from '../shared/constants'

import { page } from '../shared/constants'

describe('forgot-password', () => {
  const invalidUsername = 'Asdfghjk'
  const inputUsername = 'Rucheta@123'
  const newPassword = 'Rucheta@123'
  const invalidPassword = 'abcdef'
  const invalidCodeForPasswordReset = 'rucheta'
  const expectedTitleAfterLogin = 'Login | House Works'

  //login page validation
  it('should show correct title', async () => {
    const title = await page.title()
    expect(title).toBe(expectedTitleAfterLogin)
  })

  //continue button validation on login page
  it('continue button should be disabled for empty username', async () => {
    await page.waitForSelector('[data-testid="auth-username-username"]')
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeDefined()
  })

  //validating correct error message is displayed when invlid username entered and clicked on continue button
  it('error message on invalid username', async () => {
    await page.waitForSelector('[data-testid="auth-username-username"]')
    await page.fill('[data-testid="auth-username-username"]', invalidUsername)
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',

      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeNull()
    await page.click('[data-testid="auth-username-continue"]')

    //waiting for the error messgae
    await page.waitForSelector('[role="alert"]')

    //validating the error message
    const actualErrMsgInvalidUsername = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(actualErrMsgInvalidUsername).toBe(expectedErrMsInvalidUsername)
  })

  //clearing the input field and validating the continue button should be disabled
  it('continue button disabled after clearing usernaem field', async () => {
    await page.waitForSelector('[data-testid="auth-username-username"]')
    await page.fill('[data-testid="auth-username-username"]', '')
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeDefined()
  })

  //positive flow - enter valid username and click on continue button
  it('should enter username and continue', async () => {
    await page.waitForSelector('[data-testid="auth-username-username"]')
    await page.fill('[data-testid="auth-username-username"]', inputUsername)
    //validating the button is enabled
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeNull()

    //click on continue button
    await page.click('[data-testid="auth-username-continue"]')
    await page.waitForSelector('[data-testid="auth-login-username"]')

    //await page.waitForTimeout(1000)

    //validating username on the enter password page
    const username = await page.getAttribute(
      '[data-testid="auth-login-username"]',
      'value'
    )
    //const username = await page.innerText('[data-testid="auth-login-username"]')
    expect(username).toBe(inputUsername)
  })

  //validating continue button is disabled when username field is empty
  it('continue button should be disabled for password reset', async () => {
    //click on the forgot link page
    await page.waitForSelector('[href="/forgot-password"]')
    await page.click('[href="/forgot-password"]')

    await page.waitForSelector('[id="username-continue"]')
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeDefined()
  })

  //enter username on the forgot password link
  it('should enter username on forgot password link', async () => {
    await page.waitForSelector('[class = "ant-input"]')
    //type
    await page.fill('[class = "ant-input"]', inputUsername)
    const usernameContinueButtonStatus = await page.getAttribute(
      '#username-continue',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeNull()
    //await page.waitForTimeout(5000)

    await page.click('[id="username-continue"]')
    // if (await page.waitForSelector('[id="username-continue"]') != null)
    //   await page.click('[id="username-continue"]')
  })

  //validating continue button is disabled when all the input fields are empty
  it('continue button should be disabled for password reset', async () => {
    await page.waitForSelector('[id="change-password"]')
    const usernameContinueButtonStatus = await page.getAttribute(
      '#change-password',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeDefined()
  })

  //validating error message when entered password does not complaint with password length policy
  it('error message on non-compliance of password policy', async () => {
    await page.fill(
      'xpath=(//input[@placeholder="Enter password"])[1]',
      invalidPassword
    )

    const actualErrMsgPasswordPolicy = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[1]'
    )
    expect(actualErrMsgPasswordPolicy).toBe(expectedErrMsgPasswordPolicy)

    await page.fill(
      'xpath=(//input[@placeholder="Enter password"])[2]',
      invalidPassword
    )

    const actualErrMsgPasswordPolicyConfirmPassword = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[2]'
    )
    expect(actualErrMsgPasswordPolicyConfirmPassword).toBe(
      expectedErrMsgPasswordPolicy
    )
  })

  //validating eye button - visible
  it('should visible the password onclick crossed eye icon', async () => {
    await page.click('xpath=//*[@data-icon="eye-invisible"]')
    const passwordVisible = await page.getAttribute(
      'xpath=(//*[@placeholder="Enter password"])[1]',
      'type'
    )
    expect(passwordVisible).toBe('text')
    await page.click('xpath=//*[@data-icon="eye-invisible"]')
    const confirmPasswordVisible = await page.getAttribute(
      'xpath=(//*[@placeholder="Enter password"])[2]',
      'type'
    )
    expect(confirmPasswordVisible).toBe('text')
  })

  //validating eye button - invisible
  it('should hide the password onclick eye icon', async () => {
    await page.click('xpath=//*[@data-icon="eye"]')
    const passwordNotVisible = await page.getAttribute(
      'xpath=(//*[@placeholder="Enter password"])[1]',
      'type'
    )
    expect(passwordNotVisible).toBe('password')
    await page.click('xpath=//*[@data-icon="eye"]')
    const confirmPasswordNotVisible = await page.getAttribute(
      'xpath=(//*[@placeholder="Enter password"])[2]',
      'type'
    )
    expect(confirmPasswordNotVisible).toBe('password')
  })

  //validating on clear error message validations on password, confirm password and code field
  it('on clear error message validations', async () => {
    await page.fill('[class="ant-input"]', invalidCodeForPasswordReset)

    await page.fill('[class="ant-input"]', '')

    await page.fill('xpath=(//input[@placeholder="Enter password"])[1]', '')
    await page.fill('xpath=(//input[@placeholder="Enter password"])[2]', '')

    //await page.waitForTimeout(1000)

    const actualErrMsgCode = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[1]'
    )
    expect(actualErrMsgCode).toBe(onClearErrMsgCode)

    const actualErrMsgPassword = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[2]'
    )
    expect(actualErrMsgPassword).toBe(onClearErrMsgPassword)

    const actualErrMsgConfirmPassword = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[3]'
    )
    expect(actualErrMsgConfirmPassword).toBe(onClearErrMsgPassword)
  })

  //enter new password to reset
  it('it should enter password to reset', async () => {
    await page.waitForSelector(
      'xpath=(//input[@placeholder="Enter password"])[1]'
    )
    await page.fill(
      'xpath=(//input[@placeholder="Enter password"])[1]',
      newPassword
    )
    await page.fill(
      'xpath=(//input[@placeholder="Enter password"])[2]',
      invalidPassword
    )

    const actualErrMsgPasswordNotMatch = await page.innerText(
      '((//*[@class="ant-form-item-explain"])/div)[2]'
    )
    expect(actualErrMsgPasswordNotMatch).toBe(expectedErrMsgPasswordNotMatch)

    await page.fill('xpath=(//input[@placeholder="Enter password"])[2]', '')
  })

  //enter invalid code
  it('it should give error message for wrong code', async () => {
    //type
    await page.fill(
      'xpath=(//input[@placeholder="Enter password"])[2]',
      newPassword
    )

    //type
    await page.fill('[class="ant-input"]', invalidCodeForPasswordReset)
    const usernameContinueButtonStatus = await page.getAttribute(
      '#change-password',
      'disabled'
    )
    expect(usernameContinueButtonStatus).toBeNull()

    await page.click('[id="change-password"]')

    //await page.waitForTimeout(10000)

    const actualErrMsgInvalidCode = await page.innerText(
      '.ant-form-item-explain div'
    )
    expect(actualErrMsgInvalidCode).toBe(expectedErrMsgInvalidCode)
  })
})
