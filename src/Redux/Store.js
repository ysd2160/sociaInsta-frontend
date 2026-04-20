import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";

import { persistStore, persistReducer } from "redux-persist";

// 👇 custom storage (fix for getItem error)
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);