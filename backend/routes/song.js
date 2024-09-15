const express = require("express");
const router = express.Router();
const {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStatistics,
  searchSongToAdd,
  searchSongs,
  getPopularSongs,
  getPopularArtists,
  getPopularAlbums,
  getPopularGenres,
  getMySongs,
} = require("../controllers/song");
const { auth } = require("../middleware/auth");
const { songValidation } = require("../validators/songValidation");

// router.route("/").post(auth, createSong).get(getSongs);
router.route("/").post(auth, songValidation, createSong).get(getSongs);
router.route("/search").get(searchSongs);
router.route("/my-songs").get(auth, getMySongs);
router.route("/search-to-add").get(searchSongToAdd);
router.route("/popular-songs").get(getPopularSongs);
router.route("/popular-artists").get(getPopularArtists);
router.route("/popular-albums").get(getPopularAlbums);
router.route("/popular-genres").get(getPopularGenres);
router
  .route("/:id")
  .get(getSongById)
  .put(auth, updateSong)
  .delete(auth, deleteSong);
router.route("/stastistics").get(getSongStatistics);

module.exports = router;
