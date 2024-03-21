import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import {
  AutoGamePiece,
  AutoStartingZone,
  ClimbType,
  IntakeLocation,
  ScoringLocation,
} from "@prisma/client";

export interface Scores {
  autoStartingZone?: AutoStartingZone;
  usedGamePieces: AutoGamePiece[];
  leftStartingZone: boolean;
  climbType?: ClimbType;
  numberRobotsOnChain?: number;
  scoredInTrap: boolean;
  spotlit: boolean;
}

export const setAutoStartingZoneAsync = createAsyncThunk(
  "scores/setAutoStartingZoneAsync",
  async ({ zone }: { zone: AutoStartingZone }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
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
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/teleopEvent`,
      data
    );
  }
);

export const setClimbTypeAsync = createAsyncThunk(
  "scores/setClimbType",
  async ({ climbType }: { climbType: ClimbType }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setClimbType({ climbType }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { climbType }
    );
  }
);

export const setNumberRobotsOnChainAsync = createAsyncThunk(
  "scores/setNumberRobots",
  async (
    { numberRobotsOnChain }: { numberRobotsOnChain: number },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setNumberRobotsOnChain({ numberRobotsOnChain }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { numberRobotsOnChain }
    );
  }
);
export const setScoredInTrapAsync = createAsyncThunk(
  "scores/setScoredInTrap",
  async (
    { scoredInTrap }: { scoredInTrap: boolean },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setScoredInTrap({ scoredInTrap }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { scoredInTrap }
    );
  }
);
export const setSpotlitAsync = createAsyncThunk(
  "scores/setSpotlit",
  async ({ spotlit }: { spotlit: boolean }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setSpotlit({ spotlit }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { spotlit }
    );
  }
);

const initialState: Scores = {
  autoStartingZone: undefined,
  leftStartingZone: false,
  usedGamePieces: [],
  climbType: undefined,
  numberRobotsOnChain: undefined,
  scoredInTrap: false,
  spotlit: false,
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
    setClimbType: (
      state,
      action: PayloadAction<{
        climbType: ClimbType;
      }>
    ) => {
      state.climbType = action.payload.climbType;
    },
    setNumberRobotsOnChain: (
      state,
      action: PayloadAction<{
        numberRobotsOnChain: number;
      }>
    ) => {
      state.numberRobotsOnChain = action.payload.numberRobotsOnChain;
    },
    setScoredInTrap: (
      state,
      action: PayloadAction<{
        scoredInTrap: boolean;
      }>
    ) => {
      state.scoredInTrap = action.payload.scoredInTrap;
    },
    setSpotlit: (
      state,
      action: PayloadAction<{
        spotlit: boolean;
      }>
    ) => {
      state.spotlit = action.payload.spotlit;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setAutoStartingZone,
  setLeftStartingZone,
  addAutoGamePiece,
  setClimbType,
  setNumberRobotsOnChain,
  setScoredInTrap,
  setSpotlit,
} = scoresSlice.actions;
export default scoresSlice.reducer;
