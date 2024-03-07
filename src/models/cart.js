import { Schema, model } from "mongoose";

const cartShema=new Schema({
    products:[{
        id_prod:{
            type: Schema.Types.ObjectId,
            required:true,
            ref:"products"
        },
        quantity:{
            type:Number,
            required:true
        }
    }
]
})
cartShema.pre("findOne",function(){
    this.populate("products.id_prod")
})
const  cartModel=model("carts", cartShema)
export default cartModel