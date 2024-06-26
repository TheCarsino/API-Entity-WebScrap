export async function validatePageWorldBank(page) {
  try {
    await page.waitForSelector('tbody[role="rowgroup"]', {
      timeout: 10000,
    });
    return null;
  } catch (error) {
    return {
      code: 405,
      message: "The Wold Bank database is currently unavailable.",
      detail: error.message,
      data: [],
    };
  }
}

export async function findByEntityWorldBank(page, entityName) {
  try {
    await page.waitForSelector('tbody[role="rowgroup"] > tr', {
      timeout: 10000,
    });
    await page.locator('input[id="category"]').fill(entityName);

    const emptyRequest = await page.$('tbody[role="rowgroup"] > tr');
    if (emptyRequest == null)
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
        "The Wold Bank database is currently unavailable. An error occurred while finding the entity name from the database",
      detail: error.message,
      data: [],
    };
  }
}

export async function fillDataEntitiesWorldBank(page) {
  try {
    await page.waitForSelector('tbody[role="rowgroup"] > tr', {
      timeout: 10000,
    });

    const rows = await page.$$('tbody[role="rowgroup"] > tr');
    const data = [];

    for (let row of rows) {
      const rowData = await row.$$eval("td", (cells) =>
        cells.map((cell) => cell.textContent.trim())
      );

      data.push({
        source: "world-bank",
        firm_name: rowData[0] || "",
        address: rowData[2] || "",
        country: rowData[3] || "",
        from_date: rowData[4] || "",
        to_date: rowData[5] || "",
        agreement: rowData[6] || "",
      });
    }
    return data;
  } catch (error) {
    return {
      code: 405,
      message:
        "The Wold Bank database is currently unavailable. An error occurred while retrieving data from the table",
      detail: error.message,
      data: [],
    };
  }
}
