import { db } from "../firebase/firebaseAdmin.js";

function cleanData(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}
export class UserModel {
  static collection = db.collection("users");

  static async create(data) {
    console.log("🔥 Firestore yeni kullanıcı oluşturuluyor:", data.uid);
    await db.collection("users").doc(data.uid).set(data);
    return data;
  }

  static async getByEmail(email) {
    const snap = await this.collection.where("email", "==", email).get();
    if (snap.empty) return null;
    return snap.docs[0].data();
  }

  static async getByPhone(phone) {
    const snap = await this.collection.where("phone", "==", phone).get();
    if (snap.empty) return null;
    return snap.docs[0].data();
  }

  static async getByUsername(username) {
    const snap = await this.collection.where("username", "==", username).get();
    if (snap.empty) return null;
    return snap.docs[0].data();
  }

  static async getByUID(uid) {
    const snap = await this.collection.where("uid", "==", uid).get();
    if (snap.empty) return null;
    return snap.docs[0].data();
  }
  static async update(uid, data) {
    console.log("🛠 Firestore update:", uid);
    await db.collection("users").doc(uid).update(data);
    return this.getByUID(uid);
  }
}
