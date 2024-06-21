import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../../types/boardsTypes";
import { request } from "../../../utils/requests";
import { IFormBoard } from "../../../components/CreateMenu/CreateMenu";
import { v4 as uuidv4 } from "uuid";

export type TBoardsSliceState = {
  boards: IBoard[];
  templates: IBoard[];
  isRequestFailed: boolean;
  isRequestLoading: boolean;
};

export const initialState: TBoardsSliceState = {
  boards: [],
  templates: [],
  isRequestLoading: false,
  isRequestFailed: false,
};

export const getBoards = createAsyncThunk<IBoard[], undefined>(
  "boards/getBoards",
  async () => {
    const response = await request<IBoard[]>("http://localhost:3000/boards");
    return response;
  }
);

export const getTemplates = createAsyncThunk<IBoard[], undefined>(
  "boards/getTemplates",
  async () => {
    const response = await request<IBoard[]>("http://localhost:3000/templates");
    return response;
  }
);

export const postBoards = createAsyncThunk<IBoard, IFormBoard>(
  "boards/postBoards",
  async (data) => {
    const response = await request<IBoard>("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        type: "board",
        ...data,
        columns: [],
      }),
    });
    return response;
  }
);

export const deleteBoard = createAsyncThunk<IBoard, string>(
  "board/deleteBoard",
  async (id) => {
    const response = await request<IBoard>(
      `http://localhost:3000/boards/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  }
);

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.isRequestLoading = false;
        state.isRequestFailed = false;
      })
      .addCase(getBoards.rejected, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(getTemplates.pending, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(getTemplates.fulfilled, (state, { payload }) => {
        state.templates = payload;
        state.isRequestLoading = false;
        state.isRequestFailed = false;
      })
      .addCase(getTemplates.rejected, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(postBoards.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(postBoards.fulfilled, (state, { payload }) => {
        state.boards = [...state.boards, payload];
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(postBoards.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.boards = state.boards.filter((board) => board.id !== payload.id);
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(deleteBoard.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      });
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
