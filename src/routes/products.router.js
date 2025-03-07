import { Router } from "express";
import { addProduct, deleteProduct, getProducById, getProducts, updateProduct } from "../controllers/products.controllers.js";

const router = Router();

router.get("/", getProducts)
router.get("/:pid", getProducById)
router.post("/", addProduct)
router.put("/:pid", updateProduct)
router.delete("/:pid", deleteProduct)

export default router;