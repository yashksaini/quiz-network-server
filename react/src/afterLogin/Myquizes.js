import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./questions.module.scss";
import qstyle from "./question.module.scss";
import mstyle from "./myquiz.module.scss";
import { getQuiz } from "../service/api";
import forms from "./forms.module.scss";

const Myquizes = () => {
  const [allQuizes, setAllQuizes] = useState([]);
  const [quizModel, setQuizModel] = useState(false);
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    questions: [],
  });
  const [mesg, setMesg] = useState("");
  const [quizLink, setQuizLink] = useState("");
  const getAllQuizes = () => {
    getQuiz().then((response) => {
      setAllQuizes(response.data.reverse());
    });
  };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(quizLink);
    setMesg("Copied to clipboard");
  };
  useEffect(() => {
    getAllQuizes();
  }, []);
  return (
    <div className={styles.container}>
      <div className={qstyle.head}>
        <h1>My Quizzes</h1>
        <div>
          <Link to="/create" className={qstyle.secondaryBtn}>
            <i className="fas fa-add"></i>
            <span>Create Quiz</span>
          </Link>
          <div className={qstyle.more}>
            <button>
              <i className="fa-brands fa-superpowers"></i>
            </button>
          </div>
        </div>
      </div>
      <div className={qstyle.line}></div>

      <div className={mstyle.searchBar}>
        <i>{allQuizes.length}</i>
        <p>Total Quizes</p>
        <i className="fa-brands fa-quinscape"></i>
      </div>
      <div className={mstyle.quizzes}>
        {allQuizes.map((quiz, index) => {
          return (
            <div className={mstyle.eachQuiz} key={index}>
              <span>{quiz.title}</span>
              <small>5 Questions Quiz</small>
              <button
                className={mstyle.detail}
                onClick={() => {
                  setQuizModel(true);
                  setQuizDetails({
                    title: quiz.title,
                    questions: quiz.questions,
                    link: "quiz/" + quiz._id,
                  });
                  setQuizLink(
                    "https://quiz-network-lhfp.onrender.com/#/quiz/" + quiz._id
                  );
                }}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
      {/* Modal for displaying full quiz */}
      <div className={quizModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>{quizDetails.title}</div>
            <div
              onClick={() => {
                setQuizModel(false);
                setMesg("");
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
                value={
                  "https://quiz-network-lhfp.onrender.com/#/" + quizDetails.link
                }
                disabled="true"
              ></input>
            </div>
            <button className={mstyle.copyBtn} onClick={copyToClipBoard}>
              Copy Link
            </button>
            <Link to={quizDetails.link} className={mstyle.saveBtn}>
              Play
            </Link>
            <span className={mstyle.mesg}>{mesg}</span>
            {quizDetails.questions.map((question, index) => {
              let answer = question.answer;
              return (
                <div className={mstyle.question} key={index}>
                  <span className={mstyle.content}>
                    <b>Q. </b>
                    {question.content}
                  </span>
                  <div className={mstyle.optionRow}>
                    <div
                      className={
                        answer === "A"
                          ? `${mstyle.optionCol} ${mstyle.active}`
                          : `${mstyle.optionCol}`
                      }
                    >
                      <span>A</span> <span>{question.optionA}</span>
                    </div>
                    <div
                      className={
                        answer === "B"
                          ? `${mstyle.optionCol} ${mstyle.active}`
                          : `${mstyle.optionCol}`
                      }
                    >
                      <span>B</span> <span>{question.optionB}</span>
                    </div>
                  </div>
                  <div className={mstyle.optionRow}>
                    <div
                      className={
                        answer === "C"
                          ? `${mstyle.optionCol} ${mstyle.active}`
                          : `${mstyle.optionCol}`
                      }
                    >
                      <span>C</span> <span>{question.optionC}</span>
                    </div>
                    <div
                      className={
                        answer === "D"
                          ? `${mstyle.optionCol} ${mstyle.active}`
                          : `${mstyle.optionCol}`
                      }
                    >
                      <span>D</span> <span>{question.optionD}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myquizes;
