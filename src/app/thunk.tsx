import { createAsyncThunk } from "@reduxjs/toolkit";
import aIPlay from "./model_util";
import { RootState } from "./store";

export const aIPlayThunk = createAsyncThunk("board/aiPlay", async (_, api) => {
  const state = api.getState() as RootState;
  const result = await aIPlay(state.board.board);
  return result;
});
