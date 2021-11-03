export const url = 'http://localhost:3003'
export const expectedErrMsInvalidUsername =
  'Username does not exist or has been disabled.'
export const expectedErrMsgPasswordPolicy = 'Minimum 8 characters required'
export const onClearErrMsgCode = 'Code is required'
export const onClearErrMsgPassword = 'Please enter your password'
export const onClearErrMsgConfirmPassword = 'Passwords must match'
export const expectedErrMsgPasswordNotMatch = 'Passwords must match'
export const expectedErrMsgInvalidCode =
  'Invalid verification code provided, please try again.'
export const expectedErrorMessageForBlankTemplateName =
  'This is a required field'
export const expectedErrorMessageForUniqueTemplateName =
  'This field must be unique.'

import { chromium, Page, Browser } from 'playwright'

export let browser: Browser
export let page: Page
//let timeBreaker = 0

beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 250 })
  //context.clearCookies()
  page = await browser.newPage()
  await page.goto(`${url}/login`)
})

afterAll(async () => {
  await page.close()
  await browser.close()
})

// export const waitFortimeout = () => {
//   while (document.readyState) {
//     timeBreaker += 1
//     if (timeBreaker < 10) break
//   }
// }

// export const waitForDataToLoad = (mandatoryField: any) => {
//   let timeout = 0
//   while (timeout != 10 || mandatoryField != '-') {
//     timeout++
//   }
//   if (timeout == 10) {
//     return false
//   } else {
//     return true
//   }
// }
export const randomAlphaNumeric = () => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export const randomNumeric = (input: Number) => {
  var text = ''
  var possible = '0123456789'

  for (var i = 0; i < input; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export const randomNumericForListView = (input: Number) => {
  var text = ''
  var possible = '23456789'

  for (var i = 0; i < input; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export const randomLongitude = () => {
  var text = ''
  var possible = '0123456789'
  var number = ''

  var length = 4
  number += possible.charAt(Math.floor(Math.random() * length))

  text += Math.floor(Math.random() * (180 - -180)) + '.' + number
  return text
}

export const randomLatitude = () => {
  var text = ''
  var possible = '0123456789'
  var number = ''
  var length = 4

  number += possible.charAt(Math.floor(Math.random() * length))

  text += Math.floor(Math.random() * (90 - -90)) + '.' + number
  return text
}

export const randomSsnGenerator = () => {
  const ssn = Date.now()
  return ssn
}

export const textForNoteTemplate =
  'Rucheta Ajay Gogte RuchetaRuchetaRuchetaRuchetaRuchetaRucheta *** ***'

export const convertStringToNumber = (input: String) => {
  var number = Number(input)
  return number
}
