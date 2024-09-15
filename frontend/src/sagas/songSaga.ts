import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  updateSongRequest,
  deleteSongRequest,
  deleteSongSuccess,
  searchSongToCreateRequst,
  searchSongToCreateSuccess,
  getPopularSongsRequest,
  getPopularSongsSuccess,
  getPopularSongsFailure,
  getPopularAlbumsRequest,
  getPopularAlbumsSuccess,
  getPopularAlbumsFailure,
  getPopularArtistsFailure,
  getPopularArtistsRequest,
  getPopularArtistsSuccess,
  getPopularGenresSuccess,
  getPopularGenresFailure,
  getPopularGenresRequest,
  getMySongsRequest,
  getMySongsFailure,
  getMySongsSuccess,
  updateSongSuccess,
  updateSongFailure,
  NewSong,
} from "../redux/songSlice";
import {
  fetchSongsAPI,
  addSongAPI,
  updateSongAPI,
  deleteSongAPI,
  searchToAddAPI,
  fetchPopularSongs,
  fetchPopularArtists,
  fetchPopularAlbums,
  fetchPopularGenres,
  fetchMySongsAPI,
} from "../utils/api";
import { toast } from "react-toastify";
import axios from "axios";

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

// Worker saga: seaching for a song before creating
function* searchSongToAddSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  const source = axios.CancelToken.source();

  try {
    const response = yield call(searchToAddAPI, action.payload, source);
    yield put(searchSongToCreateSuccess(response.data));
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("request cancelled");
    } else {
      // yield put(searchSongToCreateFailure(error.message));
    }
  }
}

// Worker saga: will be fired on getMySongs action
function* getMySongsSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const response = yield call(fetchMySongsAPI);

    yield put(getMySongsSuccess(response.data.songs));
  } catch (error: any) {
    yield put(getMySongsFailure(error.message));
  }
}

// Worker saga: will be fired on addSong action
function* addSongSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const response = yield call(addSongAPI, action.payload);

    yield put(addSongSuccess(response.data.song));
    toast.success(response.data.message);
  } catch (error: any) {
    // yield put(addSongFailure(error.message));
    toast.error("Failed to add song");
  }
}

// Worker saga: will be fired on getPopularSongs action
function* getPopularSongsSaga(
  action: PayloadAction<{ limit: number; page: number }>
): Generator<any, void, any> {
  try {
    const response = yield call(fetchPopularSongs, {
      limit: action.payload.limit,
      page: action.payload.page,
    });

    yield put(getPopularSongsSuccess(response.data.popularSongs));
  } catch (error: any) {
    yield put(getPopularSongsFailure(error.message));
  }
}

// Worker saga: will be fired on getPopularArtists action
function* getPopularArtistsSaga(
  action: PayloadAction<{ limit: number; page: number }>
): Generator<any, void, any> {
  try {
    const response = yield call(fetchPopularArtists, {
      limit: action.payload.limit,
      page: action.payload.page,
    });

    yield put(getPopularArtistsSuccess(response.data.popularArtists));
  } catch (error: any) {
    yield put(getPopularArtistsFailure(error.message));
  }
}

// Worker saga: will be fired on getPopularAlbums action
function* getPopularAlbumsSaga(
  action: PayloadAction<{ limit: number; page: number }>
): Generator<any, void, any> {
  try {
    const response = yield call(fetchPopularAlbums, {
      limit: action.payload.limit,
      page: action.payload.page,
    });

    yield put(getPopularAlbumsSuccess(response.data.popularAlbums));
  } catch (error: any) {
    yield put(getPopularAlbumsFailure(error.message));
  }
}

// Worker saga: will be fired on getPopularGenres action
function* getPopularGenresSaga(
  action: PayloadAction<{ limit: number; page: number }>
): Generator<any, void, any> {
  try {
    const response = yield call(fetchPopularGenres, {
      limit: action.payload.limit,
      page: action.payload.page,
    });

    yield put(getPopularGenresSuccess(response.data.popularGenres));
  } catch (error: any) {
    yield put(getPopularGenresFailure(error.message));
  }
}

// Worker saga: will be fired on updateSong action
function* updateSongSaga(
  action: PayloadAction<{ song: NewSong; id: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(updateSongAPI, action.payload);

    yield put(updateSongSuccess(response.data.song));
    toast.success("Song Updated Successfully");
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
    toast.error("Failed to update song");
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
    toast.error("Failed to delete song");
  }
}

// Watcher saga
export default function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(searchSongToCreateRequst.type, searchSongToAddSaga);
  yield takeLatest(getMySongsRequest.type, getMySongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(getPopularSongsRequest.type, getPopularSongsSaga);
  yield takeLatest(getPopularArtistsRequest.type, getPopularArtistsSaga);
  yield takeLatest(getPopularAlbumsRequest.type, getPopularAlbumsSaga);
  yield takeLatest(getPopularGenresRequest.type, getPopularGenresSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
