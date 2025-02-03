import { Router } from "express";
import { getProductsService } from "../services/products.services.js";
import { getCartByIdService } from "../services/carts.services.js";

const router = Router();

router.get("/", async (req, res) => {
    const result = await getProductsService({ ...req.query })
    return res.render("index", { result, title: "tienda" });
});

router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    console.log(cid)
    const carrito = await getCartByIdService(cid)
    return res.render("cart", { title: "Carrito", carrito })
})

router.get("/products", async (req, res) => {
    const result = await getProductsService({ ...req.query })
    return res.render("index", { title: "Productos", result })
})

router.get("/upload", (req, res) => {
    return res.render("upload");
});

export default router;