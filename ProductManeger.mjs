import crypto from "crypto";
import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.readProductsFromFile();
  }

  async readProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async writeProductsToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing to file:", error.message);
    }
  }

  async addProduct(product) {
    const newProduct = {
      id: crypto.randomBytes(10).toString("hex"),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };

    this.products.push(newProduct);
    await this.writeProductsToFile();
    console.log("Product successfully added.");
  }

  getProducts() {
    return this.products;
  }

  async getProductById(productId) {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      console.log("Product not found.");
    }
    return product;
  }

  async updateProduct(productId, updatedFields) {
    const index = this.products.findIndex((prod) => prod.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.writeProductsToFile();
      console.log("Product successfully updated.");
    } else {
      console.log("Product not found.");
    }
  }

  async deleteProduct(productId) {
    this.products = this.products.filter((prod) => prod.id !== productId);
    await this.writeProductsToFile();
    console.log("Product successfully deleted.");
  }
}
//TESTING
// const path = './products.json';

// const productManager = new ProductManager(path);

// await productManager.readProductsFromFile();
// await productManager.addProduct({
//   title: 'producto prueba',
//   description: 'Este es un producto prueba',
//   price: 200,
//   thumbnail: 'sin imagen',
//   code: 'abc',
//   stock: 25,
// });

// const allProducts = productManager.getProducts();
// console.log('Todos los productos:', allProducts);

// const productId = 'ID_DEL_PRODUCTO';
// const productById = await productManager.getProductById(productId);
// console.log('Producto por ID:', productById);

// await productManager.updateProduct('ID_DEL_PRODUCTO', {
//   NUEVOS_CAMPOS: 'NUEVOS_VALORES',
// });

// await productManager.deleteProduct('ID_DEL_PRODUCTO');

// console.log('Productos finales:', productManager.getProducts());