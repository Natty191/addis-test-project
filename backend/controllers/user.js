const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({ user: newUser, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials ");
  }
});

const getMe = asyncHandler((req, res) => {
  const user = {
    id: req.user._id,
    email: req.user._email,
    name: req.user._name,
  };
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
