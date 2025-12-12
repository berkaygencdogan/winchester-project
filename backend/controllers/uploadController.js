import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "../firebase/firebaseAdmin.js";

const avatarDir = "./uploads/avatars";
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, avatarDir);
  },
  filename(req, file, cb) {
    const uid = req.body.uid;
    cb(null, `${uid}.jpg`);
  },
});

export const uploadAvatar = multer({ storage }).single("avatar");

export async function updateAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenmedi" });
    }

    const { uid, bio, gender, birthYear } = req.body;
    const avatarUrl = `${process.env.SERVER_URL}/uploads/avatars/${uid}.jpg`;

    await db.collection("users").doc(uid).update({
      avatar: avatarUrl,
      bio,
      gender,
      birthYear,
    });

    res.json({ success: true, avatar: avatarUrl });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
