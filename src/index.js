import express from "express";
import mongoose from "mongoose";
import orderModel from "./models/order.js";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

//Middlewares//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(
    "mongodb+srv://lucasrtinte19:coderhouse@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then()
  .catch((error) => console.log(error));
const resultado = await orderModel.paginate({}, { limit: 15 });
// const resultado = await orderModel.aggregate([
//   { $match: { size: "medium" } },
//   {
//     $group: {
//       _id: "$name",
//       totalQuantity: { $sum: "$quantity" },
//       totalPrice: { $sum: "$price" },
//     },
//   },
//   { $sort: { totalPrice: -1 } }, //mayor a menor
//   {
//     $group: { _id: 1, orders: { $push: "$$ROOT" } },
//   },
//   { $merge: { into: "reports" } },
// ]);

console.log(resultado);
// await orderModel.insertMany([
//   { name: "Napolitana", size: "small", price: 8000, quantity: 4 },
//   { name: "4 quesos", size: "small", price: 12000, quantity: 4 },
//   { name: "4 quesos", size: "medium", price: 14000, quantity: 2 },
//   { name: "4 quesos", size: "large", price: 18000, quantity: 2 },
//   { name: "4 quesos", size: "medium", price: 7000, quantity: 1 },
//   { name: "Calabresa", size: "small", price: 5000, quantity: 2 },
//   { name: "Calabresa", size: "medium", price: 8000, quantity: 2 },
//   { name: "Calabresa", size: "large", price: 9000, quantity: 2 },
//   { name: "Calabresa", size: "large", price: 4500, quantity: 1 },
//   { name: "Napolitana", size: "medium", price: 10000, quantity: 2 },
//   { name: "Napolitana", size: "large", price: 14000, quantity: 2 },
//   { name: "Napolitana", size: "small", price: 6000, quantity: 3 },
//   { name: "Vegetariana", size: "small", price: 3000, quantity: 2 },
//   { name: "Vegetariana", size: "medium", price: 6000, quantity: 3 },
//   { name: "Vegetariana", size: "medium", price: 8000, quantity: 4 },
//   { name: "Vegetariana", size: "large", price: 3500, quantity: 1 },
//   { name: "Jamon y morrones", size: "small", price: 5000, quantity: 2 },
//   { name: "Jamon y morrones", size: "large", price: 8000, quantity: 2 },
//   { name: "Jamon y morrones", size: "medium", price: 6000, quantity: 2 },
//   { name: "Jamon y morrones", size: "small", price: 7500, quantity: 3 },
//   { name: "Napolitana", size: "medium", price: 15000, quantity: 3 },
// ]);
