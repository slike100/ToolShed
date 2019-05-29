import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  console.log(authed),
  (
    <Route
      {...rest}
      render={props =>
        authed ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
);

export default PrivateRoute;
