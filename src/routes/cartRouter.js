import { Router } from "express";
import * as cartController from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.post("/", cartController.createCart);
//get cart by id
cartRouter.get("/:cid", cartController.getCart);
//Add or update a product in the cart

cartRouter.post("/:cid/:pid", cartController.insertProductCart);

cartRouter.get("/purchase/:cid", cartController.createTicket);
export default cartRouter;
