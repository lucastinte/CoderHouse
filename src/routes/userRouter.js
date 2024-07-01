import { Router } from "express";
import { getUsers, sendDocuments } from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
});
userRouter.post("/:uid/documents", sendDocuments);
export default userRouter;
