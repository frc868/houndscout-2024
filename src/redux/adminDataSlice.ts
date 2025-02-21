import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Event } from "@prisma/client"
import { Match, Scouter, Team, Heartbeat } from "@/lib/enums";

export interface AdminData {
  matches?: Match[];
  scouters?: Scouter[];
  eventTeams?: Team[];
  allTeams?: Team[];
  eventList?: Event[];
  matchesStatus: "idle" | "waiting" | "succeeded" | "failed";
  scoutersStatus: "idle" | "waiting" | "succeeded" | "failed";
  eventTeamsStatus: "idle" | "waiting" | "succeeded" | "failed";
  allTeamsStatus: "idle" | "waiting" | "succeeded" | "failed";
  eventListStatus: "idle" | "waiting" | "succeeded" | "failed";
  error?: string;
  heartbeats: {
    red1: Heartbeat;
    red2: Heartbeat;
    red3: Heartbeat;
    blue1: Heartbeat;
    blue2: Heartbeat;
    blue3: Heartbeat;
  };
}

//Most of these async thunks just post a call to an api folder.
export const getEventsAsync = createAsyncThunk(
  "adminData/getEvents",
  async () => {
    const res = await axios.get(`/api/v1/events`);
    return res.data.events;
  }
);
export const createEventAsync = createAsyncThunk(
  "adminData/createEvent",
  async (data: {
    name: string,
    code: string,
    week: number,
    start: string,
    end: string,
    address: string
  }) => {
    await axios.post(`/api/v1/events`, {
      ...data,
    });
  }
);
export const editEventAsync = createAsyncThunk(
  "adminData/editEvent",
  async ({eventCode, ...data}: {
    name: string,
    code: string,
    weekNumber: number,
    startDate: string,
    endDate: string,
    address: string,
    eventCode: string
  }) => {
    await axios.patch(`/api/v1/events/${eventCode}`, {
      ...data,
    });
  }
);
export const deleteEventAsync = createAsyncThunk(
  "adminData/deleteEvent",
  async ({ eventCode }: { eventCode: string }) => {
    await axios.delete(`/api/v1/events/${eventCode}`, {});
  }
);

export const getMatchesAsync = createAsyncThunk(
  "adminData/getMatches",
  async ({ eventCode }: { eventCode: string }) => {
    const res = await axios.get(`/api/v1/events/${eventCode}/matches`);
    return res.data.matches;
  }
);


export const editMatchAsync = createAsyncThunk(
  "adminData/editMatch",
  async (data: {
    eventCode: string;
    number: number;
    name: string;
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number;
  }) => {
    await axios.patch(`/api/v1/events/${data.eventCode}/matches/${data.name}`, {
      ...data,
    });
  }
);
export const createMatchAsync = createAsyncThunk(
  "adminData/createMatch",
  async (data: {
    eventCode: string;
    number: number;
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number;
  }) => {
    await axios.post(`/api/v1/events/${data.eventCode}/matches`, {
      key: `${data.eventCode}_qm${data.number}`,
      name: `qm${data.number}`,
      ...data,
    });
  }
);
export const deleteMatchAsync = createAsyncThunk(
  "adminData/deleteMatch",
  async ({
    eventCode,
    matchName,
  }: {
    eventCode: string;
    matchName: string;
  }) => {
    await axios.delete(`/api/v1/events/${eventCode}/matches/${matchName}`);
  }
);

export const uploadOfflineTBADataAsync = createAsyncThunk(
  "adminData/uploadOfflineTBADataAsync",
  async (data: { eventCode: string; teams: string; matches: string }) => {
    await axios.post(`/api/v1/events/${data.eventCode}/tbaseed/offline`, {
      teams: data.teams,
      matches: data.matches,
    });
  }
);
export const uploadOnlineTBADataAsync = createAsyncThunk(
  "adminData/uploadOnlineTBADataAsync",
  async (data: { eventCode: string;}) => {
    await axios.post(`/api/v1/events/${data.eventCode}/tbaseed/`, {});
  }
);
export const createTeamAsync = createAsyncThunk(
  "adminData/createTeam",
  async (data: {
    number: number;
    name: string;
    location: string;
  }) => {
    await axios.post(`/api/v1/teams`, {
      ...data,
    });
  }
);
export const deleteTeamAsync = createAsyncThunk(
  "adminData/deleteTeam",
  async ({
    teamNumber,
  }: {
    teamNumber: number;
  }) => {
    await axios.delete(`/api/v1/teams/${teamNumber}`);
  }
);
export const addTeamToEventAsync = createAsyncThunk(
  "adminData/addTeamToEvent",
  async ({
    eventCode,
    ...data
  }: {
    eventCode: string;
    teamNumber: number;
  }) => {
    await axios.post(`/api/v1/events/${eventCode}/teams`,{
      number: data.teamNumber
    });
  }
);
export const removeTeamFromEventAsync = createAsyncThunk(
  "adminData/removeTeamFromEvent",
  async ({
    eventCode,
    teamNumber,
  }: {
    eventCode: string;
    teamNumber: number;
  }) => {
    await axios.delete(`/api/v1/events/${eventCode}/teams/${teamNumber}`);
  }
);
export const getEventTeamsAsync = createAsyncThunk(
  "adminData/getEventTeamsAsync",
  async ({ eventCode }: { eventCode: string }) => {
    const res = await axios.get(`/api/v1/events/${eventCode}/teams`);
    return res.data.teams;
  }
);
export const getAllTeamsAsync = createAsyncThunk(
  "adminData/getAllTeamsAsync",
  async () => {
    const res = await axios.get(`/api/v1/teams`);
    return res.data.teams;
  }
);

export const getScoutersAsync = createAsyncThunk(
  "adminData/getScoutersAsync",
  async () => {
    const res = await axios.get("/api/v1/scouters");
    return res.data.scouters;
  }
);
export const setScouterActiveAsync = createAsyncThunk(
  "adminData/setScouterActiveAsync",
  async (data: {
    scouterId: number;
    active: boolean;
  }) => {
    await axios.patch(`/api/v1/scouters/${data.scouterId}`, {
      ...data,
    });
  }
);
export const deleteScouterAsync = createAsyncThunk(
  "adminData/deleteScouterAsync",
  async ({ scouterId }: { scouterId: number }) => {
    await axios.delete(`/api/v1/scouters/${scouterId}`);
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

export const getHeartbeatsAsync = createAsyncThunk(
  "adminData/getHeartbeats",
  async () => {
    const res = await axios.get("/api/v1/heartbeat");
    return res.data.heartbeats;
  }
);


// initialState defines the blank state, which will be filled in below.
//For AdminData, this contains the anything on the admin page that isn't active events or the heartbeats
//(At least I think that's what it should be, but I probably messed something up with my updates.)
const initialState: AdminData = {
  matches: undefined,
  matchesStatus: "idle",
  scouters: undefined,
  scoutersStatus: "idle",
  eventTeams: undefined,
  eventTeamsStatus: "idle",
  allTeams: undefined,
  allTeamsStatus: "idle",
  eventList: undefined,
  eventListStatus: "idle",
  error: undefined,
  heartbeats: {
    red1: { time: Date.now(), section: "" },
    red2: { time: Date.now(), section: "" },
    red3: { time: Date.now(), section: "" },
    blue1: { time: Date.now(), section: "" },
    blue2: { time: Date.now(), section: "" },
    blue3: { time: Date.now(), section: "" },
  },
};


export const mainData = createSlice({
  name: "mainData",
  initialState: initialState,
  reducers: {},//This is used for syncrhonous actions. See mainDataSlice.
  extraReducers: (builder) => {
    //Each builder represents a single async thunk that fills out the state.
    //When one of the functions is called, it calls the case responding to the current status of the thunk.
    //When fufilled, matches the data returned to the state.
    //Still not sure of the exact details though.
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
                teamNumbers: {
                  red1: item.red1Team.number,
                  red2: item.red2Team.number,
                  red3: item.red3Team.number,
                  blue1: item.blue1Team.number,
                  blue2: item.blue2Team.number,
                  blue3: item.blue3Team.number,
                },
                scouters: {
                  red1: item.red1TeamScore.scouter,
                  red2: item.red2TeamScore.scouter,
                  red3: item.red3TeamScore.scouter,
                  blue1: item.blue1TeamScore.scouter,
                  blue2: item.blue2TeamScore.scouter,
                  blue3: item.blue3TeamScore.scouter,
                },
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
    builder
      .addCase(getEventTeamsAsync.pending, (state) => {
        state.eventTeamsStatus = "waiting";
      })
      .addCase(getEventTeamsAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.eventTeams = action.payload;
          state.eventTeams?.sort((a, b) => a.id - b.id);

          state.eventTeamsStatus = "succeeded";
        } else {
          state.eventTeamsStatus = "idle";
        }
      })
      .addCase(getEventTeamsAsync.rejected, (state, action) => {
        state.eventTeamsStatus = "failed";
        state.error = action.error.message || "";
      });
    builder
      .addCase(getAllTeamsAsync.pending, (state) => {
        state.allTeamsStatus = "waiting";
      })
      .addCase(getAllTeamsAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.allTeams = action.payload;
          state.allTeams?.sort((a, b) => a.id - b.id);

          state.allTeamsStatus = "succeeded";
        } else {
          state.allTeamsStatus = "idle";
        }
      })
      .addCase(getAllTeamsAsync.rejected, (state, action) => {
        state.allTeamsStatus = "failed";
        state.error = action.error.message || "";
      });
    builder
      .addCase(getEventsAsync.pending, (state) => {
        state.eventListStatus = "waiting";
      })
      .addCase(getEventsAsync.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.eventList = action.payload;
          state.eventListStatus = "succeeded";
        } else {
          state.eventListStatus = "idle";
        }
      })
      .addCase(getEventsAsync.rejected, (state, action) => {
        state.eventListStatus = "failed";
        state.error = action.error.message || "";
      });
    builder.addCase(getHeartbeatsAsync.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.heartbeats.red1 = {
          time: new Date(action.payload.red1.time).getTime(),
          section: action.payload.red1.section,
        };
        state.heartbeats.red2 = {
          time: new Date(action.payload.red2.time).getTime(),
          section: action.payload.red2.section,
        };
        state.heartbeats.red3 = {
          time: new Date(action.payload.red3.time).getTime(),
          section: action.payload.red3.section,
        };
        state.heartbeats.blue1 = {
          time: new Date(action.payload.blue1.time).getTime(),
          section: action.payload.blue1.section,
        };
        state.heartbeats.blue2 = {
          time: new Date(action.payload.blue2.time).getTime(),
          section: action.payload.blue2.section,
        };
        state.heartbeats.blue3 = {
          time: new Date(action.payload.blue3.time).getTime(),
          section: action.payload.blue3.section,
        };
      }
    });
  },
});

export const {} = mainData.actions;
export default mainData.reducer;
