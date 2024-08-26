const express = require("express");
const router = express.Router();
const {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
} = require("../controllers/song");
const { getMe } = require("../controllers/user");

router.route("/").post(createSong).get(getSongs);
router.route("/:id").get(getSong).put(updateSong).delete(deleteSong);
router.route("/me").get(getMe);
router.route("/stastistics").get(getSongStatistics);

module.exports = router;
