import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./leftnavbar.module.scss";
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => {
    setNavOpen(false);
  };
  return (
    <div className={navOpen ? `${styles.navbarOutNew}` : `${styles.navbarOut}`}>
      <div className={styles.topNav}>
        <img src="images/logo.png" alt="Logo" />
        <p
          onClick={() => {
            let current = !navOpen;
            setNavOpen(current);
          }}
          className={styles.menu}
        >
          <i className="fas fa-bars"></i>
        </p>
      </div>
      <div className={navOpen ? `${styles.activeNav}` : `${styles.navbar}`}>
        <Link className={styles.eachNav} to="/create" onClick={closeNav}>
          <span>
            <i className="fa-solid fa-puzzle-piece"></i>
          </span>
          <span>Create quiz</span>
        </Link>
        <Link className={styles.eachNav} to="/questions" onClick={closeNav}>
          <span>
            <i className="fa-solid fa-folder"></i>
          </span>
          <span>Questions</span>
        </Link>
        <Link className={styles.eachNav} to="/my-quizes" onClick={closeNav}>
          <span>
            <i className="fa-brands fa-quinscape"></i>
          </span>
          <span>My Quizes</span>
        </Link>
        <Link className={styles.eachNav} to="/profile" onClick={closeNav}>
          <span>
            <i className="fas fa-user"></i>
          </span>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
