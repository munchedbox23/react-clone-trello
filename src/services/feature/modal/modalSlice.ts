import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { IPhoto } from "../../../types/boardsTypes";

type TModalContent = { content: string; title: string; placeholder: string };

type TModalState = {
  isModalOpen: boolean;
  optionsLoading: boolean;
  modalContent: TModalContent | null;
  backgroundOptions: Array<string>;
};

const initialState: TModalState = {
  isModalOpen: false,
  modalContent: null,
  optionsLoading: false,
  backgroundOptions: [],
};

export const getBackgroundOptions = createAsyncThunk(
  "modal/getBackgroundOptions",
  async () => {
    const response = await request<IPhoto[]>(
      "http://localhost:3000/backgroundOptions"
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
      } else if (action?.payload === "add-column") {
        state.modalContent = {
          content: "add-column",
          title: "Add Column",
          placeholder: "Column name",
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
        state.backgroundOptions = payload.map(
          (item: IPhoto) => item.urls.full
        );
        state.optionsLoading = false;
      });
  },
});

export const { setModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
