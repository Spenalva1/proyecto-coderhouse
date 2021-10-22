import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedAuthRoute({ component: Component, ...restOfProps }) {
  const { token } = useUser();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedAuthRoute;
