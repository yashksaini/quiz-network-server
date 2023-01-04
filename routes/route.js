// import express from "express";
// import mongoose from "mongoose";
// import MongoStore from "connect-mongo";
// import dotenv from "dotenv";
// import session from "express-session";

const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const session = require("express-session");

const router = express.Router();

const app = express();
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = `mongodb://${username}:${password}@ac-yiuldeo-shard-00-00.8pambxl.mongodb.net:27017,ac-yiuldeo-shard-00-01.8pambxl.mongodb.net:27017,ac-yiuldeo-shard-00-02.8pambxl.mongodb.net:27017/quiz-network?ssl=true&replicaSet=atlas-xlqrrv-shard-0&authSource=admin&retryWrites=true&w=majority`;

// app.use(
//   session({
//     key: "userId",
//     secret: "asdfefna",
//     saveUninitialized: false,
//     resave: false,
//     store: MongoStore.create({
//       mongoUrl: URL,
//     }),
//     cookie: {
//       expires: 60 * 60 * 24 * 1000 * 30,
//     },
//   })
// );

// Schemas Start

// Users Schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  fullName: String,
});
const User = mongoose.model("users", userSchema);

// Questions Schema
const questionSchema = mongoose.Schema({
  content: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  answer: String,
  userId: String,
});
const Question = mongoose.model("questions", questionSchema);

// Quiz Schema
const quizSchema = mongoose.Schema({
  title: String,
  questions: Array,
  userId: String,
});
const Quiz = mongoose.model("quizes", quizSchema);

// Quiz Attempt Scehma
const attemptSchema = mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quizes" },
  correct: Number,
  incorrect: Number,
  time: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
const Attempt = mongoose.model("attempts", attemptSchema);
// Schemas End

router.get("/auth", function (req, res) {
  if (req.session.isAuth) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.send(true);
});

router.post("/signup", async (request, response) => {
  const details = request.body;

  // Creating object of the user
  const newUser = new User(details);

  try {
    User.countDocuments(
      { username: details.username },
      async function (err, count) {
        // Check Username exists or not
        if (count > 0) {
          response.send(false);
        } else {
          // Create new User
          await newUser.save();
          response.send(true);
        }
      }
    );
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    User.findOne({ username: username, password: password }, (err, docs) => {
      if (docs) {
        request.session.user = docs._id;
        request.session.isAuth = true;
        response.send(true);
      } else {
        response.send(false);
      }
    }).lean();
  } catch (error) {
    console.log(error);
    response.status(409).json({ message: error.message });
  }
});

// After Login Queries
router.post("/addQuestion", async (req, res) => {
  const { content, optionA, optionB, optionC, optionD, answer } = req.body;

  // Creating object of the user
  const newQuestion = new Question({
    content: content,
    answer: answer,
    optionA: optionA,
    optionB: optionB,
    optionC: optionC,
    optionD: optionD,
    userId: req.session.user,
  });

  // Create new User
  await newQuestion.save();
  res.send("Data Inserted Successfully");
});

router.post("/updateQuestion", async (req, res) => {
  const { content, optionA, optionB, optionC, optionD, answer, _id } = req.body;

  Question.updateOne(
    { _id: _id },
    {
      content: content,
      answer: answer,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
    },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data Updated Successfully");
      }
    }
  );
});

router.get("/getQuestions", (req, res) => {
  try {
    Question.find({ userId: req.session.user }, (err, docs) => {
      res.send(docs);
    }).lean();
  } catch (error) {
    console.log("Error in getting questions", error);
  }
});

router.post("/createQuiz", async (req, res) => {
  const { title, questions } = req.body;

  // Creating object of the user
  const newQuiz = new Quiz({
    title: title,
    questions: questions,
    userId: req.session.user,
  });

  // Create new Quiz
  await newQuiz.save();
  res.send("Quiz Created Successfully");
});

router.get("/getQuiz", (req, res) => {
  try {
    Quiz.find({ userId: req.session.user }, (err, docs) => {
      res.send(docs);
    }).lean();
  } catch (error) {
    console.log("Error in getting quizes", error);
  }
});

router.post("/checkAttempt", (req, res) => {
  const { id } = req.body;
  try {
    Attempt.find({ userId: req.session.user, quizId: id }, (err, docs) => {
      res.send(docs);
    }).lean();
  } catch (error) {
    console.log("Error in getting attempt", error);
  }
});

router.post("/getPlayQuiz", (req, res) => {
  const { id } = req.body;

  try {
    Quiz.find({ _id: id }, (err, docs) => {
      res.send(docs);
    }).lean();
  } catch (error) {
    console.log("Error in getting quiz", error);
  }
});

router.post("/addAttempt", async (req, res) => {
  const result = req.body;

  // Creating object of the attempt
  const newAttempt = new Attempt({
    userId: req.session.user,
    correct: result.correct,
    incorrect: result.incorrect,
    time: result.time,
    quizId: result.quizId,
  });

  // Create new Attempt
  await newAttempt.save();
  res.send("Attempt Added successfully");
});

router.post("/getResults", (req, res) => {
  const { id } = req.body;
  try {
    Attempt.find({ quizId: id }, ["correct", "incorrect", "time", "userId"], {
      sort: {
        correct: -1,
        time: 1,
      },
    })
      .populate("userId", "fullName")
      .exec((err, docs) => {
        res.send(docs);
      });
  } catch (error) {
    console.log("Error in getting result data", error);
  }
});

router.get("/getProfile", (req, res) => {
  try {
    User.findOne({ _id: req.session.user }, (err, docs) => {
      res.send(docs);
    }).lean();
  } catch (error) {
    console.log("Error in getting profile", error);
  }
});

router.get("/getAttemptQuizes", async (req, res) => {
  try {
    Attempt.find({ userId: req.session.user }, [
      "correct",
      "incorrect",
      "time",
      "quizId",
    ])
      .populate("quizId", "title")
      .exec((err, docs) => {
        res.send(docs);
      });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
// export default router;
