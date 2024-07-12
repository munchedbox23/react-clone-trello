import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/services/feature/user/userSlice";
import modalSlice from "@/services/feature/modal/modalSlice";
import boardsSlice from "@/services/feature/boards/boardsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice,
    boards: boardsSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
