import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./afterLogin/Navbar";
import styles from "./afterLogin/navbar.module.scss";
const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === true) {
          return (
            <div className={styles.navBox}>
              <div className={styles.navbar}>
                <Navbar />
              </div>
              <div className={styles.content}>
                <Component />
              </div>
            </div>
          );
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
