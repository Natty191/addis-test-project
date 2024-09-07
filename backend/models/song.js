const mongoose = require("mongoose");

// Define the song schema
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A song must have a title"],
      trim: true,
      index: true,
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
    coverUrl: String,
  },
  { timestamps: true }
);

songSchema.index(
  { title: "text", artist: "text", album: "text", genre: "text" },
  { weights: { title: 8, artist: 6, album: 6, genre: 2 } }
);

module.exports = mongoose.model("Song", songSchema);
