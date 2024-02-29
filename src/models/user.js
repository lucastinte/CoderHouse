import { Schema, model } from "mongoose";
const userShema = new Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  password: String,
  email: { type: String, unique: true },
});
export const userModel = model("users", userShema);
