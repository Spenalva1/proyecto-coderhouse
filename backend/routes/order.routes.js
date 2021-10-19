import express from 'express';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerOrder = express.Router();

routerOrder.get('/', passportAuth(), getCartItems);

routerOrder.get('/:id', passportAuth(), isValidMongoId, getCartItems);

export default routerOrder;
