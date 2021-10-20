import passport from 'passport';
import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import passportMiddleware from './middlewares/passport.js';
import routerProduct from './routes/product.routes.js';
import routerUser from './routes/user.routes.js';
import routerCart from './routes/cart.routes.js';
import './db/db.js';
import logger from './lib/logger.js';

const app = express();

// MIDDLEWARES
app.use(express.static('public'));
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
app.use('/carrito', routerCart);
app.get('*', (req, res) =>
  res.status(400).json({
    error_description: `ruta ${req.originalUrl} método get no implementado`,
  })
);

const server = app.listen(config.PORT || 8080, () => {
  logger.info(`Servidor inicializado en el puerto ${server.address().port}.`);
});

server.on('error', (error) => {
  logger.error('Error del servidor.' + error);
});
