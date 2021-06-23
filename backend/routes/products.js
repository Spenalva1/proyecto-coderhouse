import express from 'express';
import Inventory from '../models/Inventory.js';
import {isAdmin} from '../auth/Auth.js'

const routerProducts = express.Router();

const inventory = new Inventory('./storage/products.txt')

routerProducts.get('/listar', async (req, res) => {
  const products = await inventory.getProducts();

  if(!products.length) return res.json({error_description: 'No hay productos guardados.', error: 1});

  res.json({data: products, error: 0});
});

routerProducts.get('/listar/:id', async (req, res) => {
  const product = await inventory.getProduct(req.params.id);

  if(!product) return res.json({error_description: 'Producto no encontrado.', error: 1});

  res.json({data: product, error: 0});
});

routerProducts.post('/agregar', isAdmin, async (req, res) => {
  const {name, description, code, photo, price, stock} = req.body;
  if (
    !(name?.length > 0) 
    || !(description?.length > 0) 
    || !(String(code)?.length > 0) 
    || !(photo?.length > 0) 
    || !Number(price) 
    || !Number(stock)
  ) {
    return res.json({error_description: 'Parametros erroneos.', error: 2});
  }

  const newProduct = await inventory.addProduct(name, description, code, photo, price, stock);

  return res.json({data: newProduct, error: 0});
});

routerProducts.put('/actualizar/:id', isAdmin, async (req, res) => {
  const {name, description, code, photo, price, stock} = req.body;
  if (
    !(name?.length > 0) 
    || !(description?.length > 0) 
    || !(String(code)?.length > 0) 
    || !(photo?.length > 0) 
    || !Number(price) 
    || !Number(stock)
  ) {
    return res.json({error_description: 'Parametros erroneos.', error: 2});
  }
  const product = await inventory.updateProduct(Number(req.params.id), name, description, code, photo, price, stock);
  if(!product) {
    return res.json({error_description: 'Producto no encontrado.', error: 1})
  }
  res.json({data: product, error: 0});
});

routerProducts.delete('/borrar/:id', isAdmin, async (req, res) => {
  const product = await inventory.deleteProduct(Number(req.params.id));
  if(!product) {
    return res.json({error_description: 'producto no encontrado', error: 1})
  }
  res.json({data: product, error: 0});
});

export default routerProducts;