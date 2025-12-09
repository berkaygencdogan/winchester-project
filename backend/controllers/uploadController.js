import multer from "multer";
import path from "path";

// Upload klasörü yoksa oluştur
import fs from "fs";
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(null, "IMG_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Single upload route
export const uploadSingle = upload.single("image");

// Response controller
export function uploadResponse(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Dosya yüklenmedi" });
  }

  res.json({
    url: `/uploads/${req.file.filename}`,
  });
}
