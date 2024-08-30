const mongoose = require("mongoose");

// Define the song schema
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A song must have a title"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "A song must have an artist"],
      trim: true,
    },
    album: {
      type: String,
      required: [true, "A song must belong to an album"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "A song must have a genre"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
