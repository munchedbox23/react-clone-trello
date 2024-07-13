import { combineReducers } from "redux";
import modalSlice from "@/services/feature/modal/modalSlice";
import userSlice from "@/services/feature/user/userSlice";
import boardsSlice from "@/services/feature/boards/boardsSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  boards: boardsSlice,
  modal: modalSlice,
});
