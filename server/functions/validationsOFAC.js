export async function validatePageOFAC(page) {
  try {
    await page.waitForSelector('div[id="ctl00_MainContent_pnlResults"]', {
      timeout: 10000,
    });
    return null;
  } catch (error) {
    return {
      code: 405,
      message: "The OFAC database is currently unavailable.",
      detail: error.message,
      data: [],
    };
  }
}

export async function findByEntityOFAC(page, entityName) {
  try {
    await page.waitForSelector('input[name="ctl00$MainContent$txtLastName"]', {
      timeout: 10000,
    });
    await page
      .locator('input[name="ctl00$MainContent$txtLastName"]')
      .fill(entityName);

    await page.click('input[name="ctl00$MainContent$btnSearch"]');
    await page.waitForFunction(
      () =>
        document.querySelectorAll(
          'div[id="scrollResults"] > div > table, div[id="scrollResults"] > div[id="ctl00_MainContent_pnlMessage"]'
        ).length,
      {
        timeout: 10000,
      }
    );
    const emptyRequest = await page.$(
      'span[id="ctl00_MainContent_lblMessage"]'
    );

    if (emptyRequest != null)
      return {
        code: 400,
        message: "The entity is not in the database",
        data: [],
      };

    return null;
  } catch (error) {
    return {
      code: 405,
      message:
        "The OFAC database is currently unavailable. An error occurred while finding the entity name from the database",
      detail: error.message,
      data: [],
    };
  }
}

export async function fillDataEntitiesOFAC(page) {
  try {
    await page.waitForSelector('table[id="gvSearchResults"] > tbody > tr', {
      timeout: 10000,
    });

    const rows = await page.$$('table[id="gvSearchResults"] > tbody > tr');
    const data = [];

    for (let row of rows) {
      const rowData = await row.$$eval("td", (cells) => {
        return cells.map((cell) => {
          if (cell.querySelector("a")) {
            return {
              text: cell.querySelector("a").textContent.trim(),
            };
          }
          return cell.textContent.trim();
        });
      });

      data.push({
        source: "ofac-sanction",
        name: rowData[0]?.text || rowData[0],
        address: rowData[1] || "",
        type: rowData[2] || "",
        programs: rowData[3] || "",
        list: rowData[4] || "",
        score: rowData[5] || "",
      });
    }
    return data;
  } catch (error) {
    return {
      code: 405,
      message:
        "The OFAC database is currently unavailable. An error occurred while retrieving data from the table",
      detail: error.message,
      data: [],
    };
  }
}
