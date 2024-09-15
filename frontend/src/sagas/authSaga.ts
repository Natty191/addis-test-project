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
  addFavoriteSongRequest,
  removeFavoriteSongRequest,
  addFavoriteSongFailure,
  removeFavoriteSongFailure,
  openAuthModal,
  closeAuthModal,
} from "../redux/authSlice";
import songSaga from "./songSaga";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(() => loginUser(action.payload));
    yield put(loginSuccess(response.data.user));
    yield put(closeAuthModal());
    toast.success("Logged in Successfully");
  } catch (error: any) {
    yield put(loginFailure(error.message));
    toast.error(error.response.data.message);
  }
}

function* handleSignUp(
  action: ReturnType<typeof signUpRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(registerUser, action.payload);
    yield put(signUpSuccess({ user: response.data.user }));
    yield put(closeAuthModal());
    toast.success("Signed up successfully");
  } catch (error: any) {
    yield put(signUpFailure({ error: error.message }));
    toast.error(error.response.data.message);
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
    yield put(addRemoveFavoriteSongSuccess(response.data.user));
    toast.success("Added to favorites", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  } catch (error: any) {
    yield put(addFavoriteSongFailure(action.payload));
    toast.error("Could not add to favorites");
    // Handle error
  }
}

function* removeFavoriteSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const response = yield call(removeFavoriteSongAPI, action.payload);
    yield put(addRemoveFavoriteSongSuccess(response.data.user));
    toast.success("Removed from favorites", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  } catch (error: any) {
    yield put(removeFavoriteSongFailure(action.payload));
    toast.error("Could not remove from favorites");
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
