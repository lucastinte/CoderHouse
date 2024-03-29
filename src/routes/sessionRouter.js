import { Router } from "express";
import passport from "passport";
const sessionRouter = Router();

sessionRouter.get(
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

      res.status(200).render("templates/products", { user: req.user });
    } catch (error) {
      return res.status(500).send(e);
    }
  }
);
sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send("Usuario ya existente en la aplicacion");
      }

      res.status(200).send("Usuario creado correctamente");
    } catch (e) {
      res.status(500).send("Error al registrar usuario");
    }
  }
);
sessionRouter.get("/github", async (req, res, next) => {
  await passport.authenticate("github", { scope: ["user:email"] })(
    req,
    res,
    next
  );
});
sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = {
      email: req.user.email,
      first_name: req.user.name,
    };
    res.redirect("/");
  }
);
sessionRouter.get("/logout", (req, res) => {
  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect("/");
    }
  });
});
sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    res.send(req.user);
  })
);
export default sessionRouter;
