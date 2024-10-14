const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

async function createUser() {
  const { email, password, name } = this;

  const existingUser = await this.model("User").findOne({ email });
  if (existingUser) {
    // res.status(400);
    throw new Error("User already exists", 400);
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    this.password = hashedPassword;
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
