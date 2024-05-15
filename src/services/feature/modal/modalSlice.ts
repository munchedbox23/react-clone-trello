import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TModalContent = { content: string; title: string; placeholder: string };

type TModalState = {
  isModalOpen: boolean;
  modalContent: TModalContent | null;
};

const initialState: TModalState = {
  isModalOpen: false,
  modalContent: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<string | undefined>) => {
      state.isModalOpen = !state.isModalOpen;
      if (action?.payload === "create-board") {
        state.modalContent = {
          content: 'create-board',
          title: "Create Board",
          placeholder: "Board Name",
        };
      } else if (action?.payload === "add-column") {
        state.modalContent = {
          content: 'add-column',
          title: "Add Column",
          placeholder: "Column name",
        };
      }
    },
  },
});

export const { setModalOpen } = modalSlice.actions;
export default modalSlice.reducer;