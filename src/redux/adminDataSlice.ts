import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Match {
  name: string;
  number: number;
  red1TeamNumber: number;
  red2TeamNumber: number;
  red3TeamNumber: number;
  blue1TeamNumber: number;
  blue2TeamNumber: number;
  blue3TeamNumber: number;
  red1Scouter?: Scouter;
  red2Scouter?: Scouter;
  red3Scouter?: Scouter;
  blue1Scouter?: Scouter;
  blue2Scouter?: Scouter;
  blue3Scouter?: Scouter;
}

export interface Scouter {
  id: number;
  name: string;
}

export interface HeartbeatData {
  lastRed1Heartbeat: Date;
  lastRed2Heartbeat: Date;
  lastRed3Heartbeat: Date;
  lastBlue1Heartbeat: Date;
  lastBlue2Heartbeat: Date;
  lastBlue3Heartbeat: Date;
}

export interface AdminData {
  matches?: Match[];
  scouters?: Scouter[];
  matchesStatus: "idle" | "waiting" | "succeeded" | "failed";
  scoutersStatus: "idle" | "waiting" | "succeeded" | "failed";
  error?: string;
  heartbeats: HeartbeatData;
}

export const getMatchesAsync = createAsyncThunk(
  "adminData/getActiveTeamNumber",
  async ({ eventCode }: { eventCode: string }) => {
    const res = await axios.get(`/api/v1/events/${eventCode}/matches`);
    const data = res.data;
    return data.matches;
  }
);

export const setActiveMatchAsync = createAsyncThunk(
  "adminData/setActiveMatch",
  async ({
    eventCode,
    matchName,
  }: {
    eventCode: string;
    matchName: string;
  }) => {
    await axios.post(`/api/v1/server/match`, {
      key: `${eventCode}_${matchName}`,
    });
  }
);

export const getScoutersAsync = createAsyncThunk(
  "adminData/getScoutersAsync",
  async () => {
    const res = await axios.get("/api/v1/scouters");
    return res.data.scouters;
  }
);
export const getHeartbeatsAsync = createAsyncThunk(
  "adminData/getHeartbeats",
  async () => {
    const res = await axios.get("/api/v1/heartbeat");
    return res.data;
  }
);

export const setMatchScouterAsync = createAsyncThunk(
  "adminData/setMatchScouter",
  async ({
    eventCode,
    matchName,
    station,
    scouterId,
  }: {
    eventCode: string;
    matchName: string;
    station: string;
    scouterId: number;
  }) => {
    await axios.post(
      `/api/v1/events/${eventCode}/matches/${matchName}/scouters/${station}`,
      {
        id: scouterId,
      }
    );
  }
);

const initialState: AdminData = {
  matches: undefined,
  matchesStatus: "idle",
  scouters: undefined,
  scoutersStatus: "idle",
  error: undefined,
  heartbeats: {
    lastRed1Heartbeat: new Date(),
    lastRed2Heartbeat: new Date(),
    lastRed3Heartbeat: new Date(),
    lastBlue1Heartbeat: new Date(),
    lastBlue2Heartbeat: new Date(),
    lastBlue3Heartbeat: new Date(),
  },
};

export const mainData = createSlice({
  name: "mainData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchesAsync.pending, (state) => {
        state.matchesStatus = "waiting";
      })
      .addCase(getMatchesAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.matches = action.payload.map(
            (item: {
              name: string;
              number: number;
              red1Team: { number: number };
              red2Team: { number: number };
              red3Team: { number: number };
              blue1Team: { number: number };
              blue2Team: { number: number };
              blue3Team: { number: number };
              red1TeamScore: { scouter: Scouter };
              red2TeamScore: { scouter: Scouter };
              red3TeamScore: { scouter: Scouter };
              blue1TeamScore: { scouter: Scouter };
              blue2TeamScore: { scouter: Scouter };
              blue3TeamScore: { scouter: Scouter };
            }) => {
              return {
                name: item.name,
                number: item.number,
                red1TeamNumber: item.red1Team.number,
                red2TeamNumber: item.red2Team.number,
                red3TeamNumber: item.red3Team.number,
                blue1TeamNumber: item.blue1Team.number,
                blue2TeamNumber: item.blue2Team.number,
                blue3TeamNumber: item.blue3Team.number,
                red1Scouter: item.red1TeamScore.scouter,
                red2Scouter: item.red2TeamScore.scouter,
                red3Scouter: item.red3TeamScore.scouter,
                blue1Scouter: item.blue1TeamScore.scouter,
                blue2Scouter: item.blue2TeamScore.scouter,
                blue3Scouter: item.blue3TeamScore.scouter,
              };
            }
          );
          state.matches?.sort((a, b) => a.number - b.number);

          state.matchesStatus = "succeeded";
        } else {
          state.matchesStatus = "idle";
        }
      })
      .addCase(getMatchesAsync.rejected, (state, action) => {
        state.matchesStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getScoutersAsync.pending, (state) => {
        state.scoutersStatus = "waiting";
      })
      .addCase(getScoutersAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.scouters = action.payload;
          state.scouters?.sort((a, b) => a.id - b.id);

          state.scoutersStatus = "succeeded";
        } else {
          state.scoutersStatus = "idle";
        }
      })
      .addCase(getScoutersAsync.rejected, (state, action) => {
        state.scoutersStatus = "failed";
        state.error = action.error.message || "";
      });
    builder.addCase(getHeartbeatsAsync.fulfilled, (state, action) => {
      if (action.payload !== null) {
        console.log(action.payload);
        state.heartbeats.lastRed1Heartbeat = new Date(
          action.payload.lastRed1Heartbeat
        );
        state.heartbeats.lastRed2Heartbeat = new Date(
          action.payload.lastRed2Heartbeat
        );
        state.heartbeats.lastRed3Heartbeat = new Date(
          action.payload.lastRed3Heartbeat
        );
        state.heartbeats.lastBlue1Heartbeat = new Date(
          action.payload.lastBlue1Heartbeat
        );
        state.heartbeats.lastBlue2Heartbeat = new Date(
          action.payload.lastBlue2Heartbeat
        );
        state.heartbeats.lastBlue3Heartbeat = new Date(
          action.payload.lastBlue3Heartbeat
        );
      }
    });
  },
});

export const {} = mainData.actions;
export default mainData.reducer;
