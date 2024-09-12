const asyncHandler = require("express-async-handler");
const querystring = require("querystring");
const axios = require("axios");
const Song = require("../models/song");
const { removeDuplicates } = require("../utils/removeDuplicates");
const { getAccessToken } = require("../utils/getSpotifyAccessToke");

// Create a new song
const createSong = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Validation failed");
  }

  const { title, artist, album, genre } = req.body;

  const newSong = new Song({
    title,
    artist,
    album,
    genre,
  });

  await newSong.save();
  res.status(201).json({ message: "Song created successfully", song: newSong });
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

// search Song using spotify api
const searchSongToAdd = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.query;
  if (!title && !artist && !album && !genre)
    throw new Error("Validation Error");

  const token = await getAccessToken();
  const query = querystring.stringify({
    // q: `title:${title} artist:${artist} album:${album} genre:${genre}`,
    q:
      (title ? `track:${title}` : "") +
      (artist ? ` artist:${artist}` : "") +
      (album ? ` album:${album}` : "") +
      (genre ? ` genre:${genre}` : ""),
    type: "track",
    limit: 4,
  });

  console.log(query);

  const url = `https://api.spotify.com/v1/search?${query}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const songs = [
  //   {
  //     album: {
  //       album_type: "album | single",
  //       images: [{ url: "url" }],
  //       name: "album title",
  //     },
  //     artists: [{ name: "artist name", id: "spotify id" }],
  //     name: "track title",
  //     preview_url: "url to preview audio",
  //   },
  // ];

  const songsFound = response.data.tracks.items.map((item) => ({
    album: item.album_type === "single" ? "Single" : item.album.name,
    artist: item.artists.map((artist) => artist.name).join(", "),
    title: item.name,
    genre: "",
    coverUrls: item.album.images.map((image) => image.url),
    artistId: item.artists[0].id,
  }));

  // res.json(response.data.tracks.items);
  res.json(songsFound);
});

// Get a song by ID
const getSongById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  res.status(200).json(song);
});

// Update a song by ID
const updateSong = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, artist, album, genre } = req.body;

  const song = await Song.findById(id);
  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  if (title) song.title = title;
  if (artist) song.artist = artist;
  if (album) song.album = album;
  if (genre) song.genre = genre;

  await song.save();
  res.status(200).json({ message: "Song updated successfully", song });
});

// Delete a song by ID
const deleteSong = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByIdAndDelete(id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  res.status(200).json({ message: "Song deleted successfully" });
});

// Get song statistics
const getSongStatistics = asyncHandler(async (req, res) => {
  const totalSongs = await Song.countDocuments();
  const totalArtists = await Song.distinct("artist").countDocuments();
  const totalAlbums = await Song.distinct("album").countDocuments();
  const totalGenres = await Song.distinct("genre").countDocuments();

  const songsByGenre = await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
    { $project: { genre: "$_id", count: 1, _id: 0 } },
  ]);

  const songsByArtist = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        count: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        artist: "$_id",
        count: 1,
        albums: { $size: "$albums" },
        _id: 0,
      },
    },
  ]);

  const songsByAlbum = await Song.aggregate([
    { $group: { _id: "$album", count: { $sum: 1 } } },
    { $project: { album: "$_id", count: 1, _id: 0 } },
  ]);

  res.status(200).json({
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsByGenre,
    songsByArtist,
    songsByAlbum,
  });
});

module.exports = {
  createSong,
  getSongs,
  searchSongToAdd,
  getSongById,
  updateSong,
  deleteSong,
  getSongStatistics,
};
