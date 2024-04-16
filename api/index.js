import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
