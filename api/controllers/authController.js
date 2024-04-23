import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// register
const register = async (req, res, next) => {
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

// login
const login = async (req, res, next) => {
  // access username, password from request
  const { email, password } = req.body;

  // handle client empty input error
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // verify if email exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid email or password"));
    }

    // verify password - compare password from request with the db one which is stored with email
    const validPassword = await bcrypt.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(errorHandler(404, "Invalid email or password"));
    }

    // sign token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // separate password from other info and store them in _doc key
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      // respond cookie to client
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest); // respond client info without password
  } catch (error) {
    next(error);
  }
};

export { register, login };
