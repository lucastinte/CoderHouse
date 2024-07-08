import { Router } from "express";
import { isAdmin } from "../config/isAdmin.js";
import path from "path";
import { __dirname } from "../path.js";
import {
  getUsers,
  sendDocuments,
  deleteInactiveUsers,
  deleteUser,
} from "../controllers/userController.js";
const userRouter = Router();
userRouter.use("/admin", isAdmin);
userRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
});
userRouter.get("/session", (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).send("Usuario no autenticado");
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});
userRouter.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/views/products.html"));
});
userRouter.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/views/cart.html"));
});
userRouter.post("/:uid/documents", sendDocuments);

userRouter.delete("/", deleteInactiveUsers);
userRouter.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/views/admin.html"));
});
userRouter.delete("/admin/:uid", deleteUser);
export default userRouter;
