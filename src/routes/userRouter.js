import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
});

export default userRouter;
