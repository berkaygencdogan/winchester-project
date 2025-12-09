import admin, { db, auth } from "../firebase/firebaseAdmin";

const COMMENTS = db.collection("comments");

export const CommentModel = {
  /* ============================================================
      📌 Yeni yorum ekle
  ============================================================ */
  async create(data) {
    const ref = await COMMENTS.add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const doc = await ref.get();
    return { id: ref.id, ...doc.data() };
  },

  /* ============================================================
      📌 Bir foruma ait yorumları getir
  ============================================================ */
  async getByForumId(forumId) {
    const snapshot = await COMMENTS.where("forumId", "==", forumId)
      .orderBy("createdAt", "asc")
      .get();

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  /* ============================================================
      📌 Yorum sil
  ============================================================ */
  async delete(id) {
    await COMMENTS.doc(id).delete();
    return true;
  },
};
