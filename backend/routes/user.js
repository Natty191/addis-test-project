const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user");

router.post("/", (req, res) => {
  res.json({ message: registerUser });
});

router.get("/login", (req, res) => {
  res.json({ message: loginUser });
});

module.exports = router;
