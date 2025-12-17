import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

import "./firebase/firebaseAdmin.js";
import userRoutes from "./routes/userRoutes.js";
import avatarUploadRoutes from "./routes/avatarUploadRoutes.js";
import messageUploadRoutes from "./routes/messageUploadRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/forums", forumRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload/avatar", avatarUploadRoutes);
app.use("/api/upload/message", messageUploadRoutes);
app.use("/api/likes", likeRoutes);

// ==================================================
// 🔁 DAILY RESET (SADECE TODAY CACHE)
// ==================================================

// const CACHE_DIR = path.resolve("cache");
// const TODAY_CACHE_FILE = path.join(CACHE_DIR, "football-today.json");

// function ensureTodayCache() {
//   if (!fs.existsSync(CACHE_DIR)) {
//     fs.mkdirSync(CACHE_DIR);
//   }

//   if (!fs.existsSync(TODAY_CACHE_FILE)) {
//     fs.writeFileSync(
//       TODAY_CACHE_FILE,
//       JSON.stringify({ date: null, data: null }, null, 2)
//     );
//   }
// }

// function scheduleDailyTodayReset() {
//   ensureTodayCache();

//   const now = new Date();
//   const resetTime = new Date();

//   resetTime.setHours(3, 0, 0, 0);

//   if (now >= resetTime) {
//     resetTime.setDate(resetTime.getDate() + 1);
//   }

//   const timeout = resetTime - now;

//   setTimeout(() => {
//     fs.writeFileSync(
//       TODAY_CACHE_FILE,
//       JSON.stringify({ date: null, data: null }, null, 2)
//     );

//     console.log("♻️ Today fixtures cache resetlendi (03:00)");

//     scheduleDailyTodayReset();
//   }, timeout);
// }

// scheduleDailyTodayReset();

// // ==================================================
// // ERROR HANDLER
// // ==================================================

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "FILE_TOO_LARGE",
        message: "Dosya boyutu çok büyük",
      });
    }
  }

  console.error("UNHANDLED ERROR:", err);
  res.status(500).json({ error: "SERVER_ERROR" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`)
);
