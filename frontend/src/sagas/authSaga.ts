import { call, put, takeLatest } from "redux-saga/effects";
import {
  addFavoriteSongAPI,
  getUser,
  loginUser,
  logout,
  registerUser,
  removeFavoriteSongAPI,
} from "../utils/api";
import {
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
  addRemoveFavoriteSongSuccess,
  addRemoveFavoriteSongFailure,
  addFavoriteSongRequest,
  removeFavoriteSongRequest,
} from "../redux/authSlice";
import songSaga from "./songSaga";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(() => loginUser(action.payload));
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* handleSignUp(
  action: ReturnType<typeof signUpRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(registerUser, action.payload);
    yield put(signUpSuccess({ user: response.data.user }));
  } catch (error: any) {
    yield put(signUpFailure({ error: error.message }));
  }
}

function* handleGetUser(): Generator<any, void, any> {
  try {
    const response = yield call(getUser);
    yield put(getUserSuccess(response.data.user));
  } catch (error: any) {
    yield put(getUserFailure(error.message));
  }
}

function* addFavoriteSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const response = yield call(addFavoriteSongAPI, action.payload);
    put(addRemoveFavoriteSongSuccess(response.data.user));
  } catch (error: any) {
    put(addRemoveFavoriteSongFailure(error.message));
    // Handle error
  }
}

function* removeFavoriteSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const response = yield call(removeFavoriteSongAPI, action.payload);
    put(addRemoveFavoriteSongSuccess(response.data.user));
  } catch (error: any) {
    put(addRemoveFavoriteSongFailure(error.message));
    // Handle error
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(logout);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signUpRequest.type, handleSignUp);
  yield takeLatest(getUserRequest.type, handleGetUser);
  yield takeLatest(addFavoriteSongRequest.type, addFavoriteSaga);
  yield takeLatest(removeFavoriteSongRequest.type, removeFavoriteSaga);
  yield takeLatest(logoutRequest.type, handleLogout);
}

export default authSaga;
