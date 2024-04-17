import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
