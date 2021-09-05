import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routerProducts from './routes/product.routes.js';
// import routerCart from './routes/cart.js';
import './db/db.js';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}))

// ROUTES
app.use('/productos', routerProducts);
// app.use('/carrito', routerCart);
app.get('*', (req, res) => res.json({ error: -2, description: `ruta ${req.originalUrl} método get no implementado` }));


const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}.`);
})

server.on('error', (error) => {
  console.error('Error del servidor.', error);
})