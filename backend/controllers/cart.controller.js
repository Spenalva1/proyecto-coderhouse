import CartItemDAO from '../dao/CartItemDAO.js';
import logger from '../lib/logger.js';
import Product from '../models/Product.js';

export async function getCartItems(req, res) {
  try {
    // obtengo los items relacionados con el usuario logueado por JWT
    const cartItems = await CartItemDAO.find({ user: req.user._id });
    return res.json(cartItems);
  } catch (error) {
    logger.error(`Error al obtener carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function createCartItem(req, res) {
  try {
    const quantity = req.body.quantity ? Number(req.body.quantity) : 1;
    if (isNaN(quantity))
      return res.status(400).json({ error_description: 'Cantidad no válida.' });

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error_description: 'Producto no encontrado.' });
    }

    let cartItem = await CartItemDAO.findOne({
      user: req.user._id,
      product: { _id: req.params.id },
    });

    if (cartItem) {
      // Ya tiene el producto en el carrito, por lo que le sumamos la nueva cantidad
      cartItem.quantity = cartItem.quantity + quantity;
      CartItemDAO.update(cartItem._id, cartItem);
      return res.status(200).json(cartItem);
    } else {
      // El producto no se encuentra en el carrito, lo agregamos creando un CartItem que relacione al usuario logueado con el producto indicado por params
      cartItem = await CartItemDAO.create({
        user: req.user._id,
        product: req.params.id,
        quantity,
        timestamp: Date.now(),
      });
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    logger.error(`Error al agregar producto al carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (Number(quantity) <= 0 || isNaN(quantity)) {
      return res
        .status(400)
        .json({ error_description: 'Parametros erroneos.' });
    }

    const cartItem = await CartItemDAO.findById(id);

    if (!cartItem) {
      return res
        .status(404)
        .json({ error_description: 'Ítem de carrito no encontrado.' });
    }

    cartItem.quantity = quantity;
    CartItemDAO.update(cartItem._id, cartItem);
    return res.status(200).json(cartItem);
  } catch (error) {
    logger.error(`Error al modificar cantidad del producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function deleteCartItem(req, res) {
  try {
    // Borro el CartItem que relaciona al usuario logueado por JWT con el producto recibido por params
    const cartItem = await CartItemDAO.deleteById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error_description: 'Ítem no encontrado.' });
    }
    res.json(cartItem);
  } catch (error) {
    logger.error(`Error al borrar producto del carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
