import axios, { CancelTokenSource } from "axios";
import { Song } from "song";
import { NewSong } from "../redux/songSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchSongsAPI = ({
  filter,
  sort,
  query,
}: {
  filter: string;
  sort: string;
  query: { filter: string | undefined; value: string };
}) =>
  axios.get(`${API_BASE_URL}/songs/search`, {
    params: { filter, sort, query },
  });

export const searchToAddAPI = (
  { title, artist, album, genre }: Song,
  CancelToken: CancelTokenSource
) =>
  axios.get(`${API_BASE_URL}/songs/search-to-add`, {
    params: { title, artist, album, genre },
    cancelToken: CancelToken.token,
  });

export const fetchMySongsAPI = () =>
  axios.get(`${API_BASE_URL}/songs/my-songs`, { withCredentials: true });

export const fetchPopularSongs = ({
  artist,
  album,
  limit = 10,
  page = 1,
}: {
  artist?: string;
  album?: string;
  limit: number;
  page: number;
}) =>
  axios.get(`${API_BASE_URL}/songs/popular-songs`, {
    params: { artist, album, limit, page },
  });

export const fetchPopularArtists = ({ limit = 10, page = 1 }) =>
  axios.get(`${API_BASE_URL}/songs/popular-artists`, {
    params: { limit, page },
  });

export const fetchPopularAlbums = ({ limit = 10, page = 1 }) =>
  axios.get(`${API_BASE_URL}/songs/popular-albums`, {
    params: { limit, page },
  });

export const fetchPopularGenres = ({ limit = 10, page = 1 }) =>
  axios.get(`${API_BASE_URL}/songs/popular-genres`, {
    params: { limit, page },
  });

export const addSongAPI = (song: any) =>
  axios.post(`${API_BASE_URL}/songs`, song, { withCredentials: true });

export const updateSongAPI = ({ song, id }: { song: NewSong; id: string }) =>
  axios.put(`${API_BASE_URL}/songs/${id}`, song, {
    withCredentials: true,
  });

export const deleteSongAPI = (id: string) =>
  axios.delete(`${API_BASE_URL}/songs/${id}`, { withCredentials: true });

// User api
export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post(
    `${API_BASE_URL}/user/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const registerUser = (credentials: {
  email: string;
  password: string;
}) => {
  return axios.post(`${API_BASE_URL}/user/signup`, credentials);
};

export const getUser = () => {
  return axios.get(`${API_BASE_URL}/user/me`, { withCredentials: true });
};

export const addFavoriteSongAPI = (songId: string) => {
  return axios.put(`${API_BASE_URL}/songs/add-favorite/${songId}`, null, {
    withCredentials: true,
  });
};

export const removeFavoriteSongAPI = (songId: string) => {
  return axios.put(`${API_BASE_URL}/songs/remove-favorite/${songId}`, null, {
    withCredentials: true,
  });
};

export const fetchFavoritesAPI = () =>
  axios.get(`${API_BASE_URL}/songs/favorites`, { withCredentials: true });

export const logout = () => {
  return axios.post(`${API_BASE_URL}/user/logout`, null, {
    withCredentials: true,
  });
};
