import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/userTypes";
import {
  checkUserAuth,
  editUser,
  userLogin,
  userLogout,
  userRegister,
} from "../../api/userApi";

type TUserState = {
  user: IUser | null;
  isRequestFailed: boolean;
  isRequestLoading: boolean;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isRequestLoading: false,
  isRequestFailed: false,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRequestLoading = false;
        state.isRequestFailed = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isRequestLoading = false;
        state.isRequestFailed = true;
      })
      .addCase(userRegister.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isRequestLoading = false;
        state.isRequestFailed = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isRequestLoading = false;
        state.isRequestFailed = true;
      })
      .addCase(userLogout.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(userLogout.rejected, (state) => {
        state.isRequestFailed = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isRequestFailed = true;
        state.isAuthChecked = true;
        state.isRequestLoading = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
