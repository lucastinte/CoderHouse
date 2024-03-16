import express from "express";
import mongoose from "mongoose";
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexrouter.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import session from "express-session";

const app = express();
const PORT = 8080;

//Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const io = new Server(server);

//Middlewares//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(
    "mongodb+srv://lucasrtinte19:coderhouse@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((mensasje) => console.log(mensasje))
  .catch((error) => console.log(error));
app.use(express.json());
app.use(cookieParser("claveSecreta"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use("/", indexRouter);
app.use(
  session({
    secret: "codersecret",
    resave: true,
    saveUninitialized: true,
  })
);
//ROUTES COOKIES
app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "Esto es una cookie", {
      maxAge: 30000000000,
      signed: true,
    })
    .send("Cookie Creada");
});
app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("CookieCookie").send("Cookie Eliminada");
});
//ROUTES SESSIONS
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Sos el user num ${req.session.counter} en ingresar a la pagina`);
  } else {
    req.session.counter = 1;
    res.send("sos el primer user en ingresar a la page");
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email == "admin@admin.com" && password == "1234") {
    req.session.email = email;
    req.session.password = password;
    res.send("login valido");
  }
  res.send("login invalido");
});
io.on("connection", (socket) => {
  console.log("Conexion con Socket.io");

  socket.on("mensaje", async (mensaje) => {
    try {
      await messageModel.create(mensaje);
      const mensajes = await messageModel.find();
      io.emit("mensajeLogs", mensajes);
    } catch (error) {
      io.emit("mensajeLogs", error);
    }
  });
});
