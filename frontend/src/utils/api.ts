import axios, { AxiosResponse } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const fetchSongsAPI = ({
  filter,
  sort,
  query,
}: {
  filter: string;
  sort: string;
  query: { filter: string | undefined; value: string };
}) => axios.get(`${API_BASE_URL}/songs`, { params: { filter, sort, query } });
export const addSongAPI = (song: any) =>
  axios.post(`${API_BASE_URL}/songs`, song);
export const updateSongAPI = (song: any) =>
  axios.put(`${API_BASE_URL}/songs/${song.id}`, song);
export const deleteSongAPI = (id: string) =>
  axios.delete(`${API_BASE_URL}/songs/${id}`);
