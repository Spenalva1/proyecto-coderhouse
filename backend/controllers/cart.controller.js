import logger from '../lib/logger.js';
import { checkoutInfo, sendEmail } from '../lib/mail.js';
import { sendSms, sendWhatsapp } from '../lib/messaging.js';
import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
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

    let total = 0;
    const orderItems = cart.map(({ product, quantity }) => {
      total += product.price * quantity;
      return {
        name: product.name,
        description: product.description,
        photo: product.photo,
        price: product.price,
        quantity,
      };
    });

    const orderItemsDoc = await OrderItem.create(orderItems);

    console.log('orderItemsDoc', orderItemsDoc);
    console.log(
      'orderItemsDoc ids',
      orderItemsDoc.map((oi) => oi._id)
    );

    const order = new Order({
      orderNumber: await Order.count(),
      products: orderItemsDoc.map((oi) => oi._id),
      total,
      userEmail: req.user.email,
    });
    await order.save();

    // sendEmail(
    //   checkoutInfo(name, email, products),
    //   `Nuevo pedido de ${name} - ${email}`
    // );
    // sendWhatsapp(`Nuevo pedido de ${name} - ${email}`);
    // sendSms(phone, `Su pedido ha sido recibido y se encuentra en progreso`);
    await CartItem.deleteMany({ user: req.user.id });
    res.json(order);
  } catch (error) {
    logger.error(`Error en el checkout. ${error}`);
    console.error(error);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
