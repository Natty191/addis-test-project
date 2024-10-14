const mongoose = require("mongoose");

const methodFunctions = require("./methods");
const userSchema = require("./schema");
const staticFunctions = require("./statics");

userSchema.static(staticFunctions);
userSchema.method(methodFunctions);

const User = mongoose.model("User", userSchema);

module.exports = User;
