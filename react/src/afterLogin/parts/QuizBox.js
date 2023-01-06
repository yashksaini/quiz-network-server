import React, { useEffect, useState, useRef } from "react";
import styles from "../quiz.module.scss";
import { addAttempt } from "../../service/api";
const QuizBox = (props) => {
  const { quizModel, questions, quizId } = props;
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
    time: 0,
  });

  const [seconds, setSeconds] = useState(0);
  const [currentData, setCurrentData] = useState({
    content: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });
  let totalTime;
  // UseRef help us to store the value of currentQue Even after component re-render
  const currentQue = useRef(0);
  const increaseTime = () => {
    if (currentQue.current < questions.length) {
      setSeconds((seconds) => seconds + 1);
    } else {
      clearInterval(totalTime);
    }
  };
  const getResult = () => {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === answers[i]) {
        correct++;
      } else if (answers[i] !== "") {
        incorrect++;
      }
    }
    const result = {
      correct: correct,
      incorrect: incorrect,
      time: seconds,
      quizId: quizId,
    };
    setResult(result);
    setShowResult(true);
    addAttempt(result).then((response) => {
      if (response.status === 200) {
        console.log("Quiz submitted Successfully");
      }
    });
  };
  useEffect(() => {
    if (quizModel) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      totalTime = setInterval(increaseTime, 1000);
      setCurrentData(questions[0]);
    }
  }, [quizModel]);

  return (
    <>
      <div className={showResult ? `${styles.hide}` : `${styles.question}`}>
        <div className={styles.time}>
          {seconds} <b>s</b>
        </div>
        <div className={styles.content}>
          <span>
            {currentQue.current + 1} of {questions.length}
          </span>
          {currentData.content}
        </div>
        <div className={styles.options}>
          <div
            className={
              currentAnswer === "A" ? `${styles.selected}` : `${styles.option}`
            }
            onClick={() => {
              setCurrentAnswer("A");
            }}
          >
            <span>A</span>
            {currentData.optionA}
          </div>
          <div
            className={
              currentAnswer === "B" ? `${styles.selected}` : `${styles.option}`
            }
            onClick={() => {
              setCurrentAnswer("B");
            }}
          >
            <span>B</span>
            {currentData.optionB}
          </div>
          <div
            className={
              currentAnswer === "C" ? `${styles.selected}` : `${styles.option}`
            }
            onClick={() => {
              setCurrentAnswer("C");
            }}
          >
            <span>C</span>
            {currentData.optionC}
          </div>
          <div
            className={
              currentAnswer === "D" ? `${styles.selected}` : `${styles.option}`
            }
            onClick={() => {
              setCurrentAnswer("D");
            }}
          >
            <span>D</span>
            {currentData.optionD}
          </div>
        </div>
        <div className={styles.btnBox}>
          <button
            className={styles.clear}
            onClick={() => {
              setCurrentAnswer("");
            }}
          >
            Clear
          </button>
          <button
            className={styles.next}
            onClick={() => {
              let arr = answers;
              arr[currentQue.current] = currentAnswer;
              setAnswers(arr);
              setCurrentAnswer("");
              currentQue.current++;
              if (currentQue.current < questions.length) {
                setCurrentData(questions[currentQue.current]);
              } else {
                getResult();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className={showResult ? `${styles.question1}` : `${styles.hide}`}>
        <div className={styles.content}>
          {" "}
          <h2>Quiz Result</h2>
        </div>
        <div className={styles.options}>
          <div className={styles.result}>
            <span>{result.correct}</span>
            Correct
          </div>
          <div className={styles.result}>
            <span>{result.incorrect}</span>
            Incorrect
          </div>
          <div className={styles.result}>
            <span>{questions.length - result.correct - result.incorrect}</span>
            Not Attempted
          </div>
          <div className={styles.result}>
            <span>{result.time}</span>
            Seconds
          </div>
        </div>
        <button
          className={styles.close}
          onClick={() => {
            window.location.reload();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default QuizBox;
