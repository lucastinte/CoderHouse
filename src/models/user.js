import { Schema, model } from "mongoose";
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
});
export const userModel = model("users", userShema);
