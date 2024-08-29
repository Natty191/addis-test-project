import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchSongsAPI = () => axios.get(`${API_BASE_URL}/songs`);
export const addSongAPI = (song: any) =>
  axios.post(`${API_BASE_URL}/songs`, song);
export const updateSongAPI = (song: any) =>
  axios.put(`${API_BASE_URL}/songs/${song.id}`, song);
export const deleteSongAPI = (id: string) =>
  axios.delete(`${API_BASE_URL}/songs/${id}`);
