import admin, { auth, db } from "../firebase/firebaseAdmin.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Filter } from "bad-words";
import { generateToken } from "../utils/generateToken.js";

const filter = new Filter();

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
    if (!password) return res.status(400).json({ error: "Şifre gerekli" });

    // Kötü kelime filtresi + boşluk alma
    const cleanedNickname = filter.clean(nickname).replace(/\s+/g, "");
    const cleanedUsername = filter.clean(username).replace(/\s+/g, "");
    const firstLetter = cleanedNickname.charAt(0).toUpperCase();
    const defaultAvatar = `https://ui-avatars.com/api/?name=${firstLetter}&background=ffb347&color=000&bold=true`;

    // UNIQUE CHECK — nickname
    const nicknameSnap = await db
      .collection("users")
      .where("nickname", "==", cleanedNickname)
      .get();

    if (!nicknameSnap.empty)
      return res.status(400).json({ error: "Bu nickname alınmış." });

    // UNIQUE CHECK — username
    const usernameSnap = await db
      .collection("users")
      .where("username", "==", cleanedUsername)
      .get();

    if (!usernameSnap.empty)
      return res.status(400).json({ error: "Bu kullanıcı adı alınmış." });

    // Şifre hashle
    const passwordHash = await bcrypt.hash(password, 10);

    // 🔥 YENİ USER MODELİ
    const userData = {
      uid,
      email,
      phone: phone || null,
      username: cleanedUsername.toLowerCase(),
      nickname: cleanedNickname.toLowerCase(),
      gender: gender || "",
      birthYear: birthYear || "",
      avatar: defaultAvatar,
      bio: "",
      emailVerified: false,
      passwordHash,
      role: "user",

      // Sosyal alanlar
      followers: [],
      following: [],

      // Profil istatistikleri
      stats: {
        topics: 0,
        messages: 0,
        likes: 0,
        views: 0,
      },

      // Forum özellikleri
      forum: {
        warnings: 0,
        tradeScore: 0,
        tradePositive: 0,
        tradeNeutral: 0,
        tradeNegative: 0,
      },

      // Sistem kayıtları
      createdAt: Date.now(),
      lastSeen: Date.now(),
      lastActivity: "Kayıt oldu",
    };

    // Firestore kaydet
    await db.collection("users").doc(uid).set(userData);

    return res.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Token eksik" });

    // 1) Firebase ID token doğrulama
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const emailVerified = decoded.email_verified;

    // 2) Firestore'dan kullanıcıyı çek
    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = snap.data();

    // 3) Kullanıcıyı güncelle (email doğrulaması + aktivite bilgileri)
    const updates = {
      emailVerified,
      lastSeen: Date.now(),
      lastActivity: "Giriş yaptı",
    };

    await userRef.update(updates);

    // 4) Güncellenmiş user objesini hazırla
    const updatedUser = { ...user, ...updates };

    // 5) JWT üret
    const token = generateToken(uid);

    return res.json({
      success: true,
      token,
      user: updatedUser,
    });
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

export const updateProfile = async (req, res) => {
  try {
    const { uid, bio, gender, birthYear, avatarBase64 } = req.body;

    if (!uid) return res.status(400).json({ error: "UID eksik" });

    const updateData = {
      bio: bio || "",
      gender: gender || "",
      birthYear: birthYear || "",
      lastActivity: "Profilini güncelledi",
      lastSeen: Date.now(),
    };

    // ---- AVATAR YÜKLENECEKSE ----
    if (avatarBase64) {
      const buffer = Buffer.from(avatarBase64, "base64");
      const fileName = `avatars/${uid}.jpg`;

      const bucket = admin
        .storage()
        .bucket(process.env.FIREBASE_STORAGE_BUCKET);
      const file = bucket.file(fileName);

      await file.save(buffer, {
        metadata: { contentType: "image/jpeg" },
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${fileName}`;
      updateData.avatar = publicUrl;
    }

    await db.collection("users").doc(uid).update(updateData);

    return res.json({ success: true, updated: updateData });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
};
