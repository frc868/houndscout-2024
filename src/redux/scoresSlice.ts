import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import {
  AutoGamePiece,
  AutoStartingZone,
  IntakeLocation,
  ScoringLocation,
} from "@prisma/client";

export interface Scores {
  autoStartingZone?: AutoStartingZone;
  usedGamePieces: AutoGamePiece[];
  leftStartingZone: boolean;
}

export const setAutoStartingZoneAsync = createAsyncThunk(
  "scores/setAutoStartingZoneAsync",
  async ({ zone }: { zone: AutoStartingZone }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        autoStartingZone: zone,
      }
    );
  }
);
export const setAutoGamePiecesAsync = createAsyncThunk(
  "scores/setAutoGamePieces",
  async (
    { autoGamePieces }: { autoGamePieces: AutoGamePiece[] },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    // dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        autoGamePieces,
      }
    );
  }
);
export const setMissingAutoGamePiecesAsync = createAsyncThunk(
  "scores/setMissingAutoGamePieces",
  async (
    { missingAutoGamePieces }: { missingAutoGamePieces: AutoGamePiece[] },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    // dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        missingAutoGamePieces,
      }
    );
  }
);
export const setAutoGamePiecesScoredAsync = createAsyncThunk(
  "scores/setAutoGamePiecesScored",
  async (
    { autoGamePiecesScored }: { autoGamePiecesScored: number },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    // dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        autoGamePiecesScored,
      }
    );
  }
);
export const setLeftStartingZoneAsync = createAsyncThunk(
  "scores/setLeftStartingZoneAsync",
  async (
    { leftStartingZone }: { leftStartingZone: boolean },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setLeftStartingZone({ leftStartingZone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        leftStartingZone,
      }
    );
  }
);
export const sendPostMatchData = createAsyncThunk(
  "scores/sendPostMatchData",
  async (
    {
      driverSkillRating,
      playedDefense,
      underDefense,
      comments,
    }: {
      driverSkillRating: number;
      playedDefense: boolean;
      underDefense: boolean;
      comments: string;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        driverSkillRating,
        playedDefense,
        underDefense,
        comments,
      }
    );
  }
);

// export const sendAutoEvent = createAsyncThunk(
//   "scores/sendAutoEvent",
//   async (
//     data: {
//       gamePiece: AutoGamePiece;
//       scoringLocation?: ScoringLocation;
//       failedScoring: boolean;
//       noNote: boolean;
//       missed: boolean;
//     },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     (data as any).timestampPickedUp = 0;
//     (data as any).timestampScored = 0;
//     dispatch(addAutoGamePiece({ gamePiece: data.gamePiece }));
//     const res = await axios.post(
//       `/api/v1/events/${mainData.activeEventCode}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}/autoEvent`,
//       data
//     );
//   }
// );
export const sendTeleopEvent = createAsyncThunk(
  "scores/sendTeleopEvent",
  async (
    data: {
      intakeLocation: IntakeLocation;
      scoringLocation?: ScoringLocation;
      dropped?: boolean;
      failedScoring?: boolean;
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    (data as any).timestampPickedUp = 0;
    (data as any).timestampScored = 0;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEventCode}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/teleopEvent`,
      data
    );
  }
);

const initialState: Scores = {
  autoStartingZone: undefined,
  leftStartingZone: false,
  usedGamePieces: [],
};

export const scoresSlice = createSlice({
  name: "applicationData",
  initialState: initialState,
  reducers: {
    setAutoStartingZone: (
      state,
      action: PayloadAction<{
        zone: AutoStartingZone;
      }>
    ) => {
      state.autoStartingZone = action.payload.zone;
    },
    setLeftStartingZone: (
      state,
      action: PayloadAction<{
        leftStartingZone: boolean;
      }>
    ) => {
      state.leftStartingZone = action.payload.leftStartingZone;
    },
    addAutoGamePiece: (
      state,
      action: PayloadAction<{
        gamePiece: AutoGamePiece;
      }>
    ) => {
      state.usedGamePieces.push(action.payload.gamePiece);
    },
  },
  extraReducers: (builder) => {},
});

export const { setAutoStartingZone, setLeftStartingZone, addAutoGamePiece } =
  scoresSlice.actions;
export default scoresSlice.reducer;
