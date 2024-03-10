import { Alliance } from "@/lib/enums";
import { Section, Station } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface MainData {
  station?: Station;
  alliance: Alliance;
  blueOnLeft: boolean;
  lastHeartbeat: number;
  activeEventCode?: string;
  activeMatchName?: string;
  activeTeamNumber?: number;
  scouter: {
    name?: string;
    id?: number;
  };
  eventStatus: "idle" | "waiting" | "succeeded" | "failed";
  matchStatus: "idle" | "waiting" | "succeeded" | "failed";
  teamNumberStatus: "idle" | "waiting" | "succeeded" | "failed";
  scouterStatus: "idle" | "waiting" | "succeeded" | "failed";
  error?: string;
}

export const getActiveEventAsync = createAsyncThunk(
  "mainData/getActiveEvent",
  async () => {
    const res = await axios.get(`/api/v1/server/event`);
    const data = res.data;
    return data.event?.code;
  }
);

export const getActiveMatchAsync = createAsyncThunk(
  "mainData/getActiveMatch",
  async () => {
    const res = await axios.get(`/api/v1/server/match`);
    const data = res.data;
    return data.match?.name;
  }
);

export const getActiveTeamNumberAsync = createAsyncThunk(
  "mainData/getActiveTeamNumber",
  async ({
    eventCode,
    matchName,
    station,
  }: {
    eventCode: string;
    matchName: string;
    station: string;
  }) => {
    const res = await axios.get(
      `/api/v1/events/${eventCode}/matches/${matchName}`
    );
    const data = res.data;
    return data.match?.[`${station.toLowerCase()}Team`]?.number;
  }
);

export const getScouterAsync = createAsyncThunk(
  "mainData/getScouter",
  async ({
    eventCode,
    matchName,
    station,
  }: {
    eventCode: string;
    matchName: string;
    station: string;
  }) => {
    const res = await axios.get(
      `/api/v1/events/${eventCode}/matches/${matchName}/scouters/${station.toLowerCase()}`
    );
    const data = res.data;
    return data.scouter;
  }
);
export const sendHeartbeatAsync = createAsyncThunk(
  "mainData/sendHeartbeatAsync",
  async ({ station, section }: { station: Station; section: Section }) => {
    await axios.post(`/api/v1/heartbeat/${station.toLowerCase()}`, { section });
  }
);

const initialState: MainData = {
  station: undefined,
  alliance: Alliance.BLUE,
  blueOnLeft: true,
  lastHeartbeat: 0,
  activeEventCode: undefined,
  activeMatchName: undefined,
  activeTeamNumber: undefined,
  scouter: {
    name: undefined,
    id: undefined,
  },
  eventStatus: "idle",
  matchStatus: "idle",
  teamNumberStatus: "idle",
  scouterStatus: "idle",
  error: undefined,
};

export const mainData = createSlice({
  name: "mainData",
  initialState: initialState,
  reducers: {
    setStation: (
      state,
      action: PayloadAction<{
        station: Station;
      }>
    ) => {
      state.station = action.payload.station;
      state.alliance = action.payload.station.includes("RED")
        ? Alliance.RED
        : Alliance.BLUE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveEventAsync.pending, (state) => {
        state.eventStatus = "waiting";
      })
      .addCase(getActiveEventAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.activeEventCode = action.payload;
          state.eventStatus = "succeeded";
        } else {
          state.eventStatus = "idle";
        }
      })
      .addCase(getActiveEventAsync.rejected, (state, action) => {
        state.eventStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getActiveMatchAsync.pending, (state) => {
        state.matchStatus = "waiting";
      })
      .addCase(getActiveMatchAsync.fulfilled, (state, action) => {
        state.activeMatchName = action.payload;
        if (action.payload !== null) {
          state.matchStatus = "succeeded";
        } else {
          state.matchStatus = "idle";
        }
      })
      .addCase(getActiveMatchAsync.rejected, (state, action) => {
        state.matchStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getActiveTeamNumberAsync.pending, (state) => {
        state.teamNumberStatus = "waiting";
      })
      .addCase(getActiveTeamNumberAsync.fulfilled, (state, action) => {
        state.activeTeamNumber = action.payload;
        if (action.payload !== null) {
          state.teamNumberStatus = "succeeded";
        } else {
          state.teamNumberStatus = "idle";
        }
      })
      .addCase(getActiveTeamNumberAsync.rejected, (state, action) => {
        state.teamNumberStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getScouterAsync.pending, (state) => {
        state.scouterStatus = "waiting";
      })
      .addCase(getScouterAsync.fulfilled, (state, action) => {
        state.scouter.name = action.payload?.name;
        state.scouter.id = action.payload?.id;
        if (action.payload !== null) {
          state.scouterStatus = "succeeded";
        } else {
          state.scouterStatus = "idle";
        }
      })
      .addCase(getScouterAsync.rejected, (state, action) => {
        state.scouterStatus = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { setStation } = mainData.actions;
export default mainData.reducer;
