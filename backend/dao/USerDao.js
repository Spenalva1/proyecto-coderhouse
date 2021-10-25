import IDAO from './IDAO.js';
import User from '../models/User.js';
import UserDTO from '../dto/UserDTO.js';
import CartItemDTO from '../dto/CartItemDTO.js';

class UserDAO extends IDAO {
  constructor() {
    super();
  }

  async create(data) {
    const {
      _id,
      isAdmin,
      firstName,
      lastName,
      email,
      phone,
      address,
      photo,
      cart,
    } = await User.create(data);
    return new UserDTO(
      _id,
      isAdmin,
      firstName,
      lastName,
      email,
      phone,
      address,
      photo,
      cart
    );
  }

  async findById(id) {
    const user = await User.findById(id);
    if (user) {
      const {
        _id,
        isAdmin,
        firstName,
        lastName,
        email,
        phone,
        address,
        photo,
        cart,
      } = user;
      const cartItems = cart.map(
        (cartItem) =>
          new CartItemDTO(
            cartItem._id,
            cartItem.user,
            cartItem.product,
            cartItem.quantity,
            cartItem.timestamp
          )
      );
      return new UserDTO(
        _id,
        isAdmin,
        firstName,
        lastName,
        email,
        phone,
        address,
        photo,
        cartItems
      );
    }
    return null;
  }

  async findOne(query = {}) {
    const user = await User.findOne(query);
    if (user) {
      const {
        _id,
        isAdmin,
        firstName,
        lastName,
        email,
        phone,
        address,
        photo,
        cart,
      } = user;
      const cartItems = cart.map(
        (cartItem) =>
          new CartItemDTO(
            cartItem._id,
            cartItem.user,
            cartItem.product,
            cartItem.quantity,
            cartItem.timestamp
          )
      );
      return new UserDTO(
        _id,
        isAdmin,
        firstName,
        lastName,
        email,
        phone,
        address,
        photo,
        cartItems
      );
    }
    return null;
  }
}

export default new UserDAO();
