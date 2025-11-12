import express from "express";
import { Comment } from "../models/Comment.js";

const router = express.Router();

// ✅ 1. Tüm yorumları getir (ana + yanıtlar)
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ 2. Yeni yorum ekle
router.post("/", async (req, res) => {
  try {
    const { username, text, parentId } = req.body;

    const newComment = new Comment({
      username,
      text,
      date: new Date().toLocaleString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      parentId: parentId || null,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ 3. Belirli bir yoruma yanıtları getir (opsiyonel)
router.get("/:parentId/replies", async (req, res) => {
  try {
    const replies = await Comment.find({ parentId: req.params.parentId });
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
