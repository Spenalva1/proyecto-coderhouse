import 'dotenv/config';
import passport from 'passport';
import express from 'express';
import cors from 'cors';
import passportMiddleware from './middlewares/passport.js';
import routerProduct from './routes/product.routes.js';
import routerUser from './routes/user.routes.js';
// import routerCart from './routes/cart.js';
import './db/db.js';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(passport.initialize());
passport.use(passportMiddleware);

// ROUTES
app.use('/productos', routerProduct);
app.use('/', routerUser);
// app.use('/carrito', routerCart);
app.get('*', (req, res) =>
  res.json({
    error: -2,
    description: `ruta ${req.originalUrl} método get no implementado`,
  })
);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}.`);
});

server.on('error', (error) => {
  console.error('Error del servidor.', error);
});
