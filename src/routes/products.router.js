import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();


router.get("/", (req, res) => {
    const {limit} = req.query;    
    const p = new ProductManager();
    return res.json({productos:p.getProducts(limit)});
})

router.get("/:pid", (req, res) => {
    const {pid} = req.params;
    const p = new ProductManager();
    const producto = p.getProducById(Number(pid));
    return res.json({producto});
})

router.post("/", (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, description, code, price, status, stock, category, thumbnails);
    return res.json({result});
})

router.put("/:pid", (req, res) => {
    const {pid} =  req.params;
    const p = new ProductManager();
    const result = p.updateProduct(Number(pid), req.body);
    return res.json({result});
})

router.delete("/:pid", (req, res) => {
    const {pid} =  req.params;
    const p = new ProductManager();
    const result = p.deleteProduct(Number(pid))
    return res.json({result});
})

export default router;