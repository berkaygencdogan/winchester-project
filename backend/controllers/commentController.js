import {
  createComment,
  getComments,
  countComments,
} from "../models/Comment.js";
import { db } from "../firebase/firebaseAdmin.js";

export const addComment = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { userId, message } = req.body;

    if (!userId || !message)
      return res.status(400).json({ error: "Eksik alanlar var" });

    const comment = await createComment(threadId, userId, message);

    return res.json({ success: true, comment });
  } catch (err) {
    console.error("ADD COMMENT ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const listComments = async (req, res) => {
  try {
    const { threadId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const comments = await getComments(threadId, page, limit);
    const total = await countComments(threadId);

    return res.json({
      success: true,
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("LIST COMMENTS ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
