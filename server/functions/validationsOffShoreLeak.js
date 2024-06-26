export async function validatePageOffShoreLeaks(page) {
  try {
    await page.waitForSelector('span[title="Accept terms"]', {
      timeout: 10000,
    });
    return null;
  } catch (error) {
    return {
      code: 405,
      message: "The OffShore Leaks database is currently unavailable.",
      detail: error.message,
      data: [],
    };
  }
}

export async function findByEntityOffShoreLeaks(page) {
  try {
    await page.click('span[title="Accept terms"]');
    await page.click('button[class="btn btn-primary btn-block btn-lg"]');

    await page.waitForSelector('div[class="search__results__content"]', {
      timeout: 10000,
    });

    const emptyRequest = await page.$('p[class="my-5 lead text-center"]');
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
        "The OffShore Leaks database is currently unavailable. An error occurred while finding the entity name from the database",
      detail: error.message,
      data: [],
    };
  }
}

export async function fillDataEntitiesOffShoreLeaks(page) {
  try {
    await page.waitForSelector("tbody > tr", {
      timeout: 10000,
    });

    const rows = await page.$$("tbody > tr");
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
        source: "offshore-leak",
        entity_name: rowData[0]?.text || rowData[0],
        jurisdiction: rowData[1] || "",
        linked_to: rowData[2] || "",
        data_from: rowData[3]?.text || rowData[3],
      });
    }
    return data;
  } catch (error) {
    return {
      code: 405,
      message:
        "The OffShore Leaks database is currently unavailable. An error occurred while retrieving data from the table",
      detail: error.message,
      data: [],
    };
  }
}
