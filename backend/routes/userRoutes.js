import express from "express";
import {
  registerUser,
  loginUser,
  refreshEmailVerifiedStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-email-status", refreshEmailVerifiedStatus);

export default router;
