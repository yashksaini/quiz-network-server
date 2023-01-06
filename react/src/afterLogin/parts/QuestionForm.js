import React, { useEffect, useState } from "react";
import forms from "../forms.module.scss";
const QuestionForm = (props) => {
  let { btnText, formType, submitForm, allQuestions, queNo } = props;
  const defaultValue = {
    content: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  };
  const [details, setDetails] = useState(defaultValue);
  const [valid, setValid] = useState(false);
  const onValueChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formType === "update") {
      if (allQuestions[queNo]) {
        setDetails(allQuestions[queNo]);
        setValid(true);
      }
    }
  }, [queNo, allQuestions, formType]);

  useEffect(() => {
    if (
      details.content.length > 3 &&
      details.optionA.length > 0 &&
      details.optionB.length > 0 &&
      details.optionC.length > 0 &&
      details.optionD.length > 0 &&
      details.answer.length > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [details]);

  return (
    <>
      <div className={forms.inputBox}>
        <span>Question Text</span>
        <input
          type="text"
          value={details.content}
          onChange={(e) => onValueChange(e)}
          autoComplete="off"
          name="content"
        ></input>
      </div>
      <div className={forms.row}>
        <div className={forms.col}>
          <div className={forms.inputBox}>
            <span>Option A</span>
            <input
              type="text"
              value={details.optionA}
              onChange={(e) => onValueChange(e)}
              name="optionA"
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className={forms.col}>
          <div className={forms.inputBox}>
            <span>Option B</span>
            <input
              type="text"
              value={details.optionB}
              onChange={(e) => onValueChange(e)}
              name="optionB"
              autoComplete="off"
            ></input>
          </div>
        </div>
      </div>
      <div className={forms.row}>
        <div className={forms.col}>
          <div className={forms.inputBox}>
            <span>Option C</span>
            <input
              type="text"
              value={details.optionC}
              onChange={(e) => onValueChange(e)}
              name="optionC"
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className={forms.col}>
          <div className={forms.inputBox}>
            <span>Option D</span>
            <input
              type="text"
              value={details.optionD}
              onChange={(e) => onValueChange(e)}
              name="optionD"
              autoComplete="off"
            ></input>
          </div>
        </div>
      </div>
      <div className={forms.row}>
        <div className={forms.col}>
          <div className={forms.inputBox}>
            <span>Select Answer</span>
            <select
              value={details.answer}
              onChange={(e) => onValueChange(e)}
              name="answer"
            >
              <option value="" hidden>
                Select Answer
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div className={forms.col}>
          <button
            className={forms.btn}
            disabled={!valid}
            onClick={() => {
              submitForm(details, formType);
              if (formType === "add") {
                setDetails(defaultValue);
                setValid(false);
              }
            }}
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionForm;
