import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import { DetailedTeamScore, Ranking } from "@/lib/enums";

export interface ViewerData {
  rankings?: Ranking[];
  rankingsStatus: "idle" | "waiting" | "succeeded" | "failed";
  scores?: DetailedTeamScore[];
  scoresStatus: "idle" | "waiting" | "succeeded" | "failed";
}

export const getRankingsAsync = createAsyncThunk(
  "viewer/getRankingsAsync",
  async ({ eventCode }: { eventCode: string }) => {
    const res = await axios.get(
      `/api/v1/events/${eventCode}/statistics/rankings`
    );
    return res.data.rankings;
  }
);

export const getDetailedTeamScoresAsync = createAsyncThunk(
  "viewer/getDetailedTeamScoresAsync",
  async ({ eventCode }: { eventCode: string }) => {
    const res = await axios.get(
      `/api/v1/events/${eventCode}/statistics/all`
    );
    return res.data.scores;
  }
);

export const updatePicklistsAsync = createAsyncThunk(
  "viewer/updatePicklistsAsync",
  async (
    {
      teamNumber,
      firstPicklist,
      secondPicklist,
    }: {
      teamNumber: number;
      firstPicklist: boolean;
      secondPicklist: boolean;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const res = await axios.patch(
      `/api/v1/teams/${teamNumber}`,
      {
        firstPicklist,
        secondPicklist,
      }
    );
  }
);

export const uploadPitDataOfflineAsync = createAsyncThunk(
  "viewerData/uploadPitDataOfflineAsync",
  async (data: { eventCode: string; stats: string}) => {
    await axios.post(`/api/v1/events/${data.eventCode}/statistics/pit`, {
      stats: data.stats,
    });
  }
);

export const uploadPitDataOnlineAsync = createAsyncThunk(
  "viewerData/uploadPitDataOnlineAsync",
  async (data: { eventCode: string}) => {
    await axios.post(`/api/v1/events/${data.eventCode}/statistics/pit/online`);
  }
);

//This one's fairly simple. Just two thunks that get data to be sent to the viewer page, and twp to update picklists.
const initialState: ViewerData = {
  rankings: undefined,
  rankingsStatus: "idle",
  scores: undefined,
  scoresStatus: "idle",
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
    builder
      .addCase(getDetailedTeamScoresAsync.pending, (state) => {
        state.scoresStatus = "waiting";
      })
      .addCase(getDetailedTeamScoresAsync.fulfilled, (state, action) => {
        state.scores = action.payload;
        if (action.payload !== null) {
          state.scoresStatus = "succeeded";
        } else {
          state.scoresStatus = "idle";
        }
      })
      .addCase(getDetailedTeamScoresAsync.rejected, (state, action) => {
        state.scoresStatus = "failed";
      });
  },
  
});

export default viewerData.reducer;
