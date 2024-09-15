import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songReducer from "./songSlice";
import authReducer from "./authSlice";
import rootSaga from "../sagas/rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store
const store = configureStore({
  reducer: {
    songs: songReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
