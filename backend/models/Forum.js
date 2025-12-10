import { db } from "../firebase/firebaseAdmin.js";
import { Timestamp } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid";

export async function createThread(title, authorId, authorName, categoryId) {
  const threadId = uuidv4();

  const data = {
    id: threadId,
    title,
    authorId,
    authorName,
    categoryId,
    createdAt: Timestamp.now(),
    views: 0,
    replyCount: 0,

    // Admin features
    isLocked: false,
    lockedAt: null,
    lockedBy: null,

    isDeleted: false,
    deletedAt: null,
    deletedBy: null,
  };

  await db.collection("forums").doc(threadId).set(data);

  return data;
}

export async function softDeleteThread(threadId, adminId) {
  return db.collection("forums").doc(threadId).update({
    isDeleted: true,
    deletedAt: Timestamp.now(),
    deletedBy: adminId,
  });
}

export async function lockThread(threadId, adminId) {
  return db.collection("forums").doc(threadId).update({
    isLocked: true,
    lockedAt: Timestamp.now(),
    lockedBy: adminId,
  });
}

export async function unlockThread(threadId) {
  return db.collection("forums").doc(threadId).update({
    isLocked: false,
    lockedAt: null,
    lockedBy: null,
  });
}
