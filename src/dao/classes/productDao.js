import productModel from "../models/product.js";
export default class Product {
  getProducts = async (limit, page, filter, ord) => {
    try {
      let metFilter;
      const pag = page !== undefined ? page : 1;
      const limi = limit !== undefined ? limit : 10;

      if (filter == "true" || filter == "false") {
        metFilter = "status";
      } else {
        if (filter !== undefined) metFilter = "category";
      }

      const query = metFilter != undefined ? { [metFilter]: filter } : {};
      const ordQuery = ord !== undefined ? { price: ord } : {};
      const prods = await productModel.paginate(query, {
        limit: limi,
        page: pag,
        sort: ordQuery,
      });
      return prods;
    } catch (e) {
      throw new Error(`Error interno : ${e.message}`);
    }
  };
  getProduct = async (idProducto) => {
    try {
      const prod = await productModel.findById(idProducto);
      return prod;
    } catch (e) {
      throw new Error(`Error interno : ${e.message}`);
    }
  };
  createProduct = async (product) => {
    try {
      const mensaje = await productModel.create(product);
      return mensaje;
    } catch (e) {
      throw new Error(`Error interno : ${e.message}`);
    }
  };
  updatedProduct = async (idProducto, upProduct) => {
    try {
      const mensaje = await productModel.findByIdAndUpdate(
        idProducto,
        upProduct
      );
      return mensaje;
    } catch (e) {
      throw new Error(`Error interno : ${e.message}`);
    }
  };
  deleteProduct = async (idProducto) => {
    try {
      const mensaje = await productModel.findByIdAndDelete(idProducto);
      return mensaje;
    } catch (e) {
      throw new Error(`Error interno : ${e.message}`);
    }
  };
}
