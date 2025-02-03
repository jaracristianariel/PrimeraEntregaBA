import { request, response } from "express";
import { addProductInCartService, createCartService, deleteCartService, deleteProducstInCartService, getCartByIdService, getCartsService, updateCartByIdService, updateProducstInCartService } from "../services/carts.services.js";

export const getCarts = async (req = request, res = response) => {
    try {
        const carrito = await getCartsService()
        return res.json({ carrito });
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await getCartByIdService(cid);
        if (carrito)
            return res.json({ carrito });
        return res.status(404).json({ msg: `el carrito ${cid} no existe` })
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const createCart = async (req = request, res = response) => {
    try {
        const carrito = await createCartService({});
        return res.json({ msg: "carrito creado", carrito });
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const addProductInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await addProductInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({ msg: `el carrito ${cid} no existe` });
        return res.json({msg: "carrito actualizado", carrito});
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const deleteProductsInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await deleteProducstInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({ msg: `el carrito ${cid} no existe` });
        return res.json({msg: "producto eliminado del carrito", carrito});
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const updateCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await updateCartByIdService(cid);
        if (carrito)
            return res.json({ msg: "carrito actualizado con un [] de productos con el formato especificado arriba :/", carrito });
        return res.status(404).json({ msg: "el carrito no existe" })
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const updateProductsInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const { quantity }= req.body;
        if (!quantity || !Number.isInteger(quantity))
            return res.status(404).json({ msg: "la propiedad quantity es obligatoria y debe ser un numero entero" });
        const carrito = await updateProducstInCartService(cid, pid, quantity);
        if (!carrito)
            return res.status(404).json({ msg: `el carrito ${cid} no existe` });
        return res.json({msg: "producto actualizado del carrito", carrito});
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}
export const deleteCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await deleteCartService(cid);
        if (carrito)
            return res.json({ msg: "carrito aliminado", carrito });
        return res.status(404).json({ msg: "el carrito no existe" })
    } catch (error) {
        return res.status(500).json({ msg: "error", error })
    }
}