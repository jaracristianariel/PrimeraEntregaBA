import { request, response } from "express";
import { addProductService, deleteProductService, getProducByIdService, getProductsService, updateProductService } from "../services/products.services.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const result = await getProductsService({...req.query});    
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({msg: "getProducts error", error})
    }
}
export const getProducById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const producto = await getProducByIdService(pid);
        if (!producto)
            return res.status(404).json({msg: `no existe producto ${pid}`})
        return res.json({ producto });
    } catch (error) {
        console.log("error en getProducById ");
        return res.status(500).json({msg: "error", error})
    }
}
export const addProduct = async (req = request, res = response) => {
    try {
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        if (!title, !description, !code, !price, !stock, !category)
            return res.status(404).json({msg: "salteaste campos obligatorios"})
        const producto = await addProductService({...req.body});
        return res.json({producto});
    } catch (error) {
        return res.status(500).json({msg: "addProduct error", error})
    }
}
export const updateProduct = async (req = request, res = response) => {
    try {
        const {pid} =  req.params;
        const {_id, ...rest} = req.body;
        const producto = await updateProductService(pid, rest);
        if (producto)
            return res.json({msg: "producto actualizado", producto})
        return res.status(404).json({msg: `no se pudo actualizar el producto ${pid}`})
    } catch (error) {
        return res.status(500).json({msg: "updateProduct error", error})
    }
}
export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } =  req.params;
        const producto = await deleteProductService(pid);
        if (producto)
            return res.json({msg: "producto eliminado", producto})
        return res.status(404).json({msg: `no se pudo eliminar el producto ${pid}`})
    } catch (error) {
        return res.status(500).json({msg: "deleteProduct error", error})
    }
}