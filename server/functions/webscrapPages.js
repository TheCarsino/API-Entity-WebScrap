import puppeteer from "puppeteer";
import {
  fillDataEntitiesOFAC,
  findByEntityOFAC,
  validatePageOFAC,
} from "./validationsOFAC.js";
import {
  fillDataEntitiesWorldBank,
  findByEntityWorldBank,
  validatePageWorldBank,
} from "./validationsWorldBank.js";
import {
  fillDataEntitiesOffShoreLeaks,
  findByEntityOffShoreLeaks,
  validatePageOffShoreLeaks,
} from "./validationsOffShoreLeak.js";

export async function getDataFromOffshoreLeaks(entityName) {
  var entity = entityName.replace(/ /g, "+");
  try {
    const browser = await puppeteer.launch({
      headless: "new", //Operations in the background -- Chromium headless: 'new'
    });
    const page = await browser.newPage();
    await page.goto(
      `${process.env.URL_OFFSHORELEAKS}?q="${entity}"&e=${entity}"`
    );

    const isActive = await validatePageOffShoreLeaks(page);
    if (isActive) return isActive;

    const hasValues = await findByEntityOffShoreLeaks(page);
    if (hasValues) return hasValues;

    const data = await fillDataEntitiesOffShoreLeaks(page);

    await browser.close();
    return { code: 200, message: "THe entity has been found.", data: data };
  } catch (error) {
    return error;
  }
}

export async function getDataFromWorldBank(entityName) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.URL_WORLDBANK}`);

    const isActive = await validatePageWorldBank(page);
    if (isActive) return isActive;

    const hasValues = await findByEntityWorldBank(page, entityName);
    if (hasValues) return hasValues;

    const data = await fillDataEntitiesWorldBank(page);

    await browser.close();
    return { code: 200, message: "THe entity has been found.", data: data };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDataFromOFACSanction(entityName) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.URL_OFAC}`);

    const isActive = await validatePageOFAC(page);
    if (isActive) return isActive;

    const hasValues = await findByEntityOFAC(page, entityName);
    if (hasValues) return hasValues;

    const data = await fillDataEntitiesOFAC(page);

    await browser.close();

    return { code: 200, message: "THe entity has been found.", data: data };
  } catch (error) {
    console.log(error);
    return error;
  }
}
