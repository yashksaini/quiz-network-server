import React from "react";
import styles from "./home.module.scss";
import Login from "./Login";
const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <img src="images/512x512.png" alt="" />
      </div>
      <div className={styles.formArea}>
        <Login />
      </div>
    </div>
  );
};

export default Home;
