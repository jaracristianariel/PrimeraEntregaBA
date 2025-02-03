import { Router } from "express";
import { addProductInCart, createCart, deleteCart, deleteProductsInCart, getCartById, getCarts, updateCartById, updateProductsInCart } from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById)
router.post("/", createCart)
router.post("/:cid/product/:pid", addProductInCart)
router.put("/:cid/products/:pid", updateProductsInCart)
router.put("/:cid", updateCartById)
router.delete("/:cid/products/:pid", deleteProductsInCart)
router.delete("/:cid", deleteCart)



export default router;