import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/userRoutes.js";
import { __dirname } from "./path.js";
import upload from "./config/multer.js";
import mongoose from "mongoose";
console.log(__dirname);
const app = express();
const port = 8080;
//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(
    "mongodb+srv://lucasrtinte19:coderhouse@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((mensasje) => console.log(mensasje))
  .catch((error) => console.log(error));
app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
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
app.listen(port, () => {
  console.log("server on port " + port);
});
