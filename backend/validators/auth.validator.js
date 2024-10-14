const { body } = require("express-validator");

// Validation rules for signup
const signupValidation = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").trim().notEmpty().withMessage("Name is required"),
];

// Validation rules for login
const loginValidation = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

module.exports = { signupValidation, loginValidation };
