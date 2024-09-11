import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../utils/api";
import { get } from "http";

export type User = {
  _id: string;
  email: string;
  name: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  openAuth: string | null;
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
  openAuth: null,
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
    openAuthModal(state, action: PayloadAction<string | null>) {
      state.openAuth = action.payload;
    },
    closeAuthModal(state) {
      state.openAuth = null;
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
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
