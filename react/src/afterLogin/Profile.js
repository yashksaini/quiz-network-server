import React, { useEffect, useState } from "react";
import styles from "./questions.module.scss";
import pstyle from "./profile.module.scss";
import { getProfile, getAttemptQuizes } from "../service/api";
import { logOutUser } from "../service/api";
import { Link } from "react-router-dom";
import forms from "./forms.module.scss";
import qstyle from "./question.module.scss";
import QuizCard from "./parts/QuizCard";
const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
  });
  const [quizData, setQuizData] = useState([
    {
      correct: "",
      incorrect: "",
      time: "",
      quizId: {
        title: "",
      },
    },
  ]);
  const [startModel, setStartModel] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [valid, setValid] = useState(false);
  const [stats, setStats] = useState({
    correct: 0,
    totalAttempts: 0,
    time: 0,
  });
  const logout = () => {
    logOutUser().then((response) => {
      if (response) {
        console.log("Logged Out successfully");
        window.location.reload();
      } else {
        console.log("Error in logging out");
      }
    });
  };
  const getStats = (quizData) => {
    let correct = 0;
    let time = 0;
    for (let i = 0; i < quizData.length; i++) {
      correct += parseInt(quizData[i].correct);
      time += parseInt(quizData[i].time);
    }
    setStats({
      correct: correct,
      time: time,
      totalAttempts: quizData.length,
    });
  };
  const getQuizes = async () => {
    await getAttemptQuizes().then((response) => {
      setQuizData(response.data);
      getStats(response.data);
    });
  };

  const getUser = async () => {
    await getProfile().then((response) => {
      const data = response.data;
      const profileData = {
        name: data.fullName,
        username: data.username,
      };
      setUserData(profileData);
    });
  };
  useEffect(() => {
    getQuizes();
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container}>
      <div className={pstyle.head}>
        <h1>Profile</h1>
        <div>
          <button
            className={pstyle.secondaryBtn}
            onClick={() => {
              setStartModel(true);
            }}
          >
            <i className="fa-solid fa-play"></i>
            <span>Start Quiz</span>
          </button>
          <Link to="s/create" className={pstyle.primaryBtn}>
            <i className="fa-solid fa-circle-plus"></i>
            <span>Create Quiz</span>
          </Link>
          <div className={pstyle.more}>
            <button>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div className={pstyle.dropArea}>
              <div className={pstyle.dropdownContent}>
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={pstyle.info}>
        <div className={pstyle.img}>
          <img src="images/user.png" alt="User Logo" />
        </div>
        <div className={pstyle.profileData}>
          <h1>{userData.name}</h1>
          <p>{userData.username}</p>
          <div className={pstyle.userStat}>
            <div className={pstyle.countCard}>
              <div className={pstyle.logo}>
                <i className="fa-regular fa-circle-check"></i>
              </div>
              <div className={pstyle.content}>
                <p>{stats.correct}</p>
                <span>Correct Answers</span>
              </div>
            </div>
            <div className={pstyle.countCard}>
              <div className={pstyle.logo}>
                <i className="fa-regular fa-flag"></i>
              </div>
              <div className={pstyle.content}>
                <p>{stats.totalAttempts}</p>
                <span>Quiz Attempted</span>
              </div>
            </div>
            <div className={pstyle.countCard}>
              <div className={pstyle.logo}>
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className={pstyle.content}>
                <p>{stats.time}</p>
                <span>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={pstyle.line}></div>
      {/* Displaying all the quizes */}
      <div className={pstyle.box}>
        {quizData.map((quiz, index) => {
          return <QuizCard quiz={quiz} index={index} key={index} />;
        })}
      </div>
      {/* Modal for starting quiz */}
      <div className={startModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>Start Quiz</div>
            <div
              onClick={() => {
                setStartModel(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={qstyle.modalBody}>
            <div className={forms.inputBox}>
              <span>Quiz Link</span>
              <input
                type="text"
                onChange={(e) => {
                  setQuizId(e.target.value);
                  if (e.target.length > 10) {
                    setValid(true);
                  } else {
                    setValid(false);
                  }
                }}
                autoComplete="off"
              ></input>
            </div>
            <button
              className={forms.btn}
              disabled={!valid}
              onClick={() => {
                window.location.href = quizId;
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
