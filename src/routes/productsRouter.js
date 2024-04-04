import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../controllers/productController.js";
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, page, filter, ord } = req.query;
    const prods = await getProducts(limit, page, filter, ord);
    const productos = prods.docs.map((producto) => producto.toObject());
    res.status(200).render("templates/products", {
      mostrarProductos: true,
      productos,
    });
  } catch (error) {
    res.status(500).render("templates/error", {
      error: error,
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const prod = await getProduct(idProducto);
    if (prod) {
      res.status(200).send(prod);
    } else {
      res.status(404).send("Producto no existe");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto:${error}`);
  }
});
productsRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const mensaje = await createProduct(product);
    res.status(201).send(mensaje);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto:${error}`);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const idProducto = req.params.pid;
    const upProduct = req.body;
    const prod = await updatedProduct(idProducto, upProduct);
    res.status(200).send(prod);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto:${error}`);
  }
});
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const idProducto = req.params.pid;
    const mensaje = await deleteProduct(idProducto);
    res.status(200).send(mensaje);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto:${error}`);
  }
});
export default productsRouter;
