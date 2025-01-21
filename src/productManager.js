import fs from "fs";


class ProductManager {
    static ultId = 0;
    path;
    products;
    
    constructor(){
        this.path = "./src/data/productos.json";  
        this.products = this.readFile();
    }
    readFile(){
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
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log("ocurrio un error al guardar")
        }
    }
    addProduct({title, description, code, price, status = true, stock, category, thumbnails=[]}){
        if (!title || !description || !code || !price ||!stock || !category)
            return "todos los campos son requeridos";
        
        const numCode = this.products.some(item => item.code == code)
        if (numCode)
            return "codigo ya registrado";
        
        const nuevoProducto = {
            id:  ++ProductManager.ultId,
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails
        }
        this.products.push(nuevoProducto);
        this.createFile();
        return "producto agregado"    
    }
    getProducts(limit = 0){
        limit = Number(limit);
        if (limit > 0)
            return this.products.slice(0, limit);
        return this.products;
    }
    getProducById(id){
        let status = false;
        let resp = "el producto con ese id no existe";

        const producto = this.products.find(item => item.id == id);
        if (producto) {
            status = true;
            resp = producto;
        } 
        return {status, resp}
    }
    updateProduct(id, products){
        const index = this.products.findIndex(item => item.id === id);
        if (index !== -1){
            const{id, ...rest} = products;
            this.products[index] = {...this.products[index], ...rest}
            this.createFile();
            return "poducto actualizado";
        }
        return "no se encontro el pdocuto";

    }
    deleteProduct(id){
        const index = this.products.findIndex(item => item.id === id);
        if (index !== -1){
            this.products = this.products.filter(item => item.id !== id);
            this.createFile();
            return "producto eliminado"
        }
        return "no pudimos encontrar el producto con ese id"
    }
}


export default ProductManager;