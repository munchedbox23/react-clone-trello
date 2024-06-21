import { createSelector } from "reselect";
import { RootState } from "../../store/store";

const selectBoards = (state: RootState) => state.boards.boards;
const selectUser = (state: RootState) => state.user.user;

export const selectBoardsByUser = createSelector(
  [selectBoards, selectUser],
  (boards, user) => {
    return boards.filter((board) => board.user === user?.email);
  }
);
