import express from "express";
import { uploadAvatar, updateAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadAvatar, updateAvatar);

export default router;
