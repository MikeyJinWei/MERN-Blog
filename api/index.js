import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const __dirname = path.resolve(); // 取得動態路徑
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});
// 啟用 user route
app.use("/api/user", userRoute);
// 啟用 auth route
app.use("/api/auth", authRoute);

// 啟用 Client 路徑
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// activate error handler middleware
app.use((err, req, res, next) => {
  // access `statusCode` key from `err` within HTTP protocol
  const statusCode = err.statusCode || 500;
  // access `error` message from `Error` object
  const message = err.message || "Internal Server Error";

  // response status code and error message to client
  res.status(statusCode).json({
    success: false, // response json error contain multiple key
    statusCode,
    message,
  });
});
