import express from "express";
import { test } from "../controllers/userController.js";

const router = express.Router();

// test route
router.get("/test", test);

export default router;
