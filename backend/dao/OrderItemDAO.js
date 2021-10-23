import IDAO from './IDAO.js';
import OrderItem from '../models/OrderItem.js';
import OrderItemDTO from '../dto/OrderItemDTO.js';

class OrderItemDAO extends IDAO {
  constructor() {
    super();
  }

  async create(data) {
    if (Array.isArray(data)) {
      const orderItems = await OrderItem.create(data);
      return orderItems.map(
        ({ _id, name, description, photo, price, quantity }) =>
          new OrderItemDTO(_id, name, description, photo, price, quantity)
      );
    }
    const { _id, name, description, photo, price, quantity } =
      await OrderItem.create(data);
    return new OrderItemDTO(_id, name, description, photo, price, quantity);
  }
}

export default new OrderItemDAO();
