const { body } = require("express-validator");

const songValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("artist").trim().notEmpty().withMessage("Artist is required"),
  body("album").trim().notEmpty().withMessage("Album is required"),
  body("coverUrls").isArray().withMessage("Cover URLs must be an array"),
  body("coverUrls.*").isURL().withMessage("Invalid URL format"),
];

module.exports = { songValidation };
