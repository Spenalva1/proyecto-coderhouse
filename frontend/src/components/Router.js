import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContainerStyles } from '../globalStyles';
import Header from './Header';
import Login from './Login';
import Products from './Products';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import ProtectedNotAuthRoute from './ProtectedNotAuthRoute';
import Cart from './Cart';
import Signup from './Signup';
import ProductDetail from './ProductDetail';
import Orders from './Orders';
import ProductCreate from './ProductCreate';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import ProductUpdate from './ProductUpdate';

const Router = () => (
  <BrowserRouter>
    <Header />
    <ContainerStyles>
      <Switch>
        <Route exact path="/" component={Products} />
        <ProtectedAdminRoute
          path="/product/update/:id"
          component={ProductUpdate}
        />
        <ProtectedAdminRoute path="/product/create" component={ProductCreate} />
        <Route path="/product/:id" component={ProductDetail} />
        <ProtectedNotAuthRoute path="/login" component={Login} />
        <ProtectedNotAuthRoute path="/signup" component={Signup} />
        <ProtectedAuthRoute path="/cart" component={Cart} />
        <ProtectedAuthRoute path="/order" component={Orders} />
        <Route component={Products} />
      </Switch>
    </ContainerStyles>
  </BrowserRouter>
);

export default Router;
