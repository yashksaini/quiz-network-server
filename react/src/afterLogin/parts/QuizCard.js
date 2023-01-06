import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.scss";
const QuizCard = (props) => {
  const { quiz, index } = props;
  let link = "/quiz/" + quiz.quizId._id;
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <p>{quiz.quizId.title}</p>
        <span>{index + 1}</span>
      </div>
      <div className={styles.stat}>
        <div>
          <p>{quiz.incorrect}</p>
          <span>Wrong</span>
        </div>
        <div>
          <p>{quiz.correct}</p>
          <span>Correct</span>
        </div>
        <div>
          <p>{quiz.time}</p>
          <span>Seconds</span>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to={link}>View Results</Link>
      </div>
    </div>
  );
};

export default QuizCard;
