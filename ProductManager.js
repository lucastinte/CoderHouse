import { promises as fs } from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async readProducts() {
    const prodsData = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(prodsData);
    return this.products;
  }

  async writeProductsToFile() {
    await fs.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2),
      "utf8"
    );
  }
  async getProducts() {
    const products = await this.readProducts();
    console.log(products);
  }

  async getProductById(productId) {
    const products = await this.readProducts();
    const product = products.find((prod) => prod.id === productId);
    if (!product) {
      console.log("Product not found.");
    }
    console.log(product);
  }

  async addProduct(newProduct) {
    // Validación de propiedades
    if (
      !newProduct.code ||
      !newProduct.id ||
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.stock
    ) {
      console.log("Debe ingresar un producto con todas las propiedades");
    }
    //Buscar producto duplicado por código
    const products = await this.readProducts();

    const code = products.findIndex((prod) => prod.code === newProduct.code);
    if (code === -1) {
      //Agregado nuevo producto
      products.push(newProduct);
      await this.writeProductsToFile();
      console.log("Product successfully added.");
    } else {
      console.log("Product already exists.");
    }
  }

  async updateProduct(productId, updatedFields) {
    const products = await this.readProducts();

    const index = products.findIndex((prod) => prod.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.writeProductsToFile();
      console.log("Product successfully updated.");
    } else {
      console.log("Product not found.");
    }
  }

  async deleteProduct(productId) {
    const products = await this.readProducts();
    const index = products.findIndex((prod) => prod.id === productId);
    if (index != -1) {
      products.splice(index, 1); // Remove the product directly from the array
      await this.writeProductsToFile();
      console.log("Product successfully deleted.");
    } else {
      console.log("Product not found.");
    }
  }
}
