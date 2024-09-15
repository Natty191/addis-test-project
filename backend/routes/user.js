const express = require("express");
const {
  signup,
  login,
  logout,
  getUserProfile,
  addFavorite,
  removeFavorite,
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
router.put("/add-favorite/:songId", auth, addFavorite);
router.put("/remove-favorite/:songId", auth, removeFavorite);

module.exports = router;
