import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "song";

export type NewSong = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverUrls: string[];
  artistId: string;
  previewAudioUrl: string;
};

export type PopularArtist = {
  count: number;
  totalLikes: number;
  artist: string;
  averageLikes: number;
  artistImage: string;
};

export type PopularAlbum = {
  count: number;
  totalLikes: number;
  album: string;
  averageLikes: number;
  artist: string;
  coverUrls: string[];
};

export type PopularGenre = {
  count: number;
  totalLikes: number;
  genre: string;
  averageLikes: number;
  topSong: { artistImage: string };
};

type SongState = {
  songs: { filtered: Song[]; all: Song[] };
  songsFound: NewSong[];
  mySongs: Song[];
  favorites: Song[];
  loadingFavorites: boolean;
  popularSongs: Song[];
  loadingPopularSongs: boolean;
  popularArtists: PopularArtist[];
  loadingPopularArtists: boolean;
  popularAlbums: PopularAlbum[];
  loadingPopularAlbums: boolean;
  popularGenres: PopularGenre[];
  loadingPopularGenres: boolean;
  loading: boolean;
  loadingAddSong: boolean;
  error: string | null;
  isAddModalOpen: boolean;
  editSong: Song | null;
};

const initialState: SongState = {
  songs: { filtered: [], all: [] },
  songsFound: [],
  mySongs: [],
  favorites: [],
  loadingFavorites: false,
  popularSongs: [],
  loadingPopularSongs: false,
  popularArtists: [],
  loadingPopularArtists: false,
  popularAlbums: [],
  loadingPopularAlbums: false,
  popularGenres: [],
  loadingPopularGenres: false,
  loading: true,
  loadingAddSong: false,
  error: null,
  isAddModalOpen: false,
  editSong: null,
};

// Create the slice
const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(
      state,
      action: PayloadAction<{
        filter: string | undefined;
        sortBy: string;
        query: { filter: string | undefined; value: string };
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(
      state,
      action: PayloadAction<{ filtered: Song[]; all: Song[] }>
    ) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    searchSongToCreateRequst(state, _action: PayloadAction<NewSong>) {
      // state.loading = true;
      state.error = null;
    },
    searchSongToCreateSuccess(state, action: PayloadAction<any[]>) {
      // state.loading = false;
      state.songsFound = action.payload;
    },
    searchSongToCreateFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },

    getFavoritesRequest(state) {
      state.loadingFavorites = true;
      state.error = null;
    },
    getFavoritesSuccess(state, action: PayloadAction<Song[]>) {
      state.loadingFavorites = false;
      state.favorites = action.payload;
    },
    getFavoritesFailure(state, action: PayloadAction<string>) {
      state.loadingFavorites = false;
      state.error = action.payload;
    },
    getMySongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getMySongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.mySongs = action.payload;
    },
    getMySongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state) {
      state.editSong = null;
      state.isAddModalOpen = false;
    },
    addSongStart(state, _action: PayloadAction<NewSong>) {
      state.loadingAddSong = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.loadingAddSong = false;
      state.songs.all.push(action.payload);
      state.isAddModalOpen = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loadingAddSong = false;
      state.error = action.payload;
    },
    // with optional payload
    getPopularSongsRequest(
      state,
      action: PayloadAction<
        | { artist?: string; album?: string; limit?: number; page?: number }
        | undefined
      >
    ) {
      state.loadingPopularSongs = true;
      state.error = null;
    },
    getPopularSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loadingPopularSongs = false;
      state.popularSongs = action.payload;
    },
    getPopularSongsFailure(state, action: PayloadAction<string>) {
      state.loadingPopularSongs = false;
      state.error = action.payload;
    },
    getPopularArtistsRequest(
      state,
      _action: PayloadAction<{ limit: number; page: number }>
    ) {
      state.loadingPopularArtists = true;
      state.error = null;
    },
    getPopularArtistsSuccess(state, action: PayloadAction<PopularArtist[]>) {
      state.loadingPopularArtists = false;
      state.popularArtists = action.payload;
    },
    getPopularArtistsFailure(state, action: PayloadAction<string>) {
      state.loadingPopularArtists = false;
      state.error = action.payload;
    },
    getPopularAlbumsRequest(
      state,
      _action: PayloadAction<{ limit: number; page: number }>
    ) {
      state.loadingPopularAlbums = true;
      state.error = null;
    },
    getPopularAlbumsSuccess(state, action: PayloadAction<PopularAlbum[]>) {
      state.loadingPopularAlbums = false;
      state.popularAlbums = action.payload;
    },
    getPopularAlbumsFailure(state, action: PayloadAction<string>) {
      state.loadingPopularAlbums = false;
      state.error = action.payload;
    },
    getPopularGenresRequest(
      state,
      _action: PayloadAction<{ limit: number; page: number }>
    ) {
      state.loadingPopularGenres = true;
      state.error = null;
    },
    getPopularGenresSuccess(state, action: PayloadAction<PopularGenre[]>) {
      state.loadingPopularGenres = false;
      state.popularGenres = action.payload;
    },
    getPopularGenresFailure(state, action: PayloadAction<string>) {
      state.loadingPopularGenres = false;
      state.error = action.payload;
    },
    setEditSong(state, action: PayloadAction<Song | null>) {
      state.editSong = action.payload;
    },
    updateSongRequest(
      state,
      action: PayloadAction<{ song: NewSong; id: string }>
    ) {
      state.loadingAddSong = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loadingAddSong = false;
      state.isAddModalOpen = false;
      const index = state.mySongs.findIndex(
        (song: Song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.mySongs[index] = action.payload;
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loadingAddSong = false;
      state.error = action.payload;
    },
    deleteSongRequest(state, action: PayloadAction<string>) {
      // state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs.all = state.songs.all.filter(
        (song: Song) => song._id !== action.payload
      );
      state.songs.filtered = state.songs.filtered.filter(
        (song: Song) => song._id !== action.payload
      );
      state.mySongs = state.mySongs.filter(
        (song: Song) => song._id !== action.payload
      );
      // state.loading = false;
      state.error = null;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.loading = false;
      state.error = initialState.error;
      state.songs = initialState.songs;
      state.songsFound = initialState.songsFound;
    },
  },
});

// Export actions
export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  searchSongToCreateRequst,
  searchSongToCreateSuccess,
  searchSongToCreateFailure,
  getFavoritesRequest,
  getFavoritesSuccess,
  getFavoritesFailure,
  getMySongsRequest,
  getMySongsSuccess,
  getMySongsFailure,
  getPopularSongsRequest,
  getPopularSongsSuccess,
  getPopularSongsFailure,
  getPopularArtistsRequest,
  getPopularArtistsSuccess,
  getPopularArtistsFailure,
  getPopularAlbumsRequest,
  getPopularAlbumsSuccess,
  getPopularAlbumsFailure,
  getPopularGenresRequest,
  getPopularGenresSuccess,
  getPopularGenresFailure,
  openAddModal,
  closeAddModal,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  setEditSong,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  reset,
} = songSlice.actions;

// Export reducer
export default songSlice.reducer;
