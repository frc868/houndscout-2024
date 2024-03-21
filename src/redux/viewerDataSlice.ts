import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import { Ranking } from "@/lib/enums";

export interface ViewerData {
  rankings: Ranking[];
  rankingsStatus: "idle" | "waiting" | "succeeded" | "failed";
}

export const getRankingsAsync = createAsyncThunk(
  "viewer/getRankingsAsync",
  async (_, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.get(
      `/api/v1/events/${mainData.activeEvent?.code}/statistics/rankings`
    );
    return res.data;
  }
);
const initialState: ViewerData = {
  rankings: [],
  rankingsStatus: "idle",
};

export const viewerData = createSlice({
  name: "viewerData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRankingsAsync.pending, (state) => {
        state.rankingsStatus = "waiting";
      })
      .addCase(getRankingsAsync.fulfilled, (state, action) => {
        state.rankings = action.payload;
        if (action.payload !== null) {
          state.rankingsStatus = "succeeded";
        } else {
          state.rankingsStatus = "idle";
        }
      })
      .addCase(getRankingsAsync.rejected, (state, action) => {
        state.rankingsStatus = "failed";
      });
  },
});

export default viewerData.reducer;
