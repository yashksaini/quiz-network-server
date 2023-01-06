import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnprotectedRoute = ({
  isAuth: isAuth,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === true) {
          return (
            <Redirect
              to={{ pathname: "/profile", state: { from: props.location } }}
            />
          );
        } else {
          return <Component />;
        }
      }}
    />
  );
};

export default UnprotectedRoute;
