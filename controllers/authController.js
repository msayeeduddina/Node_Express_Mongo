const { signupSchema } = require("../middlewares/validator");
const User = require("../models/userModel");
const { doHash } = require("../utils/hashing");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { error, value } = signupSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await doHash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    result.password = undefined;

    res.status(201).json({
      status: true,
      message: "Sign up done with email and password",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
