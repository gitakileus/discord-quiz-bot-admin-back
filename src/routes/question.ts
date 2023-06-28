import express from "express";
import multer from "multer";
import path from "path";

import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question";

// Set up the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set up the upload configuration0000000000000000000
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 10MB
  },
});

const router = express.Router();

router.get("/all", getQuestions);
router.post("/", upload.single("image"), createQuestion);
router.put("/", updateQuestion);
router.delete("/", deleteQuestion);

export default router;
