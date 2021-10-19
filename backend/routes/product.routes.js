import express from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';

const routerProducts = express.Router();

routerProducts.get('/', getProducts);

routerProducts.get('/:id', isValidMongoId, getProduct);

routerProducts.post('/', isAdmin, isValidMongoId, createProduct);

routerProducts.put('/:id', isAdmin, isValidMongoId, updateProduct);

routerProducts.delete('/:id', isAdmin, isValidMongoId, deleteProduct);

export default routerProducts;
