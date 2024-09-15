const axios = require("axios");
const querystring = require("querystring");

let accessToken = null;
let tokenExpiresAt = null;

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  console.log(accessToken, tokenExpiresAt);

  if (accessToken && tokenExpiresAt > Date.now()) {
    console.log("token", accessToken, tokenExpiresAt);

    return accessToken;
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const response = await axios.post(
    tokenUrl,
    querystring.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 10000,
    }
  );

  accessToken = response.data.access_token;
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 5 * 60 * 1000;

  return accessToken;
}

module.exports = { getAccessToken };
