const asyncHandler = require("express-async-handler");
const querystring = require("querystring");
const axios = require("axios");
const Song = require("../models/songs/index");
const User = require("../models/users/index");
const { removeDuplicates } = require("../utils/removeDuplicates");
const { getAccessToken } = require("../utils/getSpotifyAccessToke");
const { validationResult } = require("express-validator");

// Create a new song
const createSong = asyncHandler(async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400);
  //   throw new Error(errors.array()[0].msg);
  // }

  const { title, artist, album, genre, coverUrls, artistId, preview_url } =
    req.body;

  const newSong = new Song({
    title,
    artist,
    album,
    genre: genre ? undefined : genre,
    coverUrls,
    artistImage: coverUrls[0],
    previewAudioUrl: preview_url ?? "",
    creator: req.user._id,
    artistId,
  });

  const song = await newSong.createSong();

  // if (newSong.artistId) {
  //   const token = await getAccessToken();

  //   const url = `https://api.spotify.com/v1/artists/${artistId}`;

  //   const response = await axios.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (newSong.genre === "") {
  //     newSong.genre = response.data.genres[0];
  //   }

  //   newSong.artistImage = response.data.images[1]?.url ?? coverUrls[1];
  // }

  // await newSong.save();
  res.status(201).json({ message: "Song created successfully", song });
});

// get all songs
const getSongs = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const songs = await Song.find()
    .limit(limit)
    .skip(page * limit);

  res.status(200).json({ songs });
});

// add remove favorites
const addFavorite = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  const user = req.user;
  const song = await Song.findByIdAndUpdate(req.params.songId, {
    $inc: { likes: 1 },
  });
  if (!song) {
    throw new Error("Song not found");
  }

  user.favoriteSongs.push(req.params.songId);
  const updatedUser = await user.save();
  return res.status(200).json({ message: "Favorite added", user: updatedUser });
});

const removeFavorite = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  const user = req.user;
  const song = await Song.findByIdAndUpdate(req.params.songId, {
    $inc: { likes: -1 },
  });
  user.favoriteSongs = user.favoriteSongs.filter(
    (favorite) => favorite.toString() !== req.params.songId
  );
  const updatedUser = await user.save();
  return res
    .status(200)
    .json({ message: "Favorite removed", user: updatedUser });
});

// get favorite songs
const getFavorites = asyncHandler(async (req, res) => {
  const { favoriteSongs: favIds } = await User.findById(req.user._id).select(
    "favoriteSongs"
  );
  const favoriteSongs = await Song.find({ _id: { $in: favIds } });

  res.json({ favoriteSongs });
});

// get my songs
const getMySongs = asyncHandler(async (req, res) => {
  const songs = await Song.find({ creator: req.user._id.toString() });

  res.status(200).json({ songs });
});

// popular Songs
const getPopularSongs = asyncHandler(async (req, res) => {
  const { artist, album, genre } = req.query;
  if (artist) {
    const popularSongs = await Song.find({ artist })
      .sort({ likes: -1 })
      .limit(10);
    return res.json({ popularSongs });
  }
  if (album) {
    const popularSongs = await Song.find({ album })
      .sort({ likes: -1 })
      .limit(10);
    return res.json({ popularSongs });
  }
  if (genre) {
    const popularSongs = await Song.find({ genre })
      .sort({ likes: -1 })
      .limit(10);
    return res.json({ popularSongs });
  }

  const popularSongs = await Song.find().sort({ likes: -1 }).limit(10);

  res.json({ popularSongs });
});

// include total likes, one of artistImage
const getPopularArtists = asyncHandler(async (req, res) => {
  const popularArtists = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songsCount: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        artistImage: { $first: "$artistImage" }, // get the first artistImage
      },
    },
    {
      $project: {
        artist: "$_id",
        songsCount: 1,
        totalLikes: 1,
        averageLikes: { $divide: ["$totalLikes", "$songsCount"] },
        artistImage: 1,
        _id: 0,
      },
    },
    {
      $sort: { averageLikes: -1, songsCount: -1 },
    },
    { $limit: 10 },
  ]);

  res.json({ popularArtists });
});

// popular Albums
const getPopularAlbums = asyncHandler(async (req, res) => {
  const popularAlbums = await Song.aggregate([
    {
      $group: {
        _id: "$album",
        tracksCount: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        coverUrls: { $first: "$coverUrls" },
        artist: { $first: "$artist" },
      },
    },
    {
      $project: {
        album: "$_id",
        tracksCount: 1,
        totalLikes: 1,
        averageLikes: { $divide: ["$totalLikes", "$tracksCount"] },
        coverUrls: 1,
        artist: 1,
        _id: 0,
      },
    },
    {
      $sort: { averageLikes: -1, tracksCount: -1 },
    },
    { $limit: 10 },
  ]);

  res.json({ popularAlbums });
});

// popular Genres
const getPopularGenres = asyncHandler(async (req, res) => {
  const popularGenres = await Song.aggregate([
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        // get artistImage of the  song with the most likes
        topSong: {
          $push: {
            artistImage: "$artistImage",
            likes: "$likes",
          },
        },
      },
    },

    {
      // Sort the songs by likes in descending order
      $addFields: {
        topSong: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$topSong",
                cond: { $eq: ["$$this.likes", { $max: "$topSong.likes" }] },
              },
            },
            0,
          ],
        },
      },
    },

    {
      $project: {
        genre: "$_id",
        count: 1,
        totalLikes: 1,
        averageLikes: { $divide: ["$totalLikes", "$count"] },
        "topSong.artistImage": 1,
        _id: 0,
      },
    },
    {
      $sort: { averageLikes: -1, count: -1 },
    },
    { $limit: 10 },
  ]);

  res.json({ popularGenres });
});

//  Search songs
const searchSongs = asyncHandler(async (req, res) => {
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
});

// search Song using spotify api
const searchSongToAdd = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.query;
  if (!title && !artist && !album && !genre)
    throw new Error("Validation Error");

  const token = await getAccessToken();

  if (!token) {
    throw new Error("Failed to retrieve access token");
  }

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
    previewAudioUrl: item.preview_url,
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

  const song = await Song.findOne({ _id: id, creator: req.user._id });
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

  const song = await Song.findOneAndDelete({ _id: id, creator: req.user._id });

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
  addFavorite,
  removeFavorite,
  getFavorites,
  searchSongs,
  getMySongs,
  getPopularSongs,
  getPopularArtists,
  getPopularAlbums,
  getPopularGenres,
  searchSongToAdd,
  getSongById,
  updateSong,
  deleteSong,
  getSongStatistics,
};
