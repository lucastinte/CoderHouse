import express from "express";
import productsRouter from "./routes/productsRouter.js";
import { __dirname } from "./path.js";
import upload from "./config/multer.js";
console.log(__dirname);
const app = express();
const port = 3000;

app.use(express.json())
app.use("/static",express.static(__dirname + "/public"))
app.use("/products",productsRouter)

app.listen(port, () => {
  console.log("server on port " + port);
});
