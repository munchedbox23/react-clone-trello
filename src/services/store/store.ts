import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/user/userSlice";
import modalSlice from "../feature/modal/modalSlice";
import boardsSlice from "../feature/boards/boardsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    boards: boardsSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
