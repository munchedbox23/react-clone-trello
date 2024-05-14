import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/user/userSlice";
import boardSlice from "../feature/board/boardSlice";
import modalSlice from "../feature/modal/modalSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
