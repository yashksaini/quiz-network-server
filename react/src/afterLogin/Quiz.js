import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkAttempt, getPlayQuiz, getResults } from "../service/api";
import QuizBox from "./parts/QuizBox";
import styles from "./questions.module.scss";
import qstyle from "./question.module.scss";
import quizStyle from "./quiz.module.scss";
import mstyle from "./myquiz.module.scss";
import { Link } from "react-router-dom";
const Quiz = () => {
  const { id } = useParams();
  const [showPlay, setShowPlay] = useState(true);
  const [resultModel, setResultModel] = useState(false);
  const [quizModel, setQuizModel] = useState(false);
  const [validQuiz, setValidQuiz] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [],
  });
  const [resultData, setResultData] = useState([
    {
      correct: "",
      incorrect: "",
      time: "",
      userId: {
        fullName: "",
      },
    },
  ]);

  useEffect(() => {
    const data = {
      id: id,
    };
    getPlayQuiz(data).then((response) => {
      if (response.request.status === 200) {
        if (response.data.length > 0) {
          getResults(data).then((response) => {
            setResultData(response.data);
          });
          const { title, questions } = response.data[0];
          checkAttempt(data).then((response) => {
            if (response.data.length > 0) {
              setShowPlay(false);
            } else {
              setShowPlay(true);
            }
          });
          setQuizData({
            title: title,
            questions: questions,
          });
          setValidQuiz(true);
        } else {
          setValidQuiz(false);
        }
      }
    });
  }, [id]);
  return (
    <div className={styles.container}>
      <div className={qstyle.head}>
        <h1>Quiz</h1>
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
        <i>~</i>
        <p>{quizData.title}</p>
        <i className="fa-brands fa-quinscape"></i>
      </div>
      <div className={mstyle.quizzes}>
        <div className={mstyle.eachInfo}>
          <h1>Instructions</h1>
        </div>
        <div className={mstyle.eachInfo}>
          There are 5 questions in the quiz.
        </div>
        <div className={mstyle.eachInfo}>
          Attempt questions in less time as possible.
        </div>
        <div className={mstyle.eachInfo}>
          Only one attempt is given for the quiz.
        </div>
        <div className={mstyle.eachInfo}>
          The Quiz is submitted on submitting the last question.
        </div>
        <div className={mstyle.eachInfo}>
          Traversing through questions is not allowed.
        </div>
        <div className={mstyle.eachInfo}>
          Click on the answer and click next.
        </div>
        <div className={mstyle.eachInfo}>
          Attempt the quiz to see the results.
        </div>
        <div className={mstyle.footer}>
          <button
            className={showPlay ? `${mstyle.selectBtn}` : `${quizStyle.hide}`}
            onClick={() => {
              setQuizModel(true);
            }}
          >
            <i className="fa-solid fa-play"></i> Start Quiz
          </button>
          <button
            className={showPlay ? `${quizStyle.hide}` : `${mstyle.selectBtn}`}
            onClick={() => {
              setResultModel(true);
            }}
          >
            <i className="fa-solid fa-square-poll-vertical"></i> Results
          </button>
        </div>
      </div>
      <div className={!validQuiz ? `${quizStyle.info}` : `${quizStyle.hide}`}>
        <h1>404 Quiz not found.</h1>
      </div>
      {/* Modal for displaying Results */}
      <div className={resultModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={qstyle.modalBox}>
          <div className={qstyle.modalHead}>
            <div>Results</div>
            <div
              onClick={() => {
                setResultModel(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={qstyle.modalBody}>
            <table className={quizStyle.table}>
              <thead>
                <tr>
                  <th scope="col">Player Name</th>
                  <th scope="col" className={quizStyle.correct}>
                    <i className="fa-regular fa-circle-check"></i>
                  </th>
                  <th scope="col" className={quizStyle.incorrect}>
                    <i className="fa-regular fa-circle-xmark"></i>
                  </th>
                  <th scope="col">
                    <i className="fa-regular fa-clock"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.map((result, index) => {
                  return (
                    <tr key={index}>
                      <td>{result.userId.fullName}</td>
                      <td>{result.correct}</td>
                      <td>{result.incorrect}</td>
                      <td>
                        {result.time}
                        <b>s</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal for displaying Quiz */}
      <div className={quizModel ? `${qstyle.modal}` : `${qstyle.hide}`}>
        <div className={mstyle.fullModelBox}>
          <div className={qstyle.modalHead}>
            <div>{quizData.title}</div>
          </div>
          <div className={qstyle.modalBody}>
            <QuizBox
              quizModel={quizModel}
              questions={quizData.questions}
              quizId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
