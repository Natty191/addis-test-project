const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

async function createUser() {
  const { email, password } = this;

  const existingUser = await this.model("User").findOne({ email });
  if (existingUser) {
    throw new Error("User already exists", 400);
  }

  const user = await this.save();

  const cleanUser = user.clean();
  const token = generateToken(cleanUser._id);

  return { token, user: cleanUser };
}

/**
 *
 */
function clean() {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
}

module.exports = { createUser, clean };
