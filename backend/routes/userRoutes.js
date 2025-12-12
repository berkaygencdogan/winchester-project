import express from "express";
import {
  registerUser,
  loginUser,
  refreshEmailVerifiedStatus,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-email-status", refreshEmailVerifiedStatus);
router.post("/update-profile", updateProfile);

export default router;
