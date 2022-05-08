import { createSlice } from "@reduxjs/toolkit";
import { aIPlayThunk } from "./thunk";

type tableState = {
  table: Array<Array<-1 | 0 | 1>>;
  isIAPlay: boolean;
};

const initialState: tableState = {
  table: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  isIAPlay: false,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
    },
    setCell(state, action) {
      if (!state.isIAPlay) {
        const { rowIndex, cellIndex } = action.payload;
        state.table[rowIndex][cellIndex] =
          state.table[rowIndex][cellIndex] === 0 ? 1 : 0;
      }
    },
    setIsIAPlay: (state, action) => {
      state.isIAPlay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(aIPlayThunk.fulfilled, (state, action) => {
      state.table = action.payload;
      state.isIAPlay = false;
    });
  },
});

export const { setTable, setIsIAPlay, setCell } = tableSlice.actions;

export default tableSlice.reducer;
