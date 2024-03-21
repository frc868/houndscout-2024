import { Alliance } from "@/lib/enums";
import { Event, Section, Station } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface MainData {
  station?: Station;
  alliance: Alliance;
  blueOnLeft: boolean;
  lastHeartbeat: number;
  activeEvent?: Event;
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

export const getStationData = createAsyncThunk(
  "mainData/getStationData",
  async ({ station }: { station: Station }) => {
    const res = await axios.get(
      `/api/v1/server/stationData/${station.toLowerCase()}`
    );
    const data = res.data;
    return {
      event: data.event,
      matchName: data.match?.name,
      scouter: data.scouter,
      teamNumber: data.match?.[`${station.toLowerCase()}Team`]?.number,
    };
  }
);
export const getActiveEventAsync = createAsyncThunk(
  "mainData/getActiveEvent",
  async () => {
    const res = await axios.get(`/api/v1/server/event`);
    const data = res.data;
    return data.event;
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
  activeEvent: undefined,
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
      .addCase(getStationData.pending, (state) => {
        state.eventStatus = "waiting";
        state.matchStatus = "waiting";
        state.teamNumberStatus = "waiting";
        state.scouterStatus = "waiting";
      })
      .addCase(getStationData.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.activeEvent = action.payload.event;
          state.activeMatchName = action.payload.matchName;
          state.activeTeamNumber = action.payload.teamNumber;
          state.scouter.id = action.payload.scouter.id;
          state.scouter.name = action.payload.scouter.name;
          state.eventStatus = "succeeded";
          state.matchStatus = "succeeded";
          state.teamNumberStatus = "succeeded";
          state.scouterStatus = "succeeded";
        } else {
          state.eventStatus = "idle";
          state.matchStatus = "idle";
          state.teamNumberStatus = "idle";
          state.scouterStatus = "idle";
        }
      })
      .addCase(getStationData.rejected, (state, action) => {
        state.eventStatus = "failed";
        state.matchStatus = "failed";
        state.teamNumberStatus = "failed";
        state.scouterStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getActiveEventAsync.pending, (state) => {
        state.eventStatus = "waiting";
      })
      .addCase(getActiveEventAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.activeEvent = action.payload;
          (state.activeEvent as Event).startDate = new Date(
            action.payload.startDate as string
          );
          (state.activeEvent as Event).endDate = new Date(
            action.payload.endDate as string
          );
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
