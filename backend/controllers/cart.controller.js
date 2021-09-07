import logger from '../lib/logger.js';
import { checkoutInfo, sendEmail } from '../lib/mail.js';
import { sendSms, sendWhatsapp } from '../lib/messaging.js';
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });
    }
    const cartitem = new CartItem({
      user: req.user.id,
      product: req.params.id,
    });
    await cartitem.save();
    return res.status(201).json({ cartitem });
  } catch (error) {
    logger.error(`Error al agregar producto al carrito. ${error}`);
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

export async function checkout(req, res) {
  try {
    const { firstName, lastName, email, cart, phone } = req.user;
    const name = `${firstName} ${lastName}`;
    const products = cart.map((cartItem) => cartItem.product.name);
    if (!products || products?.length <= 0) {
      return res
        .status(400)
        .json({ error_description: 'No hay productos en el carrito.' });
    }
    sendEmail(
      checkoutInfo(name, email, products),
      `Nuevo pedido de ${name} - ${email}`
    );
    sendWhatsapp(`Nuevo pedido de ${name} - ${email}`);
    sendSms(phone, `Su pedido ha sido recibido y se encuentra en progreso`);
    await CartItem.deleteMany({ user: req.user.id });
    res.json({ name, email, products });
  } catch (error) {
    logger.error(`Error al en el checkout. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
