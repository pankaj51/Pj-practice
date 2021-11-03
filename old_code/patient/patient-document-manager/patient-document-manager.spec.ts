import expect from 'expect'
import { randomSsnGenerator, page } from '../../shared/constants'
import { login, createPatient } from '../../shared/utils'

let expectedFolderName: string | null = ''

describe('Upload file', () => {
  it('login with username and password', async () => {
    const username = 'rucheta7'
    const password = 'Rucheta@123'
    await login(page, username, password)
  })

  it('should open add patient tab', async () => {
    await page.waitForSelector('css=[data-testid="activity-Patients"]')
    await page.click('css=[data-testid="activity-Patients"]')

    await page.click('css=[data-testid="menu-CreatePatient"]')

    await page.waitForSelector('css=[data-testid="add-patient-title"]')

    const expectedTitleDetailFacility = await page.innerText(
      'css=[data-testid="add-patient-title"]'
    )
    expect(expectedTitleDetailFacility).toBe('Create Patient')
  })

  //creating new patient
  it('should create new patient', async () => {
    //calling create patient function
    await createPatient(page)
  }, 30000)

  it('should able to upload a file', async () => {
    await page.click('css=[data-testid="documents-tab"]')
    await page.waitForTimeout(2000)
    const handle = await page.$(
      'div:nth-child(2) > span > div.ant-upload.ant-upload-select.ant-upload-select-text > span > input[type=file]'
    )
    await handle?.setInputFiles('sample-insurance-image1.jpg')
    await page.click('css=[data-testid="document-select-folder"]')
    await page.waitForTimeout(2000) //To load the drop down values for Folder
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    const expectedFolderInnerText = await page.innerText(
      'css=[data-testid="document-select-folder"]'
    )
    const expectedFolderNameArray = expectedFolderInnerText.split('\n')
    expectedFolderName = expectedFolderNameArray[1]
    await page.click('css=[data-testid="document-upload-update"]')
    await page.waitForSelector('//span[@class="text-success"]')
    const imageUploaded = await page.innerText('//span[@class="text-success"]')

    expect(imageUploaded).toBe('Complete')
  })

  it('should open the file', async () => {
    await page.waitForTimeout(10000)
    await page.click('//button[@aria-label="Close"]')
    await page.fill('//input[@placeholder="Search"]', 'sample-insurance-image1')
    await page.click(
      '//*/tbody/tr[2]/td[1]/span[contains(text(),"sample-insurance-image1")]'
    )
    const imageHeading = await page.innerText('.align-bottom')

    expect(imageHeading).toBe(
      expectedFolderName + '/sample-insurance-image1.jpg'
    )
  })
})

describe('Delete file', () => {
  it('should able to delete the file from detail view', async () => {
    await page.click('css=[data-testid="document-detail-delete"]')
    await page.click('//span[contains(text(),"Confirm")]')
    await page.fill('//input[@placeholder="Search"]', 'sample-insurance-image1')
    await page.waitForTimeout(2000) //to redirect on list view
    const deletedImageStatus = await page.$(
      '//*/tbody/tr[2]/td[1]/span[contains(text(),"sample-insurance-image1")]'
    )
    expect(deletedImageStatus).toBeNull()
  })
})
