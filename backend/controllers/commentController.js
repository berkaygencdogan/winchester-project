import admin, { db, auth } from "../firebase/firebaseAdmin.js";

const forumsRef = admin.firestore().collection("forums");
const commentsRef = admin.firestore().collection("comments");

export async function addComment(req, res) {
  try {
    const uid = req.user.uid;
    const forumId = req.params.forumId;
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Yorum boş olamaz." });

    // Yorum oluştur
    const newComment = {
      forumId,
      userId: uid,
      text,
      createdAt: Date.now(),
    };

    await commentsRef.add(newComment);

    // Forumun commentCount'unu +1 yap
    await forumsRef.doc(forumId).update({
      commentCount: admin.firestore.FieldValue.increment(1),
    });

    res.json({ success: true, comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ======================================================
// 📌 Bir forumun yorumlarını getir
// ======================================================
export async function getComments(req, res) {
  try {
    const forumId = req.params.forumId;

    const snap = await commentsRef
      .where("forumId", "==", forumId)
      .orderBy("createdAt", "asc")
      .get();

    const result = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
