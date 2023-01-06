import React, { useEffect, useState } from "react";
import styles from "./questions.module.scss";
import { addQuestion, getQuestions, updateQuestion } from "../service/api";
import QuestionForm from "./parts/QuestionForm";
import QuestionCard from "./parts/QuestionCard";
import qstyle from "./question.module.scss";
const Questions = () => {
  const [addModel, setAddModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [allQuestions, setAllquestions] = useState([]);
  const [queNo, setQueNo] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    correctA: 0,
    correctB: 0,
    correctC: 0,
    correctD: 0,
  });

  const submitForm = (details, formType) => {
    if (formType === "add") {
      addQuestion(details).then((response) => {
        getAllQuestions();
        setAddModel(false);
      });
    } else {
      updateQuestion(details).then((response) => {
        setQueNo(0);
        setUpdateModel(false);
        getAllQuestions();
      });
    }
  };
  const updateStats = (data) => {
    let total = data.length;
    let correctA = 0;
    let correctB = 0;
    let correctC = 0;
    let correctD = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].answer === "A") {
        correctA++;
      } else if (data[i].answer === "B") {
        correctB++;
      } else if (data[i].answer === "C") {
        correctC++;
      } else {
        correctD++;
      }
    }
    setStats({
      total: total,
      correctA: correctA,
      correctB: correctB,
      correctC: correctC,
      correctD: correctD,
    });
  };
  const getAllQuestions = () => {
    getQuestions().then((response) => {
      setAllquestions(response.data.reverse());
      updateStats(response.data);
    });
  };
  const setQue = (value) => {
    setQueNo(value);
    setUpdateModel(true);
  };

  useEffect(() => {
    getAllQuestions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={qstyle.head}>
        <h1>Questions</h1>
        <div>
          <button
            className={qstyle.secondaryBtn}
            onClick={() => {
              setAddModel(true);
            }}
          >
            <i className="fas fa-add"></i>
            <span>Add Question</span>
          </button>
          <div className={qstyle.more}>
            <button>
              <i className="fa-brands fa-superpowers"></i>
            </button>
          </div>
        </div>
      </div>
      <div className={qstyle.info}>
        <div className={qstyle.data}>
          <h1>{stats.total}</h1>
          <p>Total Questions</p>
        </div>
        <div className={qstyle.questionData}>
          <div className={qstyle.queStat}>
            <div className={qstyle.countCard}>
              <div className={qstyle.logo}>
                <i className="fa-solid fa-a"></i>
              </div>
              <div className={qstyle.content}>
                <p>{stats.correctA}</p>
                <span>Correct A</span>
              </div>
            </div>
            <div className={qstyle.countCard}>
              <div className={qstyle.logo}>
                <i className="fa-solid fa-b"></i>
              </div>
              <div className={qstyle.content}>
                <p>{stats.correctB}</p>
                <span>Correct B</span>
              </div>
            </div>
          </div>
          <div className={qstyle.queStat}>
            <div className={qstyle.countCard}>
              <div className={qstyle.logo}>
                <i className="fa-solid fa-c"></i>
              </div>
              <div className={qstyle.content}>
                <p>{stats.correctC}</p>
                <span>Correct C</span>
              </div>
            </div>
            <div className={qstyle.countCard}>
              <div className={qstyle.logo}>
                <i className="fa-solid fa-d"></i>
              </div>
              <div className={qstyle.content}>
                <p>{stats.correctD}</p>
                <span>Correct D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={qstyle.line}></div>
      {/* Displaying all the questions */}
      <div className={qstyle.box}>
        {allQuestions.map((question, index) => {
          return (
            <QuestionCard
              question={question}
              index={index}
              setQue={setQue}
              key={index}
            />
          );
        })}
      </div>

      {/* Modal for adding question */}
      <div className={addModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>Add Question</div>
            <div
              onClick={() => {
                setAddModel(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={qstyle.modalBody}>
            <QuestionForm
              allQuestions={allQuestions}
              queNo={queNo}
              btnText="Add Question"
              submitForm={submitForm}
              formType="add"
            />
          </div>
        </div>
      </div>
      {/* Modal for updating question */}
      <div className={updateModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>Update Question</div>
            <div
              onClick={() => {
                setUpdateModel(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={qstyle.modalBody}>
            <QuestionForm
              queNo={queNo}
              allQuestions={allQuestions}
              btnText="Update Question"
              submitForm={submitForm}
              formType="update"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
