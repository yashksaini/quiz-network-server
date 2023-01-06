import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.scss";
import { addUser } from "../service/api";

const Signup = () => {
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const defaultValue = {
    fullName: "",
    username: "",
    password: "",
  };
  const [details, setDetails] = useState(defaultValue);

  const onValueChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    // Calling addUser function from api
    await addUser(details).then((res) => {
      if (res.data) {
        setSuccessMsg("Successfully Signed up. Please Login");
        setDetails(defaultValue);
        setValid(false);
      } else {
        setMessage("Username already exits");
      }
    });
  };

  // Condition for form submission
  useEffect(() => {
    if (
      details.fullName.length > 2 &&
      details.password.length > 5 &&
      details.username.length > 5
    ) {
      setValid(true);
      setMessage("");
    } else if (details.password.length > 1 && details.password.length < 6) {
      setValid(false);
      setMessage("Password should be 6 character's long.");
    } else {
      setMessage("");
      setValid(false);
    }
  }, [details]);

  return (
    <div className={styles.outerBox}>
      <div className={styles.formBox}>
        <img src="images/logo.png" alt="" />
        <h1>Quiz Network</h1>
        <h3>Sign Up</h3>
        <div className={styles.inputBox}>
          <span>Username</span>
          <input
            type="text"
            value={details.username}
            onChange={(e) => onValueChange(e)}
            autoComplete="off"
            name="username"
          ></input>
        </div>
        <div className={styles.inputBox}>
          <span>Full Name</span>
          <input
            type="text"
            value={details.fullName}
            onChange={(e) => onValueChange(e)}
            autoComplete="off"
            name="fullName"
          ></input>
        </div>
        <div className={styles.inputBox}>
          <span>Create Password</span>
          <input
            type="password"
            value={details.password}
            onChange={(e) => onValueChange(e)}
            name="password"
          ></input>
        </div>
        <button className={styles.btn} disabled={!valid} onClick={submitForm}>
          Sign Up
        </button>
        <h4 className={message.length > 0 ? null : `${styles.hide}`}>
          {message}
        </h4>
        <h5 className={successMsg.length > 0 ? null : `${styles.hide}`}>
          {successMsg}
        </h5>
        <h6>
          Already have account? <Link to="/">Log In </Link>
        </h6>
      </div>
      {/* <div className={styles.box}>
        <div className={styles.title}>
          <img src="/images/logo.png" alt="" /> <h1>Quiz Network</h1>
        </div>
        <p className={styles.heading}>Create free account</p>
        <div className={styles.inputBox}>
          <span>Username</span>
          <input
            type="text"
            value={details.username}
            onChange={(e)=> onValueChange(e)}
            name="username"
          ></input>
        </div>
        <div className={styles.inputBox}>
          <span>Full Name</span>
          <input
            type="text"
            value={details.fullName}
            onChange={(e)=> onValueChange(e)}
            name="fullName"
          ></input>
        </div>
        <div className={styles.inputBox}>
          <span>Create Password</span>
          <input
            type="password"
            value={details.password}
            onChange={(e)=> onValueChange(e)}
            name="password"
          ></input>
        </div>
        <button className={styles.btn} disabled={!valid} onClick={submitForm}>
          Sign Up
        </button>
        <h6 className={message.length > 0 ? null : `${styles.hide}`}>
          {message}
        </h6>
        <h5 className={successMsg.length > 0 ? null : `${styles.hide}`}>
          {successMsg}
        </h5>
        <p>
          Already have account? <Link to="/login">Log In </Link>
        </p>
      </div> */}
    </div>
  );
};

export default Signup;
