import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { __dirname } from "./path.js";
import upload from "./config/multer.js";
console.log(__dirname);
const app = express();
const port = 8080;

app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
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
