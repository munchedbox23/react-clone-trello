import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/userTypes";

type TUserState = {
  user: IUser | null;
  requestFailed: boolean;
  requestLoading: boolean;
};

const initialState: TUserState = {
  user: null,
  requestLoading: false,
  requestFailed: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
