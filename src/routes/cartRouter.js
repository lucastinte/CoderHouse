import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
const cartRouter = Router();
//create new cart
cartRouter.post("/", cartController.createCart);
//get cart by id
cartRouter.get("/:cid", cartController.getCartById);
//Add or update a product in the cart
cartRouter.post("/:cid/:pid", cartController.addOrUpdateProductInCart);
cartRouter.put("/:cid", cartController.updateAllProductsInCart);
//Aqui actualiza la cantidad de productos mediante un set pero no los suma
cartRouter.put(
  "/:cid/products/:pid",
  cartController.updateAllProductsInCartWhitSet
);
//deja solo un array vacio en el carrito []
cartRouter.delete("/:cid/products/:pid", cartController.removeProductFromCart);
cartRouter.delete("/:cid", cartController.removeAll);
//deberá eliminar del carrito el producto seleccionado.
//EXAMPLE JSON NEW ARRAY FOR CART
// [
//   {
//     "id_prod": "65f41885758419b117b9f787",
//     "quantity": 2
//   },
//   {
//     "id_prod": "65f41834758419b117b9f785",
//     "quantity": 3
//   },
//   {
//     "id_prod": "65f41854758419b117b9f786",
//     "quantity": 1
//   }
// ]
export default cartRouter;
