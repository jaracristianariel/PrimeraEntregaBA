import fs from "fs";
import ProductManager from "./productManager.js";


class CartsManager {
    static ultId = 0;
    path;
    carts;
    
    constructor(){
        this.path = "./src/data/carts.json";  
        this.carts = this.readCartFile();
    }
    idCart(){
        let id = 1;
        if(this.carts.length !=0)
            id = this.carts[this.carts.length -1].id +1;
        return id;
    }
    readCartFile(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, "utf-8"));
            }
            return [];
        } catch (error) {
            console.log("error al leer archivo")
        }
    }
    createFile(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        } catch (error) {
            console.log("ocurrio un error al guardar")
        }
    }
    createCart(){
        const newCart = {
            id: this.idCart(),
            products:[]
        }
        this.carts.push(newCart);
        this.createFile();
        return newCart
    }
    getCartById(id){
        const producto = this.carts.find(item => item.id == id);
        if (producto) {
            return producto;
        } else {
            return "not Found"
        }
    }
    addProductInCart(cid, pid){
        let result = `El carrito con id ${cid} no existe`
        const indexCart = this.carts.findIndex(item => item.id == cid);
        if(indexCart !== -1){
            const indexProductInCart = this.carts[indexCart].products.findIndex(item => item.id === pid);
            const p = new ProductManager();
            const producto = p.getProducById(pid); 
            if(producto.status && indexProductInCart === -1){
                this.carts[indexCart].products.push({id:pid, "quantity": 1});
                this.createFile();
                result = "producto agregado al carro";
            }else if(producto.status && indexProductInCart !== -1){
                ++this.carts[indexCart].products[indexProductInCart].quantity;
                this.createFile();
                result = "producto agregado al carro";
            }
        }
        return result;
    }


}


export default CartsManager;