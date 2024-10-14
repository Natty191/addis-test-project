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
      default: "Other",
      trim: true,
    },
    coverUrls: { type: [String] },
    artistImage: String,
    previewAudioUrl: { type: String },
    likes: { type: Number, default: 0 },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A song must have a creator"],
    },
    artistId: {
      type: String,
    },
  },
  { timestamps: true }
);

songSchema.index(
  { title: "text", artist: "text", album: "text", genre: "text" },
  { weights: { title: 8, artist: 6, album: 6, genre: 2 } }
);

module.exports = songSchema;
