const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../models/users/index");
const generateToken = require("../utils/generateToken");

// User Signup
const signup = asyncHandler(async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400);
  //   throw new Error(errors.array()[0].msg);
  // }

  const { email, password, name } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const user = await newUser.save();

  // const token = generateToken(newUser._id);

  // delete user.password;

  const { token, user } = await newUser.createUser();

  res.cookie("token", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", token, user });
});

// User Login
const login = asyncHandler(async (req, res) => {
  // console.log(req.cookies);

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400);
  //   throw new Error("Validation failed");
  // }

  const { email, password } = req.body;

  const { token, user } = await User.authenticateUser(email, password);

  // const user = await User.findOne({ email });
  // if (!user) {
  //   res.status(400);
  //   throw new Error("Invalid credentials");
  // }

  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   res.status(400);
  //   throw new Error("Invalid credentials");
  // }

  // const token = generateToken(user._id);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return res.status(200).json({ message: "Login successful", token, user });
});

// User Logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return res.status(200).json({ message: "Logout successful" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).json({ user });
});

module.exports = {
  signup,
  login,
  logout,
  getUserProfile,
};
