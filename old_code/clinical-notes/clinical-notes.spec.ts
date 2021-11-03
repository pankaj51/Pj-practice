import { page } from '../shared/constants'
import { login } from '../shared/utils'

describe('clinical-notes', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //function to open cilincal tab
  const openClinicalNoteTab = async () => {
    await page.waitForSelector('[data-testid="activity-Patients"]')
    await page.click('[data-testid="activity-Patients"]')

    await page.waitForSelector('[data-testid="menu-PatientMaster"]')

    await page.click(
      '(//*[@data-testid="patients-table"])/div/div/table/tbody/tr[2]/td[2]'
    )

    await page.click('[data-testid="clinical-notes-tab"]')
  }

  //opening add patient tab
  it('should open clinical notes tab', async () => {
    //calling function to open clinical tab
    await openClinicalNoteTab()
  })
})
