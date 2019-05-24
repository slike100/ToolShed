import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  user,
  // ...rest
}) {
  return (
    <Route
      // {...rest}
      render={props =>
        user === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}