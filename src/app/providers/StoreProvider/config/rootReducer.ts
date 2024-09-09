import { combineReducers } from "redux";
import boardsSlice from "../../../../entities/boards/model/slice/boardsSlice";
import userSlice from "../../../../entities/user/model/slice/userSlice";
import modalSlice from "../../../../features/createBoardForm/model/slice/modalSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  boards: boardsSlice,
  modal: modalSlice,
});
