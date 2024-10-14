const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

async function authenticateUser(email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    //   res.status(400);
    throw new Error("Invalid credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials", 400);
  }

  const token = generateToken(user._id);

  const cleanUser = user.clean();

  return { token, user: cleanUser };
}

module.exports = { authenticateUser };
