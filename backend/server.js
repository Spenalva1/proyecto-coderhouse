import express from 'express';
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', routerProducts);
app.use('/carrito', routerCart);


const server = app.listen(PORT || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})