import { Router } from "express";
import cartModel from "../models/cart.js";

const cartRouter = Router();
cartRouter.post("/",async(req,res)=>{
  try {
    const mensaje=await cartModel.create({products:[]})
    res.status(201).send(mensaje);
  } catch (e) {
    res
      .status(500)
      .send(`internal error when create cart: ${error}`);
  }
})
cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId=req.params.cid
    const cart = await cartModel.findOne({_id:cartId})
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
});

cartRouter.post("/:cid/:pid", async (req, res) => {
  try {
    const cartId=req.params.cid  
    const productId = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartModel.findById(cartId);
    const indice = cart.products.findIndex(product=> product.id_prod == productId);

    if (indice != -1) {
      cart.products[indice].quantity = quantity;
    } else {
      cart.products.push({id_prod:productId,quantity:quantity});
    }
    const mensaje=await cartModel.findByIdAndUpdate(cartId,cart)
    res.status(200).send(mensaje);
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
});

export default cartRouter;
