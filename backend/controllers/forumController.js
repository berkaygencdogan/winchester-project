import { db } from "../firebase/firebaseAdmin.js";
import { v4 as uuid } from "uuid";

export const getForumThreads = async (req, res) => {
  try {
    const snap = await db
      .collection("forums")
      .where("isDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .get();

    const threads = snap.docs.map((doc) => doc.data());
    return res.json({ threads });
  } catch (err) {
    console.error("GET THREADS ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;

    const threadDoc = await db.collection("forums").doc(id).get();
    if (!threadDoc.exists)
      return res.status(404).json({ error: "Thread not found" });

    const thread = threadDoc.data();

    const commentsSnap = await db
      .collection("forums")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    const comments = commentsSnap.docs.map((d) => d.data());

    return res.json({ thread, comments });
  } catch (err) {
    console.error("GET THREAD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   3) Yeni Konu Aç (CreateThread)
====================================================== */
export const createThreadController = async (req, res) => {
  try {
    const { title, categoryId, authorId, authorName, message } = req.body;

    const threadId = uuid();
    const commentId = uuid();

    const threadData = {
      id: threadId,
      title,
      categoryId,
      authorId,
      authorName,
      replyCount: 1,
      views: 0,
      isLocked: false,
      isDeleted: false,
      createdAt: new Date(),
    };

    await db.collection("forums").doc(threadId).set(threadData);

    await db
      .collection("forums")
      .doc(threadId)
      .collection("comments")
      .doc(commentId)
      .set({
        id: commentId,
        threadId,
        userId: authorId,
        userName: authorName,
        message,
        createdAt: new Date(),
      });
    return res.json({ success: true, threadId });
  } catch (err) {
    console.error("CREATE THREAD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
