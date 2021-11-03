import { page } from '../shared/constants'
import { login } from '../shared/utils'

describe('list-view-facility', () => {
  const username = 'Rucheta@123'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //opening facility list view tab
  it('should open facility list view tab', async () => {
    await page.waitForSelector('[data-testid="activity-Administrative"]')
    await page.click('[data-testid="activity-Administrative"]')

    await page.click('[data-testid="menu-Facilities"]')

    //validating the tab name
    // await page.waitForSelector('[aria-selected="true"]')

    // const pageActiveStatus = page.getAttribute('[aria-selected="true"]', 'aria-controls')
    // console.log(pageActiveStatus)
    // expect(pageActiveStatus).toBe("rc-tabs-0-panel-Facilities#twYSW9gK")

    //searching facility
    await page.waitForSelector('[data-testid="search-facilities"]')
    await page.fill('[data-testid="search-facilities"]', 'Rucheta')

    //click on Q button
    //await page.click('.anticon anticon-search ant-input-search-icon')

    //click on add button
    await page.click('[data-testid="add-facility-button"]')
    //code to be added
  })
})
