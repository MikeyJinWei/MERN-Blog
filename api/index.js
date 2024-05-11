import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
const app = express();

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

// activate user route
app.use("/api/user", userRoute);

// activate auth route
app.use("/api/auth", authRoute);

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
