import express from "express";
import { deleteUser, test, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// 測試路由
router.get("/test", test);
// 更新使用者資料路由（但先檢查 `token`）
router.put("/update/:userId", verifyToken, updateUser);
// 刪除使用者路由
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
