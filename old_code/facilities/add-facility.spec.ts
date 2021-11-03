import { page } from '../shared/constants'
import {
  randomAlphaNumeric,
  randomNumeric,
  randomLongitude,
  randomLatitude
} from '../shared/constants'
import { login } from '../shared/utils'

describe('list-view-facility', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //opening add facility tab
  it('should open add facility tab', async () => {
    await page.waitForSelector('[data-testid="activity-Administrative"]')
    await page.click('[data-testid="activity-Administrative"]')

    await page.click('[data-testid="menu-Facilities"]')

    await page.click('[data-testid="add-facility-button"]')

    await page.waitForSelector('[data-testid="add-facility-title"]')
    const actualTitleDetailFacility = await page.innerText(
      '[data-testid="add-facility-title"]'
    )
    expect(actualTitleDetailFacility).toBe('Create Facility')
  })

  //creating new facility and display detail view
  it('should create new facility and display detail view', async () => {
    await page.fill(
      '[data-testid="add-facility-name"]',
      'Automation-testing-created-Facility'
    )

    await page.fill('[data-testid="add-facility-add1"]', randomAlphaNumeric())
    await page.fill('[data-testid="add-facility-add2"]', randomAlphaNumeric())

    await page.click('[data-testid="add-facility-city"]')
    await page.fill('[data-testid="add-facility-city"]', 'SF')

    await page.click('[data-testid="add-facility-state"]')
    await page.fill('[data-testid="add-facility-state"]', 'CA')

    await page.click('[data-testid="add-facility-country"]')

    await page.type(
      '[data-testid="add-facility-country"]',
      'united states of america'
    )

    await page.click('[data-testid="us"] > div')

    await page.fill('[data-testid="add-facility-zip-code"]', randomNumeric(5))

    await page.fill(
      '[data-testid="add-facility-loc-latitude"]',
      randomLatitude()
    )

    await page.fill(
      '[data-testid="add-facility-loc-longitude"]',
      randomLongitude()
    )

    await page.fill(
      '[data-testid="add-facility-phone-number"]',
      randomNumeric(16)
    )
    await page.fill(
      '[data-testid="add-facility-email"]',
      'rucheta' + randomNumeric(5) + '@theprocedure.in'
    )
    await page.fill('[data-testid="add-facility-fax"]', randomNumeric(16))

    await page.click('[data-testid="add-facility-place-of-service"]')
    await page.click('[title="1 - Pharmacy"]')

    await page.click('[data-testid="add-facility-tin-type"]')
    await page.click('[data-testid="ein"] > div')

    await page.fill('[data-testid="add-facility-tin"]', randomNumeric(20))

    await page.fill('[data-testid="add-facility-clia"]', randomNumeric(10))
    await page.fill('[data-testid="add-facility-npi"]', randomNumeric(10))

    await page.waitForSelector('[data-testid="add-facility-create-button"]')

    await page.click('[data-testid="add-facility-create-button"]')
    await page.waitForSelector('[data-testid="details-facility-title"]')
    const actualTitleDetailFacility = await page.innerText(
      '[data-testid="details-facility-title"]'
    )
    expect(actualTitleDetailFacility).toBe(
      'Automation-testing-created-Facility'
    )
  }, 60000)

  // //created facility should be displayed at top
  // it('should be displayed at the top', async () => {
  //   //workaround as of now
  //   page.reload
  //   await page.waitForSelector('[data-testid="activity-Administrative"]')
  //   await page.click('[data-testid="activity-Administrative"]')

  //   await page.click('[data-testid="menu-Facilities"]')

  //   const addedFacilityName = await page.innerText('')
  //   //expect(addedFacilityName).toBe(actualName)
  //   console.log(addedFacilityName)

  //   await page.click('.ant-table-row ant-table-row-level-0 cursor-pointer')
  // })
})
