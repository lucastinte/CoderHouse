import { Router } from "express";
import { userModel } from "../models/user.js";

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (user && password == user.password) {
      res.status(200).send("usuario logeado");
    } else {
      res.status(401).send("Usuario o contraseña no válidos");
    }
  } catch (e) {
    res.status(500).send("Error al intentar iniciar sesión: " + e.message);
  }
});
sessionRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const resultado = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
    });
    if (resultado) {
    }
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

export default sessionRouter;
