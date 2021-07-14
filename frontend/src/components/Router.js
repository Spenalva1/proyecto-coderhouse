import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContainerStyles } from '../globalStyles';
import Header from './Header';
import Products from './Products';

const Router = () => (
  <BrowserRouter>
    <Header />
    <ContainerStyles>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route component={Products} />
      </Switch>
    </ContainerStyles>
  </BrowserRouter>
);

export default Router;
