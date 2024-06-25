import { Router } from "express";
import {
  pingServers,
  getHighRiskList,
} from "../controllers/entity.controller.js";

const router = Router();

router.get("/entity/ping", pingServers);
router.get("/entity/risklist/", getHighRiskList);

export default router;
