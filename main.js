import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager("./products.json");
const producto1version2 = new Product("Arroz", "Muy rico", 1400, 26, "A123");

const producto1 = new Product("Arroz", "Muy rico", 1200, 20, "A123");
//productManager.addProduct(producto1);
//productManager.getProducts();
//productManager.getProductById("0422c3353784a8fd0d32");
//productManager.updateProduct("0422c3353784a8fd0d32", producto1version2);
productManager.deleteProduct("846afec1df83b486522c");
