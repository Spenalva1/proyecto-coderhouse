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
import { passportAuth } from '../middlewares/passport.js';
import passport from 'passport';

const routerProducts = express.Router();

routerProducts.get('/listar', getProducts);

routerProducts.get('/listar/:id', isValidMongoId, getProduct);

routerProducts.post('/agregar', isAdmin, isValidMongoId, createProduct);

routerProducts.put('/actualizar/:id', isAdmin, isValidMongoId, updateProduct);

routerProducts.delete('/borrar/:id', isAdmin, isValidMongoId, deleteProduct);

routerProducts.get(
  '/secret',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/unauthorized',
  }),
  (req, res) => {
    console.log(req.user);
    res.json({ msg: 'hola que tal' });
  }
);

export default routerProducts;
