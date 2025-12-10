import { db } from "../firebase/firebaseAdmin.js";
import { Timestamp } from "firebase-admin/firestore";

export async function createComment(threadId, userId, message) {
  const commentRef = db
    .collection("forums")
    .doc(threadId)
    .collection("comments")
    .doc();

  const data = {
    id: commentRef.id,
    threadId,
    userId,
    message,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await commentRef.set(data);
  return data;
}

export async function getComments(threadId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const snapshot = await db
    .collection("forums")
    .doc(threadId)
    .collection("comments")
    .orderBy("createdAt", "asc")
    .offset(offset)
    .limit(limit)
    .get();

  const comments = snapshot.docs.map((d) => d.data());

  return comments;
}

export async function countComments(threadId) {
  const snap = await db
    .collection("forums")
    .doc(threadId)
    .collection("comments")
    .count()
    .get();

  return snap.data().count;
}
