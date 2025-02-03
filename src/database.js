import mongoose from "mongoose";

mongoose.connect("mongodb+srv://jaracristianariel:Vinariel19@cluster0.s6kvl.mongodb.net/Negocio?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conexion exitosa"))
    .catch((error) => console.log("error", error))