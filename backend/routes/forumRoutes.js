import express from "express";
import {
  createThreadController,
  getForumThreads,
  getThreadById,
} from "../controllers/forumController.js";

const router = express.Router();

// Tüm konuları listele
router.get("/", getForumThreads);

// Tek konu getir (ID ile)
router.get("/:id", getThreadById);

// Yeni konu oluştur
router.post("/", createThreadController);

export default router;
