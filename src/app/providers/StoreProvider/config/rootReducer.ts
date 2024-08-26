import { boardsSlice } from "@/services/feature/boards/boardsSlice";
import modalSlice from "@/services/feature/modal/modalSlice";
import userSlice from "@/services/feature/user/userSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userSlice,
  boards: boardsSlice,
  modal: modalSlice,
});
