import { Router } from "express";
import {
  webscrapOffshoreLeaks,
  webscrapWorldBankFirms,
  webscrapSanctionList,
} from "../controllers/webscrap.controller.js";
import { basicAuth } from "../validators/authBasic.js";

const router = Router();

router.post("/webscrap/offshore-leaks", basicAuth, webscrapOffshoreLeaks);
router.post("/webscrap/worldbank-firms", basicAuth, webscrapWorldBankFirms);
router.post("/webscrap/ofac-sanctions", basicAuth, webscrapSanctionList);

export default router;
