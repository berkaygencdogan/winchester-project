import express from "express";
import {
  uploadMessageFile,
  handleMessageUpload,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadMessageFile, handleMessageUpload);

export default router;
