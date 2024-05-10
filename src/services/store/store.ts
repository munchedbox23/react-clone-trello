import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/user/userSlice";
import boardSlice from "../feature/board/boardSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
