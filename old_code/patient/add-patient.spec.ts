import { page } from '../shared/constants'
import {
  login,
  createPatient,
  validateDetailViewPagePatient,
  openPatientTab
} from '../shared/utils'

// import { it, expect } from '@playwright/test'

describe('add-patient', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //opening add patient tab
  it('should open add patient tab', async () => {
    //calling function to open patients tab
    await openPatientTab(page)
  })

  //creating new patient
  it('should create new patient', async () => {
    //calling function to create patient
    await createPatient(page)
  }, 30000)

  //detail tab should be displayed
  it('should display detail page', async () => {
    //calling function for detail view validation
    await validateDetailViewPagePatient(page)
  })
})
