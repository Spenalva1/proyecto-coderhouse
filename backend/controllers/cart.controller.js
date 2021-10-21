import logger from '../lib/logger.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export async function getCartItems(req, res) {
  try {
    const cartItems = await CartItem.find({ user: req.user.id });
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

    let [cartItem] = await CartItem.find({
      user: req.user.id,
      product: { _id: req.params.id },
    });

    if (cartItem) {
      // Ya tiene el producto en el carrito, por lo que le sumamos la nueva cantidad
      cartItem.quantity = cartItem.quantity + quantity;
    } else {
      // El producto no se encuentra en el carrito, lo agregamos
      cartItem = new CartItem({
        user: req.user.id,
        product: req.params.id,
        quantity,
      });
    }

    await cartItem.save();
    return res.status(201).json(cartItem);
  } catch (error) {
    logger.error(`Error al agregar producto al carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (Number(quantity) <= 0) {
      return res
        .status(400)
        .json({ error_description: 'Parametros erroneos.' });
    }

    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res
        .status(400)
        .json({ error_description: 'Ítem de carrito no encontrado.' });
    }

    cartItem.quantity = quantity;
    cartItem.save();
    return res.status(201).json(cartItem);
  } catch (error) {
    logger.error(`Error al modificar cantidad del producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function deleteCartItem(req, res) {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(400).json({ error_description: 'Ítem no encontrado.' });
    }
    res.json({ cartItem });
  } catch (error) {
    logger.error(`Error al borrar producto del carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
