import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../../types/boardsTypes";
import { request } from "../../../utils/requests";

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
      });
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
