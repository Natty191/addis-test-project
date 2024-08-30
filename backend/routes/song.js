const express = require("express");
const router = express.Router();
const {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStatistics,
} = require("../controllers/song");
const { getMe } = require("../controllers/user");

router.route("/").post(createSong).get(getSongs);
router.route("/:id").get(getSongById).put(updateSong).delete(deleteSong);
router.route("/me").get(getMe);
router.route("/stastistics").get(getSongStatistics);

module.exports = router;
