import { configureStore } from "@reduxjs/toolkit";
import networksReducer from "./networksSlice";
import filesReducer from "./filesSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    networks: networksReducer,
    files: filesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
