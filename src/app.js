import express from "express";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import pRouter from "./routes/products.router.js";
import cRouter from "./routes/carts.router.js";
import views from "./routes/views.router.js";
import __dirname from "./utils.js";
import "./database.js";
import { addProductService, getProductsService } from "./services/products.services.js";

const app = express();
const PORT = 8080;

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
const io = new Server(expressServer);
io.on("connection", async (socket) => {

    const {payload} = await getProductsService({});
    const productos = payload;
    socket.emit("productos", payload);    
    socket.on("agregarProducto", async producto =>{
        const newProduct = await addProductService({...producto});
        if (newProduct){
            productos.push(newProduct)
        }
        socket.emit("productos", productos);
    })

})

