import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./firebase/firebaseAdmin.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/upload/avatar", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/forums", forumRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`)
);
