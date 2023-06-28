import { Request, Response } from "express";
import db from "../models";

const Question = db.question;

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  const question = req.body;
  const imageFile = req.file;
  console.log(question);
  try {
    const newQuestion = new Question({
      ...question,
      answers: JSON.parse(question.answers),
      embededImage: imageFile?.filename || "",
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.query;
  const newQuestion = req.body;
  console.log("id", id);
  try {
    let question = await Question.findById(id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }
    question.title = newQuestion.title;
    question.embededImage = newQuestion.embededImage;
    question.answers = newQuestion.answers;
    await question.save();
    res.status(200).json(question);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const result = await Question.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};
