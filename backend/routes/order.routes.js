import express from 'express';
import {
  checkout,
  getOrder,
  getOrders,
} from '../controllers/order.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerOrder = express.Router();

routerOrder.post('/', passportAuth(), checkout);

routerOrder.get('/', passportAuth(), getOrders);

routerOrder.get('/:id', passportAuth(), isValidMongoId, getOrder);

export default routerOrder;
