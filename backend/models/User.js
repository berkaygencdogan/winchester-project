import { db } from "../firebase/firebaseAdmin.js";

export const UserModel = {
  async getByUID(uid) {
    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();
    return snap.exists ? snap.data() : null;
  },

  async create(data) {
    await db.collection("users").doc(data.uid).set(data);
    return data;
  },
};
