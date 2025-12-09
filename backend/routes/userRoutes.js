import express from "express";
import { loginPhone } from "../controllers/userController.js";

const router = express.Router();

router.post("/phone-login", loginPhone);

export default router;
