import express from "express";
import { googleAuth, login, register } from "../controllers/authController.js";

const router = express.Router();

// register
router.post("/register", register);
// login
router.post("/login", login);
// google auth
router.post("/google", googleAuth);

export default router;
