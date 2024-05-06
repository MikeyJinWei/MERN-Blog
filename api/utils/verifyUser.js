import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

const verifyToken = (req, res, next) => {
  // 從 Req 解構出 token（在首頁 `index.js` 需使用 cookie-parser middleware）
  const token = req.cookies.access_token;

  // 確認 `token` 的 `truthy`, `falsy`
  if (!token) {
    next(errorHandler(401, "Unauthorised"));
  }

  // 將 Client 的 token 與 `JWT_SECRET` 加密核對
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorised"));
    }
    // 在 Client 新增 `user` key 儲存用戶資料
    req.user = user;
    next();
  });
};

export default verifyToken;
