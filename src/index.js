import express from "express";
import { ProductManager } from "./config/ProductManager.js";
const app = express();
const port = 3000;
const productManager = new ProductManager("./src/data/products.json");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const prods = await productManager.getProducts();
  const limite = parseInt(limit);
  if (!isNaN(limite) && limite >= 0) {
    const prodsLimit = prods.slice(0, limite);
    res.send(prodsLimit);
  } else if (!limit) {
    res.send(prods);
  } else {
    res.send("Ingrese un valor valido");
  }
});

app.get("/products/:pid", async (req, res) => {
  const idProducto = req.params.pid;
  const prod = await productManager.getProductById(idProducto);
  res.send(prod);
});

app.listen(port, () => {
  console.log("server on port " + port);
});
