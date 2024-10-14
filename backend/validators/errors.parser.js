const { validationResult } = require("express-validator");

const parser = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  return res.status(400).json(validationErrors);
};

module.exports = parser;
