import express from 'express';
import {
  checkout,
  createCartItem,
  deleteCartItem,
  getCartItems,
} from '../controllers/cart.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerCart = express.Router();

routerCart.get('/listar', passportAuth(), getCartItems);

routerCart.post('/agregar/:id', passportAuth(), isValidMongoId, createCartItem);

routerCart.delete(
  '/borrar/:id',
  passportAuth(),
  isValidMongoId,
  deleteCartItem
);

routerCart.post('/checkout', passportAuth(), checkout);

export default routerCart;
