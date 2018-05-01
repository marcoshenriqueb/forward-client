import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './../pages/login/login';
import Dashboard from './../pages/dashboard/dashboard';
import CreateOrder from './../pages/createOrder/createOrder';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const GuestRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    )}
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default authenticated => [
  <PrivateRoute
    key={0}
    exact
    path="/"
    component={Dashboard}
    isAuthenticated={authenticated}
  />,
  <GuestRoute
    key={1}
    path="/login"
    component={Login}
    isAuthenticated={authenticated}
  />,
  <PrivateRoute
    key={2}
    path="/novo-pedido"
    component={CreateOrder}
    isAuthenticated={authenticated}
  />,
];
