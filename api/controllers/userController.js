import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const test = (req, res) => {
  res.json({ message: "API is working!" });
};

const updateUser = async (req, res, next) => {
  // Client 路由的 `userId` param後綴
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "No authority to update this user"));
  }
  // 確認 Client `password` key 的 `truthy`, `falsy`
  if (req.body.password) {
    // 限制 `password` 長度至少需 6 位數
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }

    // 為 `password` 加密
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  // 確認 Client `username` 的 `truthy`, `falsy`
  if (req.body.username) {
    // 排除用戶名長度小於 3 或大於 20 位數的錯誤
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must between 3 and 20 characters")
      );
    }

    // 排除誤打空白鍵的錯誤
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    // 排除誤打大小寫的錯誤
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    // 限制只能輸入數字、英文字母及底線 => RegExp
    if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain letters, nummbers or underscore"
        )
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          // 依 Schema 允許使用者修改既定資料
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true } // 允許存取 Client 送出的新資料 req
      );

      // 將密碼與其他資訊隔離解構才 Respond
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

export { test, updateUser };
