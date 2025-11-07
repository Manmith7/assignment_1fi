import { Router } from "express";
import { createEmiPlan } from "../controllers/emi.controller.js";
import { createEmiValidation, validateRequest } from "../middlewares/validations.js";

const router = Router();

router.post("/", validateRequest(createEmiValidation), createEmiPlan);

export default router;
