/* eslint-disable no-nested-ternary */
import React from 'react';

import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { isAuthenticated } from '../Services/auth';

const forbiddenRoutesWhenConnected = ['/login', '/register', '/recovery-password']

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => (
  <ReactDOMRoute
    {...rest}
    render={(props) => isAuthenticated() && (!forbiddenRoutesWhenConnected.includes(props.location.pathname)) ? (
      <Component {...props}/>
    ) : isPrivate === isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect
        to={{
          pathname: isPrivate ? '/login' : '/dashboard',
          state: { from: props.location },
        }}
      />
    )}
  />
);

export default Route;
