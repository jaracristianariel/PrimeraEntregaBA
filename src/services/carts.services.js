import { cartModel } from "../model/carts.model.js";


export const getCartsService = async () => {
    try {
        return await cartModel.find()
    } catch (error) {
        console.log("getCartsService error", error);
        throw error;
    }
}
export const getCartByIdService = async (cid) => {
    try {
        return await cartModel.findById(cid).populate("products.id").lean();
    } catch (error) {
        console.log("getCartByIdService error", error);
        throw error;
    }
}
export const createCartService = async () => {
    try {
        return await cartModel.create({});
    } catch (error) {
        console.log("createCartService error", error);
        throw error;
    }
}
export const addProductInCartService = async (cid, pid) => {
    try {
        const carrito = await cartModel.findById(cid);
        if (!carrito)
            return null;
        const productoInCart = carrito.products.find(p => p.id.toString() === pid);
        if (productoInCart)
            productoInCart.quantity++;
        else 
            carrito.products.push({ id: pid, quantity: 1 })
        carrito.save();
        return carrito;
    } catch (error) {
        console.log("addProductInCartService error", error);
        throw error;
    }
}
export const deleteProducstInCartService = async (cid, pid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid, {$pull:{"products": {id:pid}}}, {new: true});
    } catch (error) {
        console.log("deleteProductInCartService error", error);
        throw error;
    }
}
export const updateCartByIdService = async (cid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid);
    } catch (error) {
        console.log("updateCartByIdService error", error);
        throw error;
    }
}
export const updateProducstInCartService = async (cid, pid, quantity) => {
    try {
        return await cartModel.findOneAndUpdate(
            {_id:cid, "products.id": pid},
            {$set: {"products.$.quantity": quantity}},
            {new: true}
        );
    } catch (error) {
        console.log("deleteProductInCartService error", error);
        throw error;
    }
}
export const deleteCartService = async (cid) => {
    try {
        const carrito = await cartModel.findByIdAndDelete(cid);
        if (carrito)
            return carrito;
        return false;
    } catch (error) {
        console.log("deleteCartService error", error);
        throw error;
    }
}