const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("../middlewares/validator");
const User = require("../models/userModel");
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const transport  = require("../middlewares/sendMail");

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

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    const existingUser = await User.findOne({ email }).select("password");
    if (!existingUser) {
      return res.status(409).json({
        status: false,
        message: "User do not exists.",
      });
    }
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      res.status(201).json({
        status: false,
        message: "Sign up done with email and password",
      });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );
    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "logged in successfully",
      });
  } catch (error) {
    console.error("signin error", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie("Authorization");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Signout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if (existingUser.verified) {
      return res.status(400).json({
        status: false,
        message: "User already verified",
      });
    }
    const codeValue = String(Math.floor(100000 + Math.random() * 900000));
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "Verification Code",
      html: `<h1>${codeValue}</h1>`,
    });
    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = await hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET
      );
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({
        success: true,
        message: "Verification code sent successfully.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed to send verification code.",
    });
  } catch (error) {
    console.error(`sendVerificationCode error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};