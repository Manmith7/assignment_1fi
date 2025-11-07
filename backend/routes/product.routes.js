import { Router } from "express";
import { createProduct, getAllProducts, getProductDetails } from "../controllers/product.controller.js";
import { createProductValidation, validateRequest } from "../middlewares/validations.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", validateRequest(createProductValidation), createProduct);

export default router;
