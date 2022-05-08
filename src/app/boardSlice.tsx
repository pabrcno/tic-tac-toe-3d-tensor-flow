import { createSlice } from "@reduxjs/toolkit";
import { aIPlayThunk } from "./thunk";

type boardState = {
  board: Array<Array<-1 | 0 | 1>>;
  isIAPlay: boolean;
};

const initialState: boardState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  isIAPlay: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setboard: (state, action) => {
      state.board = action.payload;
    },
    setCell(state, action) {
      if (!state.isIAPlay) {
        const { rowIndex, cellIndex } = action.payload;
        state.board[rowIndex][cellIndex] =
          state.board[rowIndex][cellIndex] === 0 ? 1 : 0;
      }
    },
    setIsIAPlay: (state, action) => {
      state.isIAPlay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(aIPlayThunk.fulfilled, (state, action) => {
      state.board = action.payload;
      state.isIAPlay = false;
    });
  },
});

export const { setboard, setIsIAPlay, setCell } = boardSlice.actions;

export default boardSlice.reducer;
