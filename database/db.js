// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-yiuldeo-shard-00-00.8pambxl.mongodb.net:27017,ac-yiuldeo-shard-00-01.8pambxl.mongodb.net:27017,ac-yiuldeo-shard-00-02.8pambxl.mongodb.net:27017/quiz-network?ssl=true&replicaSet=atlas-xlqrrv-shard-0&authSource=admin&retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database", error);
  }
};

// export default Connection;
module.exports = { Connection };
