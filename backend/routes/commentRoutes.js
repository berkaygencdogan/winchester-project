import express from "express";
import { addComment, listComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:threadId", addComment);

router.get("/:threadId", listComments);

export default router;
