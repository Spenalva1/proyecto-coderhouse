import Mongoose from 'mongoose';
import IDAO from './IDAO.js';
import CartItem from '../models/CartItem.js';
import CartItemDTO from '../dto/CartItemDTO.js';

const isValidId = Mongoose.Types.ObjectId.isValid;

class CartItemDAO extends IDAO {
  constructor() {
    super();
  }

  async create(data) {
    const { _id, user, product, quantity, timestamp } = await CartItem.create(
      data
    );
    return new CartItemDTO(_id, user, product, quantity, timestamp);
  }

  async findById(id) {
    if (!isValidId(id)) return null;
    const cartItem = await CartItem.findById(id);
    if (cartItem) {
      const { _id, user, product, quantity, timestamp } = cartItem;
      return new CartItemDTO(_id, user, product, quantity, timestamp);
    }
    return null;
  }

  async find(query = {}, sort = null) {
    let cartItems;
    if (sort) {
      cartItems = await CartItem.find(query).sort(sort);
    } else {
      cartItems = await CartItem.find(query);
    }
    return cartItems.map(
      ({ _id, user, product, quantity, timestamp }) =>
        new CartItemDTO(_id, user, product, quantity, timestamp)
    );
  }

  async findOne(query = {}) {
    const cartItem = await CartItem.findOne(query);
    if (cartItem) {
      const { _id, user, product, quantity, timestamp } = cartItem;
      return new CartItemDTO(_id, user, product, quantity, timestamp);
    }
    return null;
  }

  async update(id, toUpdate) {
    if (!isValidId(id)) return null;
    if (await CartItem.findByIdAndUpdate(id, toUpdate)) {
      return new CartItemDTO(
        id,
        toUpdate.user,
        toUpdate.product,
        toUpdate.quantity,
        toUpdate.timestamp
      );
    }
    return null;
  }

  async delete(query) {
    await CartItem.deleteMany(query);
  }

  async deleteById(id) {
    if (!isValidId(id)) return null;
    const { _id, user, product, quantity, timestamp } =
      await CartItem.findByIdAndDelete(id);
    return new CartItemDTO(_id, user, product, quantity, timestamp);
  }
}

export default new CartItemDAO();
