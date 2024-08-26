import Song from "../models/songModel.js";

// Create a new song
export const createSong = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;

    const song = await Song.create({
      title,
      artist,
      album,
      genre,
    });

    res.status(201).json({ success: true, song });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid song data");
  }
};

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json(songs);
  } catch (error) {
    res.status(500);

    throw new Error("Server error");
  }
};

// Get a song by ID
export const getSongById = async (req, res) => {
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
};

// Update a song by ID
export const updateSong = async (req, res) => {
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
};

// Delete a song by ID
export const deleteSong = async (req, res) => {
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
};

// Get song statistics
export const getSongStatistics = async (req, res) => {
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
};
