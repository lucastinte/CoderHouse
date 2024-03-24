import { Router } from "express";
import passport from "passport";
const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("usuario o contra no validos");
      }
      req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
      };

      res.status(200).send("Usuario logueado correctamente");
    } catch (error) {
      return res.status(500).send(e);
    }
  }
);
sessionRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      res.status(400).send("Correo ya utilizado");
    } else {
      await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password),
      });
      res.status(200).send("Usuario creado");
    }
  } catch (e) {
    res.status(500).send("Error al registrar user: ", e);
  }
});

export default sessionRouter;
