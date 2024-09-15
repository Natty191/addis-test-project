import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import songSaga from "./songSaga";

export default function* rootSaga() {
  yield all([authSaga(), songSaga()]);
}
