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
  deleteSongRequest,
  deleteSongSuccess,
} from "./songSlice";
import {
  fetchSongsAPI,
  addSongAPI,
  updateSongAPI,
  deleteSongAPI,
} from "../utils/api";
import { toast } from "react-toastify";

// Worker saga: will be fired on fetchSongs action
function* fetchSongsSaga(
  action: PayloadAction<{
    filter: string;
    sortBy: string;
    query: { filter: string | undefined; value: string };
  }>
): Generator<any, void, any> {
  try {
    const { query, filter, sortBy } = action.payload;
    const filterBy =
      filter === "all" || !filter ? null : { field: "artist", value: filter };

    const sort = sortBy || "createdAt-desc";

    const response = yield call(() => fetchSongsAPI({ filter, sort, query }));

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

    yield put(deleteSongSuccess(action.payload));
    toast.success("Song Deleted Successfully");
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Watcher saga
export default function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(updateSong.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
