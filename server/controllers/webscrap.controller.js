import {
  getDataFromOffshoreLeaks,
  getDataFromOFACSanction,
  getDataFromWorldBank,
} from "../functions/webscrapPages.js";

export const updateOffshoreLeaks = async (req, res) => {
  try {
    const result = await getDataFromOffshoreLeaks(req.body.entity);

    return res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateWorldBankFirms = async (req, res) => {
  try {
    const result = await getDataFromWorldBank(req.body.entity);

    return res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateSanctionList = async (req, res) => {
  try {
    const result = await getDataFromOFACSanction(req.body.entity);

    return res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
