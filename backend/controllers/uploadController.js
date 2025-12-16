import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "../firebase/firebaseAdmin.js";

const avatarDir = "./uploads/avatars";

if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, avatarDir);
  },
  filename(req, file, cb) {
    const uid = req.body.uid;
    cb(null, `${uid}.jpg`);
  },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("avatar");

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

    return res.json({
      success: true,
      avatar: avatarUrl,
    });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

/* =====================================================
   MESSAGE FILE UPLOAD
===================================================== */

const messageUploadDir = "./uploads/messages";

if (!fs.existsSync(messageUploadDir)) {
  fs.mkdirSync(messageUploadDir, { recursive: true });
}

const messageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, messageUploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}${ext}`;
    cb(null, name);
  },
});

export const uploadMessageFile = multer({
  storage: messageStorage, // ⚠️ BURASI KRİTİK (storages ❌)
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).single("file");

export function handleMessageUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yok" });
    }

    return res.json({
      success: true,
      file: {
        url: `${process.env.SERVER_URL}/uploads/messages/${req.file.filename}`,
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (err) {
    console.error("MESSAGE UPLOAD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
