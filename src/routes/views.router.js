import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();

router.get("/", async (req, res) => {
    const p = new ProductManager();
    const productos = await p.getProducts();
    return res.render("home", {productos});
});

router.get("/realtimeproducts", (req, res) => {
    return res.render("realTimeProducts");
});

export default router;