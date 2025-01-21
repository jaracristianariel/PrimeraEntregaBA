import express from "express";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import pRouter from "./routes/products.router.js";
import cRouter from "./routes/carts.router.js";
import views from "./routes/views.router.js";
import __dirname from "./utils.js";
import ProductManager from "./productManager.js";


const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/", views);
app.use("/api/products", pRouter);
app.use("/api/carts", cRouter);


const expressServer = app.listen(PORT, () => {console.log(`Escuchando desde el puerto ${PORT}`)})


const socketServer = new Server(expressServer);
socketServer.on("connection",async socket => {
    const productos = p.getProducts();
    socket.emit("productos", await productos);
    
    socket.on("agregarProducto", producto =>{
        const result = p.addProduct({...producto})
        socketServer.sockets.emit("productos", productos)
        console.log({result})
    })

    socket.on("eliminarProducto", (id) =>{

        console.log(id)
    })
})

