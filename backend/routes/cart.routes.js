import express from 'express';
import {
  checkout,
  createCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '../controllers/cart.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerCart = express.Router();

routerCart.get('/', passportAuth(), getCartItems);

routerCart.post('/:id', passportAuth(), isValidMongoId, createCartItem);

routerCart.put('/:id', passportAuth(), isValidMongoId, updateCartItem);

routerCart.delete('/:id', passportAuth(), isValidMongoId, deleteCartItem);

routerCart.post('/checkout', passportAuth(), checkout);

export default routerCart;
