import IDAO from './IDAO.js';
import Order from '../models/Order.js';
import OderDTO from '../dto/OrderDTO.js';
import OrderItemDTO from '../dto/OrderItemDTO.js';

class OrderDAO extends IDAO {
  constructor() {
    super();
  }

  async create(data) {
    const { _id, orderNumber, products, total, date, userEmail } =
      await Order.create(data);
    return new OderDTO(_id, orderNumber, products, total, date, userEmail);
  }

  async find(query = {}, sort = null) {
    let orders;
    if (sort) {
      orders = await Order.find(query).sort(sort);
    } else {
      orders = await Order.find(query);
    }
    return orders.map(
      ({ _id, orderNumber, products, total, date, userEmail }) => {
        const orderItems = products.map(
          (orderItem) =>
            new OrderItemDTO(
              orderItem._id,
              orderItem.name,
              orderItem.description,
              orderItem.photo,
              orderItem.price,
              orderItem.quantity
            )
        );
        return new OderDTO(
          _id,
          orderNumber,
          orderItems,
          total,
          date,
          userEmail
        );
      }
    );
  }

  async findOne(query = {}) {
    const order = await Order.findOne(query);
    if (order) {
      const { _id, orderNumber, products, total, date, userEmail } = order;
      const orderItems = products.map(
        (orderItem) =>
          new OrderItemDTO(
            orderItem._id,
            orderItem.name,
            orderItem.description,
            orderItem.photo,
            orderItem.price,
            orderItem.quantity
          )
      );
      return new OderDTO(_id, orderNumber, orderItems, total, date, userEmail);
    }
    return null;
  }
}

export default new OrderDAO();
