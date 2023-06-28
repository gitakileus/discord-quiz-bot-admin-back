import mongoose from "mongoose";
import dotenv from "dotenv";

import question from "./question";

dotenv.config();

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: process.env.MONGO_URI || "mongodb://localhost:27017/quiz",
  question: question(mongoose),
};

export default db;
