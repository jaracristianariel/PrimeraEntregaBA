import {Schema, model} from "mongoose";

const cartSchema = new Schema({    
    products: [        
        {
            _id: false,
            id: {
                type: Schema.Types.ObjectId,
                ref: "producto"
            },
            quantity: {
                type: Number, 
                required: [true, "agregar cantidad"]
            }
        },
    ]
});

export const cartModel = model("cart", cartSchema);

