import Cart from "../dao/classes/cartDao.js";
const cartService = new Cart();
export const createCart = async (req, res) => {
  try {
    const mensaje = await cartService.createCart();
    res.status(201).send(mensaje);
  } catch (error) {
    res.status(500).send(`Error interno al crear el carrito: ${error.message}`);
  }
};
export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);
    const products = cart.products.map((product) => ({
      title: product.id_prod.title,
      quantity: product.quantity,
    }));
    res.render("templates/cart", { products });
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
};
export const addOrUpdateProductInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let { quantity } = req.body;

    if (quantity === undefined) {
      quantity = 1;
    }

    const updatedCart = await cartService.addOrUpdateProductInCart(
      cartId,
      productId,
      quantity
    );

    res.status(200).send(updatedCart);
  } catch (error) {
    res
      .status(500)
      .send(`internal error when reading products from cart: ${error}`);
  }
};

export const updateAllProductsInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const newProducts = req.body;
    const updatedCart = await cartService.updateAllProductsInCart(
      cartId,
      newProducts
    );
    if (!updatedCart) {
      return res.status(404).send("Cart not found");
    }

    res.status(200).send(updatedCart);
  } catch (error) {
    res
      .status(500)
      .send(`internal error when updating products from cart: ${error}`);
  }
};
export const updateAllProductsInCartWhitSet = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).send("Invalid quantity");
    }

    const updatedCart = await cartService.updateProductQuantity(
      cartId,
      productId,
      quantity
    );

    if (!updatedCart) {
      return res.status(404).send("Cart or product not found");
    }

    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(`Internal error : ${error}`);
  }
};
export const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const updatedCart = await cartService.removeProductFromCart(
      cartId,
      productId
    );
    if (updatedCart) {
      res.status(200).send(updatedCart);
    } else {
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    res
      .status(500)
      .send(`internal error when deleting product from cart: ${error}`);
  }
};
export const removeAll = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartService.removeAll(cartId);
    if (!result) {
      return res.status(404).send("Cart not found");
    }
    res.status(200).send(" removed!");
  } catch (error) {
    res.status(500).send(`Internal error : ${error}`);
  }
};
