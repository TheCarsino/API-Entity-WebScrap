import { Router } from "express";
import {
  updateOffshoreLeaks,
  updateWorldBankFirms,
  updateSanctionList,
} from "../controllers/webscrap.controller.js";
import { basicAuth } from "../validators/authBasic.js";

const router = Router();

router.post("/update/offshore-leaks", basicAuth, updateOffshoreLeaks);
router.post("/update/worldbank-firms", basicAuth, updateWorldBankFirms);
router.post("/update/ofac-sanctions", basicAuth, updateSanctionList);

export default router;
