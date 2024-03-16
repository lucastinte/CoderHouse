import { Router } from "express";
import cartModel from "../models/cart.js";

const cartRouter = Router();
//create new cart
cartRouter.post("/", async (req, res) => {
  try {
    const mensaje = await cartModel.create({ products: [] });
    res.status(201).send(mensaje);
  } catch (e) {
    res.status(500).send(`internal error when create cart: ${error}`);
  }
});
//get cart by id
cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel
      .findOne({ _id: cartId })
      .populate("products.id_prod");
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
});
//Add or update a product in the cart

cartRouter.post("/:cid/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let { quantity } = req.body;

    if (quantity === undefined) {
      quantity = 1;
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cartId, "products.id_prod": productId },
      { $inc: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { $push: { products: { id_prod: productId, quantity: quantity } } },
        { new: true }
      );
      res.status(200).send(cart);
    } else {
      res.status(200).send(updatedCart);
    }
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
});

export default cartRouter;
