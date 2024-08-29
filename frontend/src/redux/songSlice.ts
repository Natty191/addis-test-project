import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Song = {
  id: string;
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
    fetchSongsStart(state: SongState) {
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
    addSong(state: SongState, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
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
      );
    },
  },
});

// Export actions
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
} = songSlice.actions;

// Export reducer
export default songSlice.reducer;
