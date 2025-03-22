import { Alliance } from "@/lib/enums";
import { Event, Section, Station } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Console } from "console";

export interface MainData {
  station?: Station;
  alliance: Alliance;
  submitted: boolean;
  blueOnLeft: boolean;
  blueOnLeftStatus: "idle" | "waiting" | "succeeded" | "failed";
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

export const sendHeartbeatAsync = createAsyncThunk(
  "mainData/sendHeartbeatAsync",
  async ({ station, section }: { station: Station; section: Section }) => {
    await axios.post(`/api/v1/heartbeat/${station.toLowerCase()}`, { section });
  }
);
export const getStationData = createAsyncThunk(
  "mainData/getStationData",
  async ({ station }: { station: Station }) => {
    const res = await axios.get(
      `/api/v1/server/stationData/${station.toLowerCase()}`
    );
    return {
      blueOnLeft: res.data.blueOnLeft,
      event: res.data.event,
      matchName: res.data.match?.name,
      scouter: res.data.scouter,
      submitted: res.data.submitted,
      teamNumber: res.data.match?.[`${station.toLowerCase()}Team`]?.number,
    };
  }
);

export const getBlueOnLeftAsync = createAsyncThunk(
  "mainData/getBlueOnLeft",
  async () => {
    const res = await axios.get(`/api/v1/server/stationData`);
    return res.data.onLeft;
  }
);
export const setBlueOnLeftAsync = createAsyncThunk(
  "mainData/setBlueOnLeft",
  async ({
    blueOnLeft,
  }: {
    blueOnLeft: boolean;
  }) => {;
    await axios.post(`/api/v1/server/stationData`, {
      onLeft: blueOnLeft
    });
  }
);

export const getActiveEventAsync = createAsyncThunk(
  "mainData/getActiveEvent",
  async () => {
    const res = await axios.get(`/api/v1/server/event`);
    return res.data.event;
  }
);
export const setActiveEventAsync = createAsyncThunk(
  "mainData/setActiveEvent",
  async ({
    eventCode,
  }: {
    eventCode: string;
  }) => {
    await axios.post(`/api/v1/server/event`, {
      code: eventCode,
    });
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
export const setActiveMatchAsync = createAsyncThunk(
  "mainData/setActiveMatch",
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
export const deleteScouterAsync = createAsyncThunk(
  "mainData/deleteScouter",
  async ({ id }: { id: number }) => {
    await axios.delete(`/api/v1/scouters/${id}`, {});
  }
);
  
export const createScouterAsync = createAsyncThunk(
  "mainData/createScouter",
  async (data: {name: string}) => {
    await axios.post(`/api/v1/scouters`, {
      ...data,
    });
  }
);

//This redux slice deals with server-related stuff.
const initialState: MainData = {
  station: undefined,
  alliance: Alliance.BLUE,
  submitted: false,
  blueOnLeft: true,
  blueOnLeftStatus: "idle",
  lastHeartbeat: 0,
  activeEvent: undefined,
  eventStatus: "idle",
  activeMatchName: undefined,
  matchStatus: "idle",
  activeTeamNumber: undefined,
  teamNumberStatus: "idle",
  scouter: {
    name: undefined,
    id: undefined,
  },
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
        state.blueOnLeftStatus = "waiting";
      })
      .addCase(getStationData.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.blueOnLeft = action.payload.blueOnLeft;
          state.activeEvent = action.payload.event;
          state.activeMatchName = action.payload.matchName;
          state.activeTeamNumber = action.payload.teamNumber;
          state.submitted = action.payload.submitted;
          state.scouter.id = action.payload.scouter?.id || 0;
          state.scouter.name = action.payload.scouter?.name || "Unassigned";
          state.eventStatus = "succeeded";
          state.matchStatus = "succeeded";
          state.teamNumberStatus = "succeeded";
          state.scouterStatus = "succeeded";
          state.blueOnLeftStatus = "succeeded";
        } else {
          state.eventStatus = "idle";
          state.matchStatus = "idle";
          state.teamNumberStatus = "idle";
          state.scouterStatus = "idle";
          state.blueOnLeftStatus = "idle";
        }
      })
      .addCase(getStationData.rejected, (state, action) => {
        state.eventStatus = "failed";
        state.matchStatus = "failed";
        state.teamNumberStatus = "failed";
        state.scouterStatus = "failed";
        state.blueOnLeftStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(getBlueOnLeftAsync.pending, (state) => {
        state.blueOnLeftStatus = "waiting";
      })
      .addCase(getBlueOnLeftAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.blueOnLeft = action.payload;
          state.blueOnLeftStatus = "succeeded";
        } else {
          state.blueOnLeftStatus = "waiting";
        }
      })
      .addCase(getBlueOnLeftAsync.rejected, (state, action) => {
        state.blueOnLeftStatus = "failed";
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
