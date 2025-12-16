import { db } from "../firebase/firebaseAdmin.js";

export const toggleLike = async (req, res) => {
  try {
    const { userId, targetId, targetType } = req.body;

    if (!userId || !targetId || !targetType) {
      return res.status(400).json({ error: "INVALID_DATA" });
    }

    const snap = await db
      .collection("likes")
      .where("userId", "==", userId)
      .where("targetId", "==", targetId)
      .where("targetType", "==", targetType)
      .limit(1)
      .get();

    // UNLIKE
    if (!snap.empty) {
      await db.collection("likes").doc(snap.docs[0].id).delete();
      return res.json({ liked: false });
    }

    // LIKE
    await db.collection("likes").add({
      userId,
      targetId,
      targetType, // "thread" | "message"
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ liked: true });
  } catch (err) {
    console.error("LIKE ERROR:", err);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};
