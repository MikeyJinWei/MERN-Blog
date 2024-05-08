import express from "express";
import { test, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// 測試路由
router.get("/test", test);

// 更新使用者資料路由（但先檢查 `token`）
router.put("/update/:userId", verifyToken, updateUser);

export default router;
