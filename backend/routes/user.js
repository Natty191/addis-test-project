const express = require("express");
const {
  signup,
  login,
  logout,
  getUserProfile,
} = require("../controllers/user");
const {
  signupValidation,
  loginValidation,
} = require("../validators/auth.validator");
const { auth } = require("../middleware/auth");
const parser = require("../validators/errors.parser");

const router = express.Router();

router.post("/signup", signupValidation, parser, signup);
router.post("/login", loginValidation, parser, login);
router.post("/logout", logout);
router.get("/me", auth, getUserProfile);

module.exports = router;
