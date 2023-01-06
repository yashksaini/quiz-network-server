import React, { useEffect, useState } from "react";
import styles from "./questions.module.scss";
import forms from "./forms.module.scss";
import { getQuestions, createQuiz } from "../service/api";
import qstyle from "./question.module.scss";
import { Link } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [allQuestions, setAllquestions] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizQues, setQuizQues] = useState([]);
  const [valid, setValid] = useState(false);
  const [selectModal, setSelectModel] = useState(false);
  const [questionsValid, setQuestionsValid] = useState(false);
  const getAllQuestions = () => {
    getQuestions().then((response) => {
      setAllquestions(response.data.reverse());
    });
  };
  const quizCreate = async () => {
    let data = {
      title: title,
      questions: quizQues,
    };

    createQuiz(data).then((response) => {
      alert("Quiz Created Successfully");
      window.location.reload();
    });
  };

  const setQuestions = (e) => {
    let arr = quiz;
    if (e.target.checked) {
      if (arr.length === 5) {
        alert("Max limit reached. Save and create quiz");
        e.target.checked = false;
      } else {
        if (arr.length === 4) {
          setQuestionsValid(true);
        } else {
          setQuestionsValid(false);
        }
        arr.push(parseInt(e.target.value));
      }
    } else {
      arr.splice(arr.indexOf(parseInt(e.target.value)), 1);
      setQuestionsValid(false);
    }
    setQuiz(arr);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);
  useEffect(() => {
    if (quizQues.length > 0 && title.length > 4) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [quizQues, title]);
  return (
    <div className={styles.container}>
      <div className={qstyle.head}>
        <h1>Create Quiz</h1>
        <div>
          <Link to="/my-quizes" className={qstyle.secondaryBtn}>
            <i className="fa-brands fa-quinscape"></i>
            <span>My Quizzes</span>
          </Link>
          <div className={qstyle.more}>
            <button>
              <i className="fa-brands fa-superpowers"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={qstyle.line}></div>
      <div className={qstyle.queBox}>
        <div className={qstyle.quizQue}>
          <div className={forms.inputBox}>
            <span>Quiz Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              autoComplete="off"
              name="title"
            ></input>
          </div>
          <button
            className={qstyle.selectBtn}
            onClick={() => {
              setSelectModel(true);
            }}
          >
            <i className="fa-solid fa-list-check"></i>
            <span>Select Questions</span>
          </button>
          <div>
            {quizQues.map((question, index) => {
              return (
                <div className={qstyle.question} key={index}>
                  <p>{question.content}</p>
                </div>
              );
            })}
          </div>
          <button
            className={qstyle.selectBtn1}
            disabled={!valid}
            onClick={quizCreate}
          >
            <i className="fa-solid fa-plus"></i>Create Quiz
          </button>
        </div>
      </div>

      {/* Modal for selecting question */}
      <div className={selectModal ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>Select Questions</div>
            <div
              onClick={() => {
                setSelectModel(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={qstyle.modalBody}>
            <p className={qstyle.message}>
              Select 5 Questions and click on Save Button
              <button
                className={qstyle.saveBtn}
                disabled={!questionsValid}
                onClick={() => {
                  let temp = [];
                  for (let i = 0; i < quiz.length; i++) {
                    temp.push(allQuestions[quiz[i]]);
                  }
                  setQuizQues(temp);
                  setSelectModel(false);
                }}
              >
                Save
              </button>
            </p>
            <div className={qstyle.selected}>
              <div className={qstyle.eachQue}>
                <i className="fa-regular fa-circle-check"></i>
                <label>Added questions appear here...</label>
              </div>
              {allQuestions.map((question, index) => {
                return (
                  <div className={qstyle.eachQue} key={index}>
                    <i>
                      <input
                        type="checkbox"
                        id={"question" + index}
                        onClick={(e) => {
                          setQuestions(e);
                        }}
                        value={index}
                      />
                    </i>
                    <label htmlFor={"question" + index}>
                      {question.content}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
