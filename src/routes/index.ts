import express from "express";
import questionRouter from "./question";

const router = express.Router();

router.use("/question", questionRouter);

export default router;
