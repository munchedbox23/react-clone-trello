import { combineReducers } from "redux";
import boardsSlice from "../../../../services/feature/boards/boardsSlice";
import modalSlice from "../../../../services/feature/modal/modalSlice";
import userSlice from "../../../../entities/user/model/slice/userSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  boards: boardsSlice,
  modal: modalSlice,
});
