import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  boardColumns: [],
  color: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
