import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./filesSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
