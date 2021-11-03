import {
  page,
  convertStringToNumber,
  randomNumericForListView
} from '../shared/constants'
import { login, openNoteTemplateTab } from '../shared/utils'
let pageNumberCounter: any
let searchingKeyword = 'rucheta'

describe('list-view-note templates', () => {
  const username = 'Rucheta@123'
  const password = 'Rucheta@123'

  //login
  it('login with username and password', async () => {
    await login(page, username, password)
  })

  //opening note template list view
  it('should open note template list tab', async () => {
    await openNoteTemplateTab(page)
  })

  //searching note template that does not exist
  it('should display no data', async () => {
    //closing patient master
    await page.click('[aria-label="remove"]')

    pageNumberCounter = await page.innerText(
      '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
    )
    await page.waitForSelector('css=[data-testid="note-template-search"]')
    await page.fill('css=[data-testid="note-template-search"]', 'ksklsajflksa')

    await page.waitForTimeout(3000)
    let noDataStateValue = await page.innerText(
      '(//*[@data-testid="note-template-table"])/div/div/table/tbody/tr[2]'
    )

    await page.waitForSelector('css=[data-testid="note-template-search"]')
    await page.fill('css=[data-testid="note-template-search"]', '')

    await page.waitForTimeout(3000)

    let pageNumberCounterAfterClear = await page.innerText(
      '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
    )

    expect(noDataStateValue).toBe('No Data')
    expect(pageNumberCounterAfterClear).toBe(pageNumberCounter)
  })

  //searching any note templates
  it('should search any note template entered in search box', async () => {
    let allRecords, varForConverting, data
    let allRecordsArrayClean = [['', '']]
    let allRecordsArray = []
    let flag = true
    await page.waitForSelector('css=[data-testid="note-template-search"]')
    await page.fill(
      'css=[data-testid="note-template-search"]',
      searchingKeyword
    )

    await page.waitForTimeout(3000)

    pageNumberCounter = await page.innerText(
      '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
    )

    pageNumberCounter = convertStringToNumber(pageNumberCounter)

    allRecords = await page.innerText(
      '(//*[@data-testid="note-template-table"])/div/div/table/tbody'
    )
    allRecordsArray = allRecords.split('\n')
    allRecordsArray.splice(0, 10)

    for (
      var counterForRecords = 0;
      counterForRecords < allRecordsArray.length;
      counterForRecords++
    ) {
      if (!allRecordsArrayClean[counterForRecords])
        allRecordsArrayClean[counterForRecords] = []

      varForConverting = allRecordsArray[counterForRecords]
      allRecordsArrayClean[counterForRecords][0] = varForConverting.slice(0, 8)
      let index = varForConverting.indexOf('\t', 9)
      allRecordsArrayClean[counterForRecords][1] = varForConverting.slice(
        9,
        index
      )
    }

    for (
      counterForRecords = 0;
      counterForRecords < allRecordsArrayClean.length;
      counterForRecords++
    ) {
      if (
        //&& works like OR and || works like and.. needs to search on the same
        allRecordsArrayClean[counterForRecords][0].includes(searchingKeyword) !=
          true &&
        allRecordsArrayClean[counterForRecords][1].includes(searchingKeyword) !=
          true
      ) {
        flag = false
      }
    }
    expect(flag).toBe(true)

    if (pageNumberCounter != 1) {
      for (
        var counterForMultipleRecords = 0;
        counterForMultipleRecords < pageNumberCounter;
        counterForMultipleRecords++
      ) {
        await page.click(
          '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]'
        )
        await page.waitForTimeout(1000)
        allRecords = await page.innerText(
          '(//*[@data-testid="note-template-table"])/div/div/table/tbody'
        )
        allRecordsArray = allRecords.split('\n')
        allRecordsArray.splice(0, 10)

        for (
          var counterForRecords = 0;
          counterForRecords < allRecordsArray.length;
          counterForRecords++
        ) {
          if (!allRecordsArrayClean[counterForRecords])
            allRecordsArrayClean[counterForRecords] = []

          varForConverting = allRecordsArray[counterForRecords]
          allRecordsArrayClean[counterForRecords][0] = varForConverting.slice(
            0,
            8
          )
          let index = varForConverting.indexOf('\t', 9)
          allRecordsArrayClean[counterForRecords][1] = varForConverting.slice(
            9,
            index
          )
        }

        for (
          counterForRecords = 0;
          counterForRecords < allRecordsArrayClean.length;
          counterForRecords++
        ) {
          if (
            //&& works like OR and || works like and.. needs to search on the same
            allRecordsArrayClean[counterForRecords][0].includes(
              searchingKeyword
            ) != true &&
            allRecordsArrayClean[counterForRecords][1].includes(
              searchingKeyword
            ) != true
          ) {
            flag = false
          }
        }
        expect(flag).toBe(true)
      }
    }
  }, 90000)

  //records per page
  it('should validate number of records per page', async () => {
    //clearing the search
    await page.waitForSelector('css=[data-testid="note-template-search"]')
    await page.fill('css=[data-testid="note-template-search"]', '')

    await page.waitForTimeout(3000)
    let dropdownForPagination: any = [10, 20, 50, 100]
    let lastPageRecords,
      lastPageRecordsNumber,
      totalNumberOfRecords,
      expectedNumberOfPages,
      actualNumberOfPages: any

    pageNumberCounter = await page.innerText(
      '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
    )

    pageNumberCounter = convertStringToNumber(pageNumberCounter)

    if (pageNumberCounter > 5) {
      await page.click(
        '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
      )

      await page.waitForTimeout(2000)
      //fetching records from last page
      lastPageRecords = await page.innerText(
        '(//*[@data-testid="note-template-table"])/div/div/table/tbody'
      )

      pageNumberCounter = await page.innerText(
        '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
      )

      let lastPageRecordsArray = lastPageRecords.split('\n')
      lastPageRecordsArray.splice(0, 10)

      lastPageRecordsNumber = lastPageRecordsArray.length

      totalNumberOfRecords =
        (pageNumberCounter - 1) * 10 + lastPageRecordsNumber
      for (
        var counterForPagination = 0;
        counterForPagination < dropdownForPagination.length;
        counterForPagination++
      ) {
        await page.click(
          '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/following-sibling::li'
        )

        await page.click(
          'css=[title="' +
            dropdownForPagination[counterForPagination] +
            ' / page"]'
        )

        expectedNumberOfPages = Math.ceil(
          totalNumberOfRecords / dropdownForPagination[counterForPagination]
        )

        actualNumberOfPages = await page.innerText(
          '(//*[@data-testid="note-template-table"])/following-sibling::ul[1]/li[@title="Next Page"]/preceding-sibling::li[1]'
        )

        actualNumberOfPages = convertStringToNumber(actualNumberOfPages)
        expect(actualNumberOfPages).toBe(expectedNumberOfPages)
      }
    }
  }, 90000)

  //on click any record detail view should be displayed
  it('should display detail view', async () => {
    let randomValue = randomNumericForListView(1)
    let noteTemplateName = await page.innerText(
      '(//*[@data-testid="note-template-table"])/div/div/table/tbody/tr[' +
        randomValue +
        ']/td[1]'
    )

    await page.click(
      '(//*[@data-testid="note-template-table"])/div/div/table/tbody/tr[' +
        randomValue +
        ']/td[1]'
    )

    await page.waitForSelector(
      'css=[data-testid="note-template-details-view-name"]'
    )

    let noteTemplateTitleOfDetailView = await page.innerText(
      'css=[data-testid="note-template-details-view-name"]'
    )

    expect(noteTemplateTitleOfDetailView.includes(noteTemplateName)).toBe(true)
  })
})
