import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { IBoardTemplates, IBoard } from "../../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";
import { IBoardPageState } from "../../../pages/BoardPage/BoardPage";

type TBoardSliceState = {
  boards: IBoard[];
  boardColumns: IBoard[];
  color: string | null;
  isRequestFailed: boolean;
  isRequestLoading: boolean;
  templates: IBoardTemplates[];
};

const initialState: TBoardSliceState = {
  boards: [],
  boardColumns: [],
  templates: [],
  color: null,
  isRequestLoading: false,
  isRequestFailed: false,
};

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

export const deleteColumn = createAsyncThunk<IBoard, string>(
  "board/deleteColumn",
  async (id) => {
    const response = await request<IBoard>(
      `http://localhost:3000/boardColumns/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  }
);

export const postBoards = createAsyncThunk<IBoard, IBoardPageState>(
  "board/postBoards",
  async (data) => {
    const response = await request<IBoard>("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: uuidv4(), type: "board", ...data }),
    });
    return response;
  }
);

export const postColumns = createAsyncThunk<IBoard, IBoardPageState>(
  "board/postColumns",
  async (data) => {
    const response = await request<IBoard>(
      "http://localhost:3000/boardColumns",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: uuidv4(), type: "column", ...data }),
      }
    );
    return response;
  }
);

export const getColumns = createAsyncThunk("board/getColumns", async () => {
  const response = await request<IBoard[]>(
    "http://localhost:3000/boardColumns",
    {
      method: "GET",
    }
  );
  return response;
});

export const getTemplates = createAsyncThunk("board/getTemplates", async () => {
  const response = await request<IBoardTemplates[]>(
    "http://localhost:3000/templates",
    {
      method: "GET",
    }
  );
  return response;
});

export const getBoards = createAsyncThunk("board/getBoards", async () => {
  const response = await request<IBoard[]>("http://localhost:3000/boards", {
    method: "GET",
  });
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
      })
      .addCase(getTemplates.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(getTemplates.fulfilled, (state, { payload }) => {
        state.templates = payload;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(getTemplates.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
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
      .addCase(getBoards.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(getBoards.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      })
      .addCase(postColumns.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(postColumns.fulfilled, (state, { payload }) => {
        state.boardColumns = [...state.boardColumns, payload];
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(postColumns.rejected, (state) => {
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
      .addCase(deleteColumn.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        state.boardColumns = state.boardColumns.filter(
          (column) => column.id !== payload.id
        );
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(deleteColumn.rejected, (state) => {
        state.isRequestFailed = true;
        state.isRequestLoading = false;
      });
  },
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
