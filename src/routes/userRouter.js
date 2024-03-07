import { Router } from "express";
import { userModel } from "../models/user.js";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
});
userRouter.post("/", async (req, res) => {
  try {
    const { nombre, apellido, email, edad, password } = req.body;
    const resultado = await userModel.create({
      nombre,
      apellido,
      email,
      edad,
      password,
    });
    res.status(201).send(resultado);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      // Error de duplicación de clave única (correo electrónico)
      res.status(400).send("El correo electrónico ya está registrado");
    } else {
      // Otro tipo de error
      console.error("Error al crear usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
});
export default userRouter;
