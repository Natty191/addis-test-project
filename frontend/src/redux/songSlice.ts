import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "song";

type NewSong = {
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type SongState = {
  songs: Song[];
  loading: boolean;
  error: string | null;
};

const initialState: SongState = {
  songs: [],
  loading: false,
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
    fetchSongsSuccess(state: SongState, action: PayloadAction<Song[]>) {
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
      state.songs.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state: SongState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateSong(state: SongState, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song: Song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    deleteSong(state: SongState, action: PayloadAction<string>) {
      state.songs = state.songs.filter(
        (song: Song) => song.id !== action.payload
      ) as Song[];
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
  deleteSong,
} = songSlice.actions;

// Export reducer
export default songSlice.reducer;
