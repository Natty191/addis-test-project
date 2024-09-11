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
} = require("../validators/authValidations");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.get("/me", auth, getUserProfile);

module.exports = router;
