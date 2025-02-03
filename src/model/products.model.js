import {Schema, model}from "mongoose";

const prodSchema = new Schema({
    title: {type: String, required: [true, "el titulo es obligatorio"]},
    description: {type: String, required: [true, "agregar descripcion"]},
    code: {type: String, required: [true, "codigo obligatorio"], unique: true},
    price: {type: Number, required: [true, "agregar precio"]},
    status: {type: Boolean, default: true},
    stock: {type: Number, required: [true, "gregar stock"]},
    category: {type: String, required: [true, "agregar categoria"]},
    thumbnails: [{type: String}]
});

export const prodModel = model("producto", prodSchema);

