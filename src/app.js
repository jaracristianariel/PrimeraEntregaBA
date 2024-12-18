import express from "express";
import pRouter from "./routes/products.router.js";
import cRouter from "./routes/carts.router.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    return res.send("vienbenidos, eskrivimos mal pero los rrezivimos vien!!")
})
app.use("/api/products", pRouter);
app.use("/api/carts", cRouter);


app.listen(PORT, () => {
    console.log(`Escuchando desde el puerto ${PORT}`)
})