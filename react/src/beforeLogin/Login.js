import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.scss";
import { loginUser } from "../service/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function submitForm() {
    setValid(false);
    // Calling loginUser function
    await loginUser({ username: username, password: password }).then((res) => {
      console.log(res.data);
      if (res.data) {
        setSuccessMsg("Logging In...");
        setUsername("");
        setPassword("");
        window.location.reload();
      } else {
        setMessage("Username or password is incorrect");
      }
    });
  }
  useEffect(() => {
    if (password.length > 5 && username.length > 5) {
      setValid(true);
      setMessage("");
    } else {
      setMessage("");
      setValid(false);
    }
  }, [username, password]);
  return (
    <div className={styles.outerBox}>
      <div className={styles.formBox}>
        <img src="images/logo.png" alt="" />
        <h1>Quiz Network</h1>
        <h2>Welcome Back</h2>
        <p>Please enter your details</p>
        <div className={styles.inputBox}>
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoComplete="off"
          ></input>
        </div>
        <div className={styles.inputBox}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button className={styles.btn} disabled={!valid} onClick={submitForm}>
          Log In
        </button>
        <h4 className={message.length > 0 ? null : `${styles.hide}`}>
          {message}
        </h4>
        <h5 className={successMsg.length > 0 ? null : `${styles.hide}`}>
          {successMsg}
        </h5>
        <h6>
          Don't have account? <Link to="/signup">Sign Up</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
