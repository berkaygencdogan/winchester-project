import express from "express";
import {
  uploadSingle,
  uploadResponse,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadSingle, uploadResponse);

export default router;
