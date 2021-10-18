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

routerCart.get('/listar', passportAuth(), getCartItems);

routerCart.post('/agregar/:id', passportAuth(), isValidMongoId, createCartItem);

routerCart.put(
  '/actualizar/:id',
  passportAuth(),
  isValidMongoId,
  updateCartItem
);

routerCart.delete(
  '/borrar/:id',
  passportAuth(),
  isValidMongoId,
  deleteCartItem
);

routerCart.post('/checkout', passportAuth(), checkout);

export default routerCart;
