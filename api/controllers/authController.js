import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// register
export const register = async (req, res, next) => {
  // destructure data from field
  const { username, email, password } = req.body;

  // handle client fields error
  if (!username || username === "" || !email || !password) {
    // handle with error handle middleware from `api/utils/error.js`
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // save data to db
    await newUser.save();
    res.json("Register successful");
  } catch (error) {
    // handle repeated email (duplicate key) error with middleware
    // res.status(500).json({ message: error.message });
    next(error); // log error to client
  }
};
