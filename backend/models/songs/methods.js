const { getAccessToken } = require("../../utils/getSpotifyAccessToke");
const axios = require("axios");

async function createSong() {
  const { title, artist, album, year, genre, userId, artistId } = this;

  if (artistId) {
    const token = await getAccessToken();

    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (genre === "") {
      genre = response.data.genres[0];
    }

    artistImage = response.data.images[1]?.url ?? coverUrls[1];
  }

  const song = await this.save();
  return song;
}

module.exports = { createSong };
