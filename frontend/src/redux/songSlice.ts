import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Song } from "song";

type NewSong = {
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type SongState = {
  songs: { filtered: Song[]; all: Song[] };
  loading: boolean;
  error: string | null;
};

const initialState: SongState = {
  songs: { filtered: [], all: [] },
  loading: true,
  error: null,
};

// Create the slice
const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(
      state: SongState,
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
      state: SongState,
      action: PayloadAction<{ filtered: Song[]; all: Song[] }>
    ) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state: SongState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addSongStart(state: SongState, _action: PayloadAction<NewSong>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state: SongState, action: PayloadAction<Song>) {
      state.songs.all.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state: SongState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateSong(state: SongState, action: PayloadAction<Song>) {
      const index = state.songs.all.findIndex(
        (song: Song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs.all[index] = action.payload;
      }
    },
    deleteSongRequest(state: SongState, action: PayloadAction<string>) {
      // state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state: SongState, action: PayloadAction<string>) {
      state.songs.all = state.songs.all.filter(
        (song: Song) => song._id !== action.payload
      );
      state.songs.filtered = state.songs.filtered.filter(
        (song: Song) => song._id !== action.payload
      );

      // state.loading = false;
      state.error = null;
    },
    deleteSongFailure(state: SongState, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSong,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songSlice.actions;

// Export reducer
export default songSlice.reducer;
