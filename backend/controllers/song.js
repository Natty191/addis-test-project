const asyncHandler = require("express-async-handler");
const Song = require("../models/song");
const { removeDuplicates } = require("../utils/removeDuplicates");

// Create a new song
const createSong = asyncHandler(async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;

    const song = await Song.create({
      title,
      artist,
      album,
      genre,
    });

    res.status(201).json({ song });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid song data");
  }
});

// Get all songs
const getSongs = asyncHandler(async (req, res) => {
  try {
    const { query, filter, sort } = req.query;

    // Search with no filter
    const songsIndex = await Song.find(
      { $text: { $search: query.value } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    const songsRegex = await Song.find({
      $or: [
        {
          title: {
            $regex: `${query.value.trim().replace(" ", "|")}`,
            $options: "i",
          },
        },
        {
          artist: {
            $regex: `${query.value.trim().replace(" ", "|")}`,
            $options: "i",
          },
        },
        {
          album: {
            $regex: `${query.value.trim().replace(" ", "|")}`,
            $options: "i",
          },
        },
        {
          genre: {
            $regex: `${query.value.trim().replace(" ", "|")}`,
            $options: "i",
          },
        },
      ],
    });

    // Search with filers
    let songsTitle = [];
    let songsArtist = [];
    let songsAlbum = [];
    let songsGenre = [];

    if (!query.filter || query.filter === "all") {
      songsTitle = await Song.find({
        title: {
          $regex: `${query.value.trim().replace(" ", "|")}`,
          $options: "i",
        },
      });
    }
    if (query.filter === "artist") {
      songsArtist = await Song.find({
        artist: {
          $regex: `${query.value.trim().replace(" ", "|")}`,
          $options: "i",
        },
      });
    }
    if (query.filter === "album") {
      songsAlbum = await Song.find({
        album: {
          $regex: `${query.value.trim().replace(" ", "|")}`,
          $options: "i",
        },
      });
    }
    if (query.filter === "genre") {
      songsGenre = await Song.find({
        genre: {
          $regex: `${query.value.trim().replace(" ", "|")}`,
          $options: "i",
        },
      });
    }

    // console.log(
    //   songsTitle[0]?.title,
    //   songsArtist[0]?.title,
    //   songsAlbum[0]?.title,
    //   songsIndex[0]?.title,
    //   songsRegex[0]?.title
    // );

    // Removing duplicates
    const filtered = removeDuplicates([
      ...songsTitle,
      ...songsArtist,
      ...songsAlbum,
      ...songsGenre,
      ...songsIndex,
      ...songsRegex,
    ]);
    const all = removeDuplicates([...songsIndex, ...songsRegex]);

    res.status(200).json({ filtered, all });
  } catch (error) {
    res.status(500);

    throw new Error("Server error");
  }
});

// Get a song by ID
const getSongById = asyncHandler(async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

// Update a song by ID
const updateSong = asyncHandler(async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400);

    throw new Error("Invalid song data");
  }
});

// Delete a song by ID
const deleteSong = asyncHandler(async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500);

    throw new Error("Server error");
  }
});

// Get song statistics
const getSongStatistics = asyncHandler(async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const genres = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);
    const artists = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songsCount: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          artist: "$_id",
          songsCount: 1,
          albumsCount: { $size: "$albums" },
        },
      },
    ]);
    const albums = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSongs,
      genres,
      artists,
      albums,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStatistics,
};
