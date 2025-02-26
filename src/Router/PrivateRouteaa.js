
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
function PrivateRouteaa({ element, ...rest }) {
  const isAuthenticated = true; // Replace with your authentication logic
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          element
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default PrivateRouteaa;