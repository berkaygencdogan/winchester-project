import admin, { db, auth } from "../firebase/firebaseAdmin.js";

// Firestore referansı
const forumsRef = admin.firestore().collection("forums");

// ======================================================
// 📌 Forum oluştur
// ======================================================
export async function createForum(req, res) {
  try {
    const uid = req.user.uid;
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Başlık ve içerik zorunlu." });
    }

    const newForum = {
      userId: uid,
      title,
      content,
      image: image || "",
      createdAt: Date.now(),
      commentCount: 0,
    };

    const doc = await forumsRef.add(newForum);

    res.json({ id: doc.id, ...newForum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ======================================================
// 📌 Forum listesi (son eklenenler)
// ======================================================
export async function getForums(req, res) {
  try {
    const snap = await forumsRef.orderBy("createdAt", "desc").limit(30).get();

    const result = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ======================================================
// 📌 Forum detay
// ======================================================
export async function getForumDetail(req, res) {
  try {
    const forumId = req.params.id;

    const snap = await forumsRef.doc(forumId).get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Forum bulunamadı." });
    }

    res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
