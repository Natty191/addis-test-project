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
} = require("../controllers/song");
const { auth } = require("../middleware/auth");

router.route("/").post(auth, createSong).get(getSongs);
router.route("/search").get(auth, searchSongToAdd);
router
  .route("/:id")
  .get(getSongById)
  .put(auth, updateSong)
  .delete(auth, deleteSong);
router.route("/stastistics").get(getSongStatistics);

module.exports = router;
