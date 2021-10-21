import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContainerStyles } from '../globalStyles';
import Header from './Header';
import Login from './Login';
import Products from './Products';
import ProtectedNotAuthRoute from './ProtectedNotAuthRoute';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import Cart from './Cart';
import Signup from './Signup';
import ProductDetail from './ProductDetail';
import Order from './Order';

const Router = () => (
  <BrowserRouter>
    <Header />
    <ContainerStyles>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <ProtectedNotAuthRoute path="/login" component={Login} />
        <ProtectedNotAuthRoute path="/signup" component={Signup} />
        <ProtectedAuthRoute path="/cart" component={Cart} />
        <ProtectedAuthRoute path="/order" component={Order} />
        <Route component={Products} />
      </Switch>
    </ContainerStyles>
  </BrowserRouter>
);

export default Router;
