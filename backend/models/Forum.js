import admin, { db, auth } from "../firebase/firebaseAdmin";

const FORUMS = db.collection("forums");

export const ForumModel = {
  /* ============================================================
      📌 Yeni forum konusu oluştur
  ============================================================ */
  async create(data) {
    const ref = await FORUMS.add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const doc = await ref.get();
    return { id: ref.id, ...doc.data() };
  },

  /* ============================================================
      📌 Tüm forumları getir (tarihe göre sıralı)
  ============================================================ */
  async getAll() {
    const snapshot = await FORUMS.orderBy("createdAt", "desc").get();

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  /* ============================================================
      📌 Tek forumu getir
  ============================================================ */
  async getById(id) {
    const doc = await FORUMS.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  /* ============================================================
      📌 Forum güncelle (başlık vs.)
  ============================================================ */
  async update(id, updates) {
    await FORUMS.doc(id).update(updates);
    const updated = await FORUMS.doc(id).get();
    return { id: updated.id, ...updated.data() };
  },

  /* ============================================================
      📌 Forum sil
  ============================================================ */
  async delete(id) {
    await FORUMS.doc(id).delete();
    return true;
  },
};
