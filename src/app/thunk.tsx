import { createAsyncThunk } from "@reduxjs/toolkit";
import aIPlay from "./model_util";
import { RootState } from "./store";

export const aIPlayThunk = createAsyncThunk("table/aiPlay", async (_, api) => {
  const state = api.getState() as RootState;
  const result = await aIPlay(state.table.table);
  // const newTable = await aIPlay();
  return result;
});
