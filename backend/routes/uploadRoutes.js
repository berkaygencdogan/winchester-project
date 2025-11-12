import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 📁 Yükleme klasörünü oluştur
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🔹 Disk Storage ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 🔹 Route: Dosya yükleme
router.post("/", upload.single("profileImage"), (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "Dosya yüklenmedi" });

  const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${
    req.file.filename
  }`;
  res.json({ success: true, url: fileUrl });
});

export default router;
