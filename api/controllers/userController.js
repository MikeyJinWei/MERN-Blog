import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  // 檢查 Client 與路由的 id 是否相符
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Not permitted to update this user"));
  }

  // 檢查 `password` 至少 6 位 -> 加密
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    // 檢查 `username` 介於 3~20 位之間
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 to 20 characters")
      );
    }

    // 禁止空白鍵
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    // 只能小寫命名
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    // 限制字元只能含小寫字母、數字、或底線
    if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain letters, numbers, or underline"
        )
      );
    }
  }

  try {
    // Client 更新後使用 id 從 DB 尋找使用者
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      // 對 `username`, `email`, `profilePicure`, `password` 重新賦值
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      // 允許回傳更新 Req 的新資料
      { new: true }
    );
    // 將密碼與其他資訊隔離開
    const { password, ...rest } = updatedUser._doc;
    // Respond 密碼以外的使用者資訊
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
