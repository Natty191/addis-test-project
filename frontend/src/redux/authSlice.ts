import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  email: string;
  name: string;
  favoriteSongs: string[];
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  openAuth: string;
  isModalOpen: boolean;
};

// TypeScript types for actions

export type LoginRequestPayload = {
  email: string;
  password: string;
};

export type LoginSuccessPayload = {
  user: User;
};

export type LoginFailurePayload = {
  error: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  openAuth: "login",
  isModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(
      state: AuthState,
      _action: PayloadAction<LoginRequestPayload>
    ) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    signUpRequest(state, action: PayloadAction<LoginRequestPayload>) {
      state.loading = true;
    },
    signUpSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    signUpFailure(state, action: PayloadAction<LoginFailurePayload>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    getUserRequest(state) {
      state.loading = true;
    },
    addFavoriteSongRequest(state, action: PayloadAction<string>) {
      // state.loading = true;
      state.user?.favoriteSongs.push(action.payload);
    },
    removeFavoriteSongRequest(state, action: PayloadAction<string>) {
      // state.loading = true;
      if (state.user) {
        state.user.favoriteSongs = state.user.favoriteSongs.filter(
          (songId) => songId !== action.payload
        );
      }
    },
    addRemoveFavoriteSongSuccess(state, action: PayloadAction<User>) {
      // state.loading = false;
      state.user = action.payload;
    },
    addRemoveFavoriteSongFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    switchAuth(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.openAuth = action.payload;
    },
    openAuthModal(state) {
      state.isModalOpen = true;
    },
    closeAuthModal(state) {
      // state.openAuth = null;
      state.isModalOpen = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  addFavoriteSongRequest,
  removeFavoriteSongRequest,
  addRemoveFavoriteSongSuccess,
  addRemoveFavoriteSongFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  switchAuth,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
