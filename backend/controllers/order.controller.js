import logger from '../lib/logger.js';
import { checkoutInfo, sendEmail } from '../lib/mail.js';
import CartItemDAO from '../dao/CartItemDAO.js';
import OrderItemDAO from '../dao/OrderItemDAO.js';
import OrderDAO from '../dao/OrderDAO.js';
import Order from '../models/Order.js';

export async function checkout(req, res) {
  try {
    const { firstName, lastName, email, cart } = req.user;
    const name = `${firstName} ${lastName}`;

    if (!cart || cart?.length <= 0) {
      return res
        .status(400)
        .json({ error_description: 'No hay productos en el carrito.' });
    }

    const products = [];
    let total = 0;
    const orderItems = cart.map(({ product, quantity }) => {
      products.push(`${product.name} x ${quantity}`);
      total += product.price * quantity;
      return {
        name: product.name,
        description: product.description,
        photo: product.photo,
        price: product.price,
        quantity,
      };
    });

    const orderItemsDto = await OrderItemDAO.create(orderItems);

    const order = await OrderDAO.create({
      orderNumber: await Order.count(),
      products: orderItemsDto.map((oi) => oi._id),
      total,
      userEmail: req.user.email,
      date: new Date(),
    });

    sendEmail(
      checkoutInfo(name, email, products),
      `Nuevo pedido de ${name} - ${email}`
    );
    sendEmail(
      checkoutInfo(name, email, products),
      `Nuevo pedido de ${name} - ${email}`,
      email
    );
    await CartItemDAO.delete({ user: req.user._id });
    res.status(201).json(order);
  } catch (error) {
    logger.error(`Error en el checkout. ${error}`);
    console.error(error);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getOrders(req, res) {
  try {
    return res.json(
      await OrderDAO.find({ userEmail: req.user.email }, { _id: -1 })
    );
  } catch (error) {
    logger.error(`Error al obtener carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getOrder(req, res) {
  try {
    const order = await OrderDAO.findOne({
      // Un usuario solo puede solicitar una orden suya
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!order)
      return res
        .status(404)
        .json({ error_description: 'Orden no encontrada.' });

    res.json(order);
  } catch (error) {
    logger.error(`Error al obtener producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
