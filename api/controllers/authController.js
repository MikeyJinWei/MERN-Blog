import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// register
const register = async (req, res, next) => {
  // 從 Client POST 解構出資料
  const { username, email, password } = req.body;

  // 處理 Client 輸入欄位時格式錯誤
  if (!username || username === "" || !email || !password) {
    // 使用 `api/utils/error.js` 的 middleware 處理錯誤
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // 建立新的使用者
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // 將資料儲存至 DB
    await newUser.save();
    res.json("Register successful");
  } catch (error) {
    // 使用 middleware 處理重複註冊 `email` (duplicate key) 的錯誤
    // res.status(500).json({ message: error.message });
    next(error); // 向 Client 輸出錯誤信息
  }
};

// login
const login = async (req, res, next) => {
  // 從 `req` 存取 `username`, `password`
  const { email, password } = req.body;

  // 處理 Client 未在欄位輸入的錯誤
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // 認證 `email` 是否存在於 DB
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid email or password"));
    }

    // 認證密碼 - 將 `req` 的 `password` 和 DB 中與 `email` 儲存在一起的比較
    const validPassword = await bcrypt.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(errorHandler(404, "Invalid email or password"));
    }

    // 簽證 token權限
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 特別將 `password` 與其他資訊分開儲存 => 避免 payload 時暴露
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      // 將 Cookie respond 給 client
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest); // 向 Client respond `password` 以外的資訊
  } catch (error) {
    next(error);
  }
};

// google auth
const googleAuth = async (req, res, next) => {
  // 從 POST 解構出使用者資訊
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // 在 DB 中尋找是否有相符的 `email`
    // 將尋找結果的 `truthy`, `falsy` 儲存在 `user` variable
    const user = await User.findOne({ email });

    // `user` `truthy` (i.e. 存在) 時
    if (user) {
      // 簽證 token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // 將 `password` 與其他資訊分開
      const { password, ...rest } = user._doc;

      // 設置 `statusCode`, `cookie` 並 respond 給 client
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
      // 假如用戶不存在
    } else {
      // 傳入 `toString()` method 的 argument - 10 => 0 ~ 9, 11 ~ 36 => a ~ z
      // `Math.random().toString(36)` 將 `number` 轉換成 1 ~ 8 位數的 `string`
      // `slice()` method 只取字串後 8 位數
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // 使用 bcrypt 將密碼加密

      const newUser = new User({
        // `split()` method 傳入 `' '` 以空白為基準區隔將姓名分組成 `array` e.g. `'john doe'` => `['john', 'doe']`
        // `join()` method 將 `array` 所有元素合併成 `string`, e.g. ``['john', 'doe']` => `'johndoe'
        // 在 `toString()` method 傳入 9 => 生成 9 位數
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save(); // 上傳儲存至 DB
      // 簽證 token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export { register, login, googleAuth };
