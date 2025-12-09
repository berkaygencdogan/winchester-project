import express from "express";
import {
  createForum,
  getForums,
  getForumDetail,
} from "../controllers/forumController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createForum);
router.get("/", getForums);
router.get("/:id", getForumDetail);

export default router;
