import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:forumId", authMiddleware, addComment);
router.get("/:forumId", getComments);

export default router;
