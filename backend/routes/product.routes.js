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

routerProducts.get('/listar', getProducts);

routerProducts.get('/listar/:id', isValidMongoId, getProduct);

routerProducts.post('/agregar', isAdmin, isValidMongoId, createProduct);

routerProducts.put('/actualizar/:id', isAdmin, isValidMongoId, updateProduct);

routerProducts.delete('/borrar/:id', isAdmin, isValidMongoId, deleteProduct);

export default routerProducts;
