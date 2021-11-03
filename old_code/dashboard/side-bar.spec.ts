import { page } from '../shared/constants'
import { login } from '../shared/utils'

describe('side-bar', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'
  //login
  it('login with username and password', async () => {
    login(page, username, password)
  })

  //function to open patients on three side
  const openPatientsTab = async () => {
    //opening add patient on all the sides
    await page.waitForSelector('[data-testid="menu-CreatePatient"]')
    // Right click
    await page.click('[data-testid="menu-CreatePatient"]', { button: 'right' })

    await page.waitForSelector('[data-testid="CreatePatient-Group-1"]')
    await page.click('[data-testid="CreatePatient-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-CreatePatient"]', { button: 'right' })

    await page.waitForSelector('[data-testid="CreatePatient-Group-2"]')
    await page.click('[data-testid="CreatePatient-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-CreatePatient"]', { button: 'right' })

    await page.waitForSelector('[data-testid="CreatePatient-Group-3"]')
    await page.click('[data-testid="CreatePatient-Group-3"]')
  }

  //function to open administration tab
  const openAdministrationTab = async () => {
    await page.waitForSelector('[data-testid="activity-Administrative"]')
    await page.click('[data-testid="activity-Administrative"]')

    //opening Users on all the sides
    await page.waitForSelector('[data-testid="menu-Users"]')
    // Right click
    await page.click('[data-testid="menu-Users"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Users-Group-1"]')
    await page.click('[data-testid="Users-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-Users"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Users-Group-2"]')
    await page.click('[data-testid="Users-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-Users"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Users-Group-3"]')
    await page.click('[data-testid="Users-Group-3"]')

    //opening Facilities on all the sides
    await page.waitForSelector('[data-testid="menu-Facilities"]')
    // Right click
    await page.click('[data-testid="menu-Facilities"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Facilities-Group-1"]')
    await page.click('[data-testid="Facilities-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-Facilities"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Facilities-Group-2"]')
    await page.click('[data-testid="Facilities-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-Facilities"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Facilities-Group-3"]')
    await page.click('[data-testid="Facilities-Group-3"]')

    //opening Note templates on all the sides
    await page.waitForSelector('[data-testid="menu-NoteTemplates"]')
    // Right click
    await page.click('[data-testid="menu-NoteTemplates"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NoteTemplates-Group-1"]')
    await page.click('[data-testid="NoteTemplates-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-NoteTemplates"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NoteTemplates-Group-2"]')
    await page.click('[data-testid="NoteTemplates-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-NoteTemplates"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NoteTemplates-Group-3"]')
    await page.click('[data-testid="NoteTemplates-Group-3"]')

    //opening Document Manager on all the sides
    await page.waitForSelector('[data-testid="menu-DocumentManager"]')
    // Right click
    await page.click('[data-testid="menu-DocumentManager"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="DocumentManager-Group-1"]')
    await page.click('[data-testid="DocumentManager-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-DocumentManager"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="DocumentManager-Group-2"]')
    await page.click('[data-testid="DocumentManager-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-DocumentManager"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="DocumentManager-Group-3"]')
    await page.click('[data-testid="DocumentManager-Group-3"]')
  }

  //function to open contacts tab
  const openContactsTab = async () => {
    await page.waitForSelector('[data-testid="activity-Contacts"]')
    await page.click('[data-testid="activity-Contacts"]')

    //opening Organizations on all the sides
    await page.waitForSelector('[data-testid="menu-Organizations"]')
    // Right click
    await page.click('[data-testid="menu-Organizations"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Organizations-Group-1"]')
    await page.click('[data-testid="Organizations-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-Organizations"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Organizations-Group-2"]')
    await page.click('[data-testid="Organizations-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-Organizations"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Organizations-Group-3"]')
    await page.click('[data-testid="Organizations-Group-3"]')

    //opening People on all the sides
    await page.waitForSelector('[data-testid="menu-People"]')
    // Right click
    await page.click('[data-testid="menu-People"]', { button: 'right' })

    await page.waitForSelector('[data-testid="People-Group-1"]')
    await page.click('[data-testid="People-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-People"]', { button: 'right' })

    await page.waitForSelector('[data-testid="People-Group-2"]')
    await page.click('[data-testid="People-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-People"]', { button: 'right' })

    await page.waitForSelector('[data-testid="People-Group-3"]')
    await page.click('[data-testid="People-Group-3"]')
  }

  //function to open calendar tab
  const openCalendarTab = async () => {
    await page.waitForSelector('[data-testid="activity-Calendar"]')
    await page.click('[data-testid="activity-Calendar"]')

    //opening Resources on all the sides
    await page.waitForSelector('[data-testid="menu-Resources"]')
    // Right click
    await page.click('[data-testid="menu-Resources"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Resources-Group-1"]')
    await page.click('[data-testid="Resources-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-Resources"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Resources-Group-2"]')
    await page.click('[data-testid="Resources-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-Resources"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Resources-Group-3"]')
    await page.click('[data-testid="Resources-Group-3"]')

    //opening Providers on all the sides
    await page.waitForSelector('[data-testid="menu-Providers"]')
    // Right click
    await page.click('[data-testid="menu-Providers"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Providers-Group-1"]')
    await page.click('[data-testid="Providers-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-Providers"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Providers-Group-2"]')
    await page.click('[data-testid="Providers-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-Providers"]', { button: 'right' })

    await page.waitForSelector('[data-testid="Providers-Group-3"]')
    await page.click('[data-testid="Providers-Group-3"]')

    //opening Nursing Co-ordinators on all the sides
    await page.waitForSelector('[data-testid="menu-NursingCoOrdinators"]')
    // Right click
    await page.click('[data-testid="menu-NursingCoOrdinators"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NursingCoOrdinators-Group-1"]')
    await page.click('[data-testid="NursingCoOrdinators-Group-1"]')

    // Right click
    await page.click('[data-testid="menu-NursingCoOrdinators"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NursingCoOrdinators-Group-2"]')
    await page.click('[data-testid="NursingCoOrdinators-Group-2"]')

    // Right click
    await page.click('[data-testid="menu-NursingCoOrdinators"]', {
      button: 'right'
    })

    await page.waitForSelector('[data-testid="NursingCoOrdinators-Group-3"]')
    await page.click('[data-testid="NursingCoOrdinators-Group-3"]')
  }

  //patients
  it('validate only 3 sides can be open and opening patients tab', async () => {
    //activity-Patients
    await page.waitForSelector('[data-testid="activity-Patients"]')
    await page.click('[data-testid="activity-Patients"]')

    //opening three sides with Patient Master
    // Right click
    await page.click('[data-testid="menu-PatientMaster"]', {
      button: 'right'
    })
    await page.click('[data-testid="open-to-the-side"]')

    // Right click
    await page.click('[data-testid="menu-PatientMaster"]', {
      button: 'right'
    })
    await page.click('[data-testid="open-to-the-side"]')

    //open to the side is disabled
    const statusOpenToSideOption = await page.getAttribute(
      '[data-testid="open-to-the-side"]',
      'aria-disabled'
    )

    expect(statusOpenToSideOption).toBe('true')

    //calling function to open pateints tab
    await openPatientsTab()
  }, 30000)

  //administrative
  it('click on administrative', async () => {
    //calling function to open administration tab
    await openAdministrationTab()
  })

  //contacts
  it('click on contacts', async () => {
    //calling function to open administration tab
    await openContactsTab()
  })

  //calendar
  it('click on calendar', async () => {
    //calling function to open administration tab
    await openCalendarTab()
  })
  //activity-SignOut
})
