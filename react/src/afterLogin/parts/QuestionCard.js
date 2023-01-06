import React from "react";
import style from "./queCard.module.scss";
const QuestionCard = (props) => {
  const { question, index, setQue } = props;
  return (
    <div className={style.card}>
      <div className={style.head}>{question.content}</div>
      <div className={style.optionBox}>
        <div className={style.option}>
          <i>A</i>
          <span>{question.optionA}</span>
        </div>
        <div className={style.option}>
          <i>B</i>
          <span>{question.optionB}</span>
        </div>
        <div className={style.option}>
          <i>C</i>
          <span>{question.optionC}</span>
        </div>
        <div className={style.option}>
          <i>D</i>
          <span>{question.optionD}</span>
        </div>
      </div>
      <div
        className={style.footer}
        onClick={() => {
          setQue(index);
        }}
      >
        <button>Details</button>
      </div>
    </div>
  );
};

export default QuestionCard;
