import { page } from '../../shared/constants'
import {
  login,
  createPatient,
  openPatientTab,
  validateDetailViewPagePatient
} from '../../shared/utils'
import {
  expectedBloodTypeDropdown,
  expectedBloodPressureRecordingMethodDropDown,
  expectedBloodPressureRecordingMethodTestIds,
  expectedCuffLocationDropDown,
  expectedCuffSizeDropDown,
  expectedOxygenationActivityDropDown,
  expectedOxygenationSaturationTypeDropDown,
  expectedRespirationPatternDropDown,
  expectedPositionDropDown,
  expectedPulseRhythmDropDown,
  expectedTemperatureMethodDropDown
} from './constants/constants'
let pageNumberCounter: any
//only month added to search due to the defect in searching from BE
let searchingKeyword = '03'
let expectedBloodType = 'A-',
  expectedFingerStick = 'Finger Stick',
  expectedUrineOutput = 'Urine Output'

describe('add-vitals', () => {
  const username = 'rucheta7'
  const password = 'Rucheta@123'

  //function to open vitals tab
  const openVitalsTab = async () => {
    await page.click('[data-testid="vitals-tab"]')
    await page.click('[data-testid="vitals-add-button"]')
    await page.waitForSelector('[data-testid="vital-title"]')
  }

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
    //calling create patient function
    await createPatient(page)
  }, 30000)

  //detail tab should be displayed
  it('should display detail page', async () => {
    //calling function for detail view validation
    await validateDetailViewPagePatient(page)
  }, 60000)

  //opening vitals add view
  it('should open vitals add view', async () => {
    //calling function to open vitals tab
    await openVitalsTab()
  })

  //validating dropdown values
  it('should validate dropdown values', async () => {
    let actualBloodTypeDropDown,
      actualPulseRhythmDropDown,
      actualPulsePositionDropDown,
      actualRespirationPatternDropDown,
      actualTemperatureMethodDropDown,
      actualCuffSizeDropDown,
      actualBloodPressureRecordingMethodDropDown,
      actualOxygenationActivityDropDown,
      actualOxygenationSaturationTypeDropDown

    let actualPulseRhythmDropDownArray = []
    let actualPulsePositionDropDownArray = []

    let flagForBloodType = true
    let flagForPulsePulsePosition = true
    let flagForCuffLocation = true
    let flagForPulseRhythm = true

    let i = 0

    //blood group
    i = 0
    await page.click('[data-testid="vitals-general-blood-type"]')
    while (i < expectedBloodTypeDropdown.length) {
      actualBloodTypeDropDown = await page.innerText(
        '[data-testid="vitals-general-blood-type"] div[class="rc-virtual-list-holder-inner"] div[class*="active"]'
      )

      if (actualBloodTypeDropDown != expectedBloodTypeDropdown[i]) {
        flagForBloodType = false
        console.log(actualBloodTypeDropDown)
      }
      i += 1
      await page.keyboard.press('ArrowDown')
    }

    //pulse - rhythm
    await page.click('[data-testid="vitals-pulse-rhythm"]')
    actualPulseRhythmDropDown = await page.innerText(
      '[data-testid="vitals-pulse-rhythm"] div[class="rc-virtual-list"]'
    )
    actualPulseRhythmDropDownArray = actualPulseRhythmDropDown.split('\n')

    for (
      var counterForSexualOrientationDropDown = 0;
      counterForSexualOrientationDropDown < expectedPulseRhythmDropDown.length;
      counterForSexualOrientationDropDown++
    ) {
      if (
        actualPulseRhythmDropDownArray[counterForSexualOrientationDropDown] !=
        expectedPulseRhythmDropDown[counterForSexualOrientationDropDown]
      ) {
        flagForPulseRhythm = false
      }
    }

    //pulse - position
    await page.click('[data-testid="vitals-pulse-position"]')
    actualPulsePositionDropDown = await page.innerText(
      '[data-testid="vitals-pulse-position"] div[class="rc-virtual-list"]'
    )
    actualPulsePositionDropDownArray = actualPulsePositionDropDown.split('\n')

    for (
      var counterForSexualOrientationDropDown = 0;
      counterForSexualOrientationDropDown <
      expectedPulsePositionDropDown.length;
      counterForSexualOrientationDropDown++
    ) {
      if (
        actualPulsePositionDropDownArray[counterForSexualOrientationDropDown] !=
        expectedPulsePositionDropDown[counterForSexualOrientationDropDown]
      ) {
        flagForPulsePosition = false
      }
    }
  })

  it('adding vitals', async () => {
    // await page.click('[vitals-general-blood-type]')

    // await page.click('[data-testid="' + expectedBloodType + '"]')
    await page.fill(
      '[data-testid="vitals-general-finger-stick"]',
      expectedFingerStick
    )

    await page.fill(
      '[data-testid="vitals-general-urine-output"]',
      expectedUrineOutput
    )
  })
})
