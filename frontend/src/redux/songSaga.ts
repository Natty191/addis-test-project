import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSong,
  deleteSong,
} from "./songSlice";
import {
  fetchSongsAPI,
  addSongAPI,
  updateSongAPI,
  deleteSongAPI,
} from "../utils/api";

// Worker saga: will be fired on fetchSongs action
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetchSongsAPI);

    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Worker saga: will be fired on addSong action
function* addSongSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const response = yield call(addSongAPI, action.payload);

    yield put(addSongSuccess(response.data)); // Assuming the API returns the added song
  } catch (error: any) {
    yield put(addSongFailure(error.message)); // Reusing error handling
  }
}

// Worker saga: will be fired on updateSong action
function* updateSongSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const response = yield call(updateSongAPI, action.payload);

    yield put(updateSong(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Worker saga: will be fired on deleteSong action
function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteSongAPI, action.payload);

    yield put(deleteSong(action.payload));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Watcher saga
export function* watchSongSagas() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(updateSong.type, updateSongSaga);
  yield takeLatest(deleteSong.type, deleteSongSaga);
}
