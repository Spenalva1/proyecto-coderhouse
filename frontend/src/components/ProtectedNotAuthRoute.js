import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedNotAuthRoute({ component: Component, ...restOfProps }) {
  const { token } = useUser();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedNotAuthRoute;