import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../../shared/lib/requests";
import { IPhoto } from "../../../../entities/boards/model/types/boardsTypes";

type TModalContent = { content: string; title: string; placeholder: string };

type TModalState = {
  isModalOpen: boolean;
  optionsLoading: boolean;
  modalContent: TModalContent | null;
  backgroundOptions: Array<{
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  }> | null;
};

const initialState: TModalState = {
  isModalOpen: false,
  modalContent: null,
  optionsLoading: false,
  backgroundOptions: null,
};

export const getBackgroundOptions = createAsyncThunk(
  "modal/getBackgroundOptions",
  async () => {
    const response = await request<IPhoto[]>(
      "http://localhost:3001/backgroundOptions"
    );
    return response;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<string | undefined>) => {
      state.isModalOpen = !state.isModalOpen;
      if (action?.payload === "create-board") {
        state.modalContent = {
          content: "create-board",
          title: "Create Board",
          placeholder: "Board Name",
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBackgroundOptions.pending, (state) => {
        state.optionsLoading = true;
      })
      .addCase(getBackgroundOptions.fulfilled, (state, { payload }) => {
        state.backgroundOptions = payload.map((item: IPhoto) => item.urls);
        state.optionsLoading = false;
      });
  },
});

export const { setModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
