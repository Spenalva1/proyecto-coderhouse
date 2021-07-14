import express from 'express';
import Cart from '../models/Cart.js';
import Inventory from '../models/Inventory.js';

const routerCart = express.Router();

const inventory = new Inventory();
const cart = new Cart('./storage/cart.txt');

routerCart.get('/listar', async (req, res) => {
  const cartItems = await cart.getCartItems();

  if(!cartItems?.length) return res.json({error_description: 'El carrito está vacío.', error: 1});

  res.json({data: cartItems, error: 0});
});

routerCart.get('/listar/:id', async (req, res) => {
  const cartItem = await cart.getCartItem(req.params.id);

  if(!cartItem) return res.json({error_description: 'Ítem no encontrado.', error: 1});

  res.json({data: cartItem, error: 0});
});

routerCart.post('/agregar/:id', async (req, res) => {
  const product = await inventory.getProduct(Number(req.params.id));

  if(!product) return res.json({error_description: 'Producto no encontrado.', error: 1});

  const newCartItem = await cart.addCartItem(product);

  return res.json({data: newCartItem, error: 0});
});

routerCart.delete('/borrar/:id', async (req, res) => {
  const cartItem = await cart.deleteCartItem(Number(req.params.id));
  if(!cartItem) {
    return res.json({error_description: 'Ítem no encontrado.', error: 1})
  }
  res.json({data: cartItem, error: 0});
});

export default routerCart;