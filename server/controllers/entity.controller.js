import {
  getDataFromOFACSanction,
  getDataFromOffshoreLeaks,
  getDataFromWorldBank,
} from "../functions/webscrapPages.js";

async function fillWebScrapingData(offshoreData, worldBankData, ofacData) {
  if (offshoreData == null) {
    offshoreData = {
      code: 204,
      message: "The OffShore Leaks database is not being used.",
      data: [],
    };
  }
  if (worldBankData == null) {
    worldBankData = {
      code: 204,
      message: "The World Bank database is not being used.",
      data: [],
    };
  }
  if (ofacData == null) {
    ofacData = {
      code: 204,
      message: "The OFAC database database is not being used.",
      data: [],
    };
  }
  const detail = {
    offshoreDetail: {
      code: offshoreData.code,
      message: offshoreData.message,
      detail: offshoreData.detail,
    },
    worldBankDetail: {
      code: worldBankData.code,
      message: worldBankData.message,
      detail: worldBankData.detail,
    },
    ofacDetail: {
      code: ofacData.code,
      message: ofacData.message,
      detail: ofacData.detail,
    },
  };

  const totalHitAmount =
    offshoreData.data.length + worldBankData.data.length + ofacData.data.length;
  return {
    detailDataBases: detail,
    totalHits: totalHitAmount,
    hitRiskData: [
      ...offshoreData.data,
      ...worldBankData.data,
      ...ofacData.data,
    ],
  };
}

export const getHighRiskList = async (req, res) => {
  const bodyQuery = req.body;
  const entityName = bodyQuery.name;
  if (
    bodyQuery.offshoreLeaks != null &&
    !bodyQuery.offshoreLeaks &&
    bodyQuery.worldBank != null &&
    !bodyQuery.worldBank &&
    bodyQuery.OFACSanctions != null &&
    !bodyQuery.OFACSanctions
  )
    return res.json({
      error: 401,
      message:
        "It is neccesary to use at least one database for the screening search.",
    });
  try {
    const promises = [];

    if (
      bodyQuery.offshoreLeaks == null &&
      bodyQuery.worldBank == null &&
      bodyQuery.OFACSanctions == null
    ) {
      promises.push(getDataFromOffshoreLeaks(entityName));
      promises.push(getDataFromWorldBank(entityName));
      promises.push(getDataFromOFACSanction(entityName));
    } else {
      if (bodyQuery.offshoreLeaks != null && bodyQuery.offshoreLeaks)
        promises.push(getDataFromOffshoreLeaks(entityName));
      else promises.push(Promise.resolve(null));

      if (bodyQuery.worldBank != null && bodyQuery.worldBank)
        promises.push(getDataFromWorldBank(entityName));
      else promises.push(Promise.resolve(null));

      if (bodyQuery.OFACSanctions != null && bodyQuery.OFACSanctions)
        promises.push(getDataFromOFACSanction(entityName));
      else promises.push(Promise.resolve(null));
    }

    const [offshoreData, worldBankData, ofacData] = await Promise.all(promises);

    const webScrapingData = await fillWebScrapingData(
      offshoreData,
      worldBankData,
      ofacData
    );

    return res.status(200).json(webScrapingData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
