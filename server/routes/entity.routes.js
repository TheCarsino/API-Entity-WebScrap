import { Router } from "express";
import { getHighRiskList } from "../controllers/entity.controller.js";
import { basicAuth } from "../validators/authBasic.js";
import { validateHighRiskList } from "../validators/validateEntity.js";

const router = Router();

router.get(
  "/entity/risklist",
  basicAuth,
  validateHighRiskList,
  getHighRiskList
);

export default router;
