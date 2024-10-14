const mongoose = require("mongoose");

const methodFunctions = require("./methods");
const songSchema = require("./schema");
const staticFunctions = require("./statics");

songSchema.static(staticFunctions);
songSchema.method(methodFunctions);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
