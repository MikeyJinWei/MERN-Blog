import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// register
export const register = async (req, res) => {
  // destructure data from field
  const { username, email, password } = req.body;

  // handle client fields error
  if (!username || username === "" || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
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
    // handle same email error
    res.status(500).json({ message: error.message }); // log error to client
  }
};
