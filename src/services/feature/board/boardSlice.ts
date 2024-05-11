import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { IBoardColumn } from "../../../types/boardTypes";

type TBoardSliceState = {
  boards: Array<string>;
  boardColumns: IBoardColumn[];
  color: string | null;
  isRequestFailed: boolean;
  isRequestLoading: boolean;
};

const initialState: TBoardSliceState = {
  boards: [],
  boardColumns: [],
  color: null,
  isRequestLoading: false,
  isRequestFailed: false,
};

export const getColumns = createAsyncThunk("board/getColumns", async () => {
  const response = await request<IBoardColumn[]>(
    "http://localhost:3000/boardColumns",
    {
      method: "GET",
    }
  );
  return response;
});

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(getColumns.fulfilled, (state, { payload }) => {
        state.boardColumns = payload;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(getColumns.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      });
  },
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
