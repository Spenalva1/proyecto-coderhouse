import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedAdminRoute({ component: Component, ...restOfProps }) {
  const { user } = useUser();

  if (typeof user === 'undefined') {
    return null;
  }

  if (!user?.isAdmin) {
    return <Route render={() => <Redirect to="/" />} />;
  }

  return (
    <Route {...restOfProps} render={(props) => <Component {...props} />} />
  );
}

export default ProtectedAdminRoute;
