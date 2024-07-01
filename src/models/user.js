import { Schema, model } from "mongoose";
import cartModel from "./cart.js";

const userShema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: { type: String, unique: true, index: true },

  rol: {
    type: String,
    default: "User",
  },
  documents: {
    type: Object,
    default: [],
  },
  last_connection: {
    type: Date,
  },
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});
userShema.pre("save", async function (next) {
  try {
    const newCart = await cartModel.create({ products: [] });
    this.cart_id = newCart._id;
  } catch (e) {
    next(e);
  }
});

userShema.pre("find", async function (next) {
  try {
    this.populate("cart_id");
  } catch (e) {
    next(e);
  }
});
export const userModel = model("users", userShema);
