import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IColumn, ITask } from "../types/boardsTypes";
import { request } from "../../../../shared/lib/requests";
import { IFormBoard } from "../../../../features/createBoardForm/ui/CreateMenu";
import { v4 as uuidv4 } from "uuid";

export type TBoardsSliceState = {
  boards: IBoard[];
  filteredBoards: IBoard[];
  templates: IBoard[];
  isRequestFailed: boolean;
  selectedTask: { task: ITask; boardId: string; columnId: string } | null;
  isRequestLoading: boolean;
};

export const initialState: TBoardsSliceState = {
  boards: [],
  filteredBoards: [],
  templates: [],
  selectedTask: null,
  isRequestLoading: false,
  isRequestFailed: false,
};

export const updateBoard = createAsyncThunk<IBoard, IBoard>(
  "boards/updateBoard",
  async (board) => {
    const response = await request<IBoard>(
      `http://localhost:3001/boards/${board.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(board),
      }
    );
    return response;
  }
);

export const getBoards = createAsyncThunk<IBoard[], undefined>(
  "boards/getBoards",
  async () => {
    const response = await request<IBoard[]>("http://localhost:3001/boards");
    return response;
  }
);

export const getTemplates = createAsyncThunk<IBoard[], undefined>(
  "boards/getTemplates",
  async () => {
    const response = await request<IBoard[]>("http://localhost:3001/templates");
    return response;
  }
);

export const postBoards = createAsyncThunk<IBoard, IFormBoard>(
  "boards/postBoards",
  async (data) => {
    const response = await request<IBoard>("http://localhost:3001/boards", {
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

export const updateColumns = createAsyncThunk<
  IBoard,
  { boardId: string; columns: IColumn[] }
>("boards/updateColumns", async ({ boardId, columns }) => {
  const response = await request<IBoard>(
    `http://localhost:3001/boards/${boardId}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        columns,
      }),
    }
  );
  return response;
});

export const deleteBoard = createAsyncThunk<IBoard, string>(
  "board/deleteBoard",
  async (id) => {
    const response = await request<IBoard>(
      `http://localhost:3001/boards/${id}`,
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
  reducers: {
    filteredBoardsByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.boards = [...state.filteredBoards].filter((board) =>
        board.name.toLowerCase().includes(searchTerm)
      );
    },
    setSelectedTask: (
      state,
      action: PayloadAction<{ task: ITask; boardId: string; columnId: string }>
    ) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.filteredBoards = payload;
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
      })
      .addCase(updateBoard.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        state.boards = state.boards.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(updateBoard.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      })
      .addCase(updateColumns.pending, (state) => {
        state.isRequestLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(updateColumns.fulfilled, (state, { payload }) => {
        state.boards = state.boards.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(updateColumns.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      });
  },
});

export const { filteredBoardsByName, setSelectedTask } = boardsSlice.actions;
export default boardsSlice.reducer;
