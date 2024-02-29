import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import userRouter from "./routes/userRoutes.js";
import { __dirname } from "./path.js";
import upload from "./config/multer.js";
import mongoose from "mongoose";
console.log(__dirname);
const app = express();
const port = 8080;
//Server
const server = app.listen(port, () => {
  console.log("server on port " + port);
});
const io = new Server(server);//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(
    "mongodb+srv://lucasrtinte19:<password>@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((mensasje) => console.log(mensasje))
  .catch((error) => console.log(error));
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
io.on("connection", (socket) => {
  console.log("Conexion con Socket.io");

  socket.on("movimiento", (info) => {
    //Cuando el cliente me envia un mensaje, lo capturo y lo muestro
    console.log(info);
  });

  socket.on("rendirse", (info) => {
    //Cuando el cliente me envia un mensaje, lo capturo y lo muestro
    console.log(info);
    socket.emit("mensaje-jugador", "Te has rendido"); //Cliente que envio este mensaje
    socket.broadcast.emit("rendicion", "El jugador se rindio"); //Clientes que tengan establecida la comunicacion con el servidor
  });
});
app.use("/static", express.static(__dirname + "/public"));
//para que api products consulte informacion de la carpeta estatica agrego el parametro static
app.use("/api/products", productsRouter, express.static(__dirname + "/public"));
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);
app.post("/upload", upload.single("product"), (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    res.status(200).send("imagen ok");
  } catch (error) {
    res.status(500).send("imagen nop");
  }
});
//funciona dinamicamente pueo enviar la plantilla a renderizar y su estilo

// app.get("/static", (req, res) => {
//   const prods = [
//     {
//       id: 1,
//       title: "celular",
//       price: 1500,
//       img: "https://intercompras.com/product_thumb.php?img=images/product/VORAGO_CELL-500-PL.jpg&w=380&h=320",
//     },
//     {
//       id: 2,
//       title: "tele",
//       price: 1800,
//       img: "https://intercompras.com/product_thumb.php?img=images/product/VORAGO_CELL-500-PL.jpg&w=380&h=320",
//     },
//     {
//       id: 3,
//       title: "tablet",
//       price: 1200,
//       img: "https://intercompras.com/product_thumb.php?img=images/product/VORAGO_CELL-500-PL.jpg&w=380&h=320",
//     },
//     {
//       id: 4,
//       title: "reloj",
//       price: 16500,
//       img: "https://intercompras.com/product_thumb.php?img=images/product/VORAGO_CELL-500-PL.jpg&w=380&h=320",
//     },
//   ];
//   res.render("templates/productos", {
//     mostrarProductos: true,
//     productos: prods,
//     css: "home.css",
//   });
// });
