import { combineReducers } from "redux";
import boardsSlice from "../../../../services/feature/boards/boardsSlice";
import userSlice from "../../../../services/feature/user/userSlice";
import modalSlice from "../../../../services/feature/modal/modalSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  boards: boardsSlice,
  modal: modalSlice,
});
