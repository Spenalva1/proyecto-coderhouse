import routerCart from './cart.routes.js';
import routerOrder from './order.routes.js';
import routerProducts from './product.routes.js';
import routerUser from './user.routes.js';

export default {
  products: routerProducts,
  cart: routerCart,
  user: routerUser,
  order: routerOrder,
};
