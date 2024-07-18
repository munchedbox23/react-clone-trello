import { createSelector } from "reselect";
import { RootState } from "../../../app/appStore";
import { IBoard } from "../../../types/boardsTypes";

const selectBoards = (state: RootState) => state.boards.boards;
const selectUser = (state: RootState) => state.user.user;

export const selectBoardsByUser = createSelector(
  [selectBoards, selectUser],
  (boards, user) => {
    return boards.filter((board: IBoard) => board.user === user?.email);
  }
);
