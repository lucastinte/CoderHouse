import cartModel from "../models/cart.js";
export default class Cart {
  createCart = async () => {
    try {
      const mensaje = await cartModel.create({ products: [] });
      return mensaje;
    } catch (error) {
      throw new Error(`Error interno al crear el carrito: ${error.message}`);
    }
  };
  getCartById = async (cartId) => {
    try {
      const cart = await cartModel
        .findOne({ _id: cartId })
        .populate("products.id_prod");
      if (!cart) {
        throw new Error("El carrito no fue encontrado");
      }
      return cart;
    } catch (error) {
      throw new Error(`Error interno : ${error.message}`);
    }
  };
  addOrUpdateProductInCart = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId, "products.id_prod": productId },
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
      );

      if (!updatedCart) {
        const cart = await cartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { id_prod: productId, quantity: quantity } } },
          { new: true }
        );
        return cart;
      } else {
        return updatedCart;
      }
    } catch (error) {
      throw new Error(`Error interno : ${error.message}`);
    }
  };
  updateAllProductsInCart = async (cartId, newProducts) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { products: newProducts } },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      throw new Error(
        `Error interno al actualizar productos del carrito: ${error.message}`
      );
    }
  };
  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId, "products.id_prod": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      throw new Error(
        `Error interno al actualizar la cantidad del producto en el carrito: ${error.message}`
      );
    }
  };
  removeProductFromCart = async (cartId, productId) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { id_prod: productId } } },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      throw new Error(
        `Internal error when deleting product from cart: ${error.message}`
      );
    }
  };
  removeAll = async (cartId) => {
    try {
      const updatedCart = await cartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Internal error: ${error.message}`);
    }
  };
}
