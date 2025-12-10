import { auth, db } from "../firebase/firebaseAdmin.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Filter } from "bad-words";
import { generateToken } from "../utils/generateToken.js";

const filter = new Filter();

/* -----------------------------------------
   REGISTER (email + password)
----------------------------------------- */
export const registerUser = async (req, res) => {
  try {
    const {
      uid,
      email,
      password,
      phone,
      username,
      nickname,
      birthYear,
      gender,
    } = req.body;

    if (!uid) return res.status(400).json({ error: "UID eksik" });
    if (!email) return res.status(400).json({ error: "Email gerekli" });

    const cleanedNickname = filter
      .clean(nickname)
      .replace(/\s+/g, "")
      .toLowerCase();
    const cleanedUsername = filter
      .clean(username)
      .replace(/\s+/g, "")
      .toLowerCase();

    // UNIQUE kontrol
    const nicknameSnap = await db
      .collection("users")
      .where("nickname", "==", cleanedNickname)
      .get();
    if (!nicknameSnap.empty)
      return res.status(400).json({ error: "Bu nickname alınmış." });

    const usernameSnap = await db
      .collection("users")
      .where("username", "==", cleanedUsername)
      .get();
    if (!usernameSnap.empty)
      return res.status(400).json({ error: "Bu kullanıcı adı alınmış." });

    // Password hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Firestore user oluştur
    await db
      .collection("users")
      .doc(uid)
      .set({
        uid,
        email,
        phone,
        username: cleanedUsername,
        nickname: cleanedNickname,
        birthYear,
        gender,
        bio: "",
        avatar: null,
        emailVerified: false,
        passwordHash,
        role: "user",
        stats: {
          played: 0,
          win: 0,
          lose: 0,
          followers: 0,
          following: 0,
        },
        createdAt: Date.now(),
      });

    return res.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
};

/* -----------------------------------------
   LOGIN (email + password)
----------------------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Token eksik" });

    // Firebase token doğrula
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const emailVerified = decoded.email_verified;

    // Firestore user'ı çek
    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) return res.status(400).json({ error: "User not found" });

    // Firestore'da emailVerified güncelle
    await userRef.update({ emailVerified });

    const user = { ...snap.data(), emailVerified };

    const token = generateToken(uid);

    return res.json({ success: true, token, user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
};

/* -----------------------------------------
   REFRESH EMAIL VERIFIED STATUS
----------------------------------------- */
export const refreshEmailVerifiedStatus = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decoded = await auth.verifyIdToken(idToken);

    const uid = decoded.uid;
    const emailVerified = decoded.email_verified;

    const userRef = db.collection("users").doc(uid);

    await userRef.update({ emailVerified });

    return res.json({ success: true, emailVerified });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
