import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import {
  AutoStartingZone,
  EndgameType,
  AutoCoralIntakeLocation,
  AutoAlgaeIntakeLocation,
  TeleopCoralIntakeLocation,
  TeleopAlgaeIntakeLocation,
  CoralScoringLevel,
  AutoCoralScoringSide,
  AlgaeScoringLocation,
  Result,
} from "@prisma/client";

export interface Scores {
  autoStartingZone?: AutoStartingZone;
  leftStartingZone: boolean;
  endgameType?: EndgameType;
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
//From Crescendo
// export const setAutoGamePiecesAsync = createAsyncThunk(
//   "scores/setAutoGamePieces",
//   async (
//     { autoGamePieces }: { autoGamePieces: AutoGamePiece[] },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     // dispatch(setAutoStartingZone({ zone }));
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       {
//         autoGamePieces,
//       }
//     );
//   }
// );
// export const setMissingAutoGamePiecesAsync = createAsyncThunk(
//   "scores/setMissingAutoGamePieces",
//   async (
//     { missingAutoGamePieces }: { missingAutoGamePieces: AutoGamePiece[] },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     // dispatch(setAutoStartingZone({ zone }));
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       {
//         missingAutoGamePieces,
//       }
//     );
//   }
// );
// export const setAutoGamePiecesScoredAsync = createAsyncThunk(
//   "scores/setAutoGamePiecesScored",
//   async (
//     { autoGamePiecesScored }: { autoGamePiecesScored: number },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       {
//         autoGamePiecesScored,
//       }
//     );
//   }
// );

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
//UPDATE CYCLE: This may need to be updated if postmatch data changes.
//If so, ensure all arguments match the postmatch part of the teamScore model in the schema. 
export const sendPostMatchData = createAsyncThunk(
  "scores/sendPostMatchData",
  async (
    {
      driverSkillRating,
      result,
      playedDefense,
      comments,
    }: {
      driverSkillRating: number;
      result: Result;
      playedDefense: boolean;
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
        result,
        playedDefense,
        comments,
        submitted: true,
      }
    );
  }
);

//The following thunks create scoring events.
//UPDATE CYCLE: Please ensure all scoring event models are accounted for, matching the format of the schema in the arguments.
export const sendAutoCoralEvent = createAsyncThunk(
  "scores/sendAutoCoralEvent",
  async (
    data: {
      intakeLocation: AutoCoralIntakeLocation;
      scoringLevel?: CoralScoringLevel;
      scoringSide?: AutoCoralScoringSide;
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
      }/scores/${mainData.station?.toLowerCase()}/autoCoralEvent`,
      data
    );
  }
);
export const sendAutoAlgaeEvent = createAsyncThunk(
  "scores/sendAutoAlgaeEvent",
  async (
    data: {
      intakeLocation: AutoAlgaeIntakeLocation;
      scoringLocation?: AlgaeScoringLocation;
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
      }/scores/${mainData.station?.toLowerCase()}/autoAlgaeEvent`,
      data
    );
  }
);
export const sendTeleopCoralEvent = createAsyncThunk(
  "scores/sendTeleopCoralEvent",
  async (
    data: {
      intakeLocation: TeleopCoralIntakeLocation;
      scoringLocation?: CoralScoringLevel;
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
      }/scores/${mainData.station?.toLowerCase()}/teleopCoralEvent`,
      data
    );
  }
);
export const sendTeleopAlgaeEvent = createAsyncThunk(
  "scores/sendTeleopAlgaeEvent",
  async (
    data: {
      intakeLocation: TeleopAlgaeIntakeLocation;
      scoringLocation?: AlgaeScoringLocation;
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
      }/scores/${mainData.station?.toLowerCase()}/teleopAlgaeEvent`,
      data
    );
  }
);

export const setEndgameTypeAsync = createAsyncThunk(
  "scores/setEndgameType",
  async ({ endgameType }: { endgameType: EndgameType }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setEndgameType({ endgameType }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { endgameType }
    );
  }
);

// Old endgame stuff from Crescendo
// export const setNumberRobotsOnChainAsync = createAsyncThunk(
//   "scores/setNumberRobots",
//   async (
//     { numberRobotsOnChain }: { numberRobotsOnChain: number },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     dispatch(setNumberRobotsOnChain({ numberRobotsOnChain }));
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       { numberRobotsOnChain }
//     );
//   }
// );
// export const setScoredInTrapAsync = createAsyncThunk(
//   "scores/setScoredInTrap",
//   async (
//     { scoredInTrap }: { scoredInTrap: boolean },
//     { dispatch, getState }
//   ) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     dispatch(setScoredInTrap({ scoredInTrap }));
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       { scoredInTrap }
//     );
//   }
// );
// export const setSpotlitAsync = createAsyncThunk(
//   "scores/setSpotlit",
//   async ({ spotlit }: { spotlit: boolean }, { dispatch, getState }) => {
//     const state = getState() as ReduxState;
//     const mainData = state.mainData;
//     dispatch(setSpotlit({ spotlit }));
//     const res = await axios.patch(
//       `/api/v1/events/${mainData.activeEvent?.code}/matches/${
//         mainData.activeMatchName
//       }/scores/${mainData.station?.toLowerCase()}`,
//       { spotlit }
//     );
//   }
// );

const initialState: Scores = {
  autoStartingZone: undefined,
  leftStartingZone: false,
  endgameType: undefined,
};

//The async thunks here have the async thunks call actions here to change state rather than using builders.
//Probably has something to do with getting these out of the way quicker.
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
    //Crescendo stuff
    // addAutoGamePiece: (
    //   state,
    //   action: PayloadAction<{
    //     gamePiece: AutoGamePiece;
    //   }>
    // ) => {
    //   state.usedGamePieces.push(action.payload.gamePiece);
    // },
    setEndgameType: (
      state,
      action: PayloadAction<{
        endgameType: EndgameType;
      }>
    ) => {
      state.endgameType = action.payload.endgameType;
    },
    // Crescendo stuff
    // setNumberRobotsOnChain: (
    //   state,
    //   action: PayloadAction<{
    //     numberRobotsOnChain: number;
    //   }>
    // ) => {
    //   state.numberRobotsOnChain = action.payload.numberRobotsOnChain;
    // },
    // setScoredInTrap: (
    //   state,
    //   action: PayloadAction<{
    //     scoredInTrap: boolean;
    //   }>
    // ) => {
    //   state.scoredInTrap = action.payload.scoredInTrap;
    // },
    // setSpotlit: (
    //   state,
    //   action: PayloadAction<{
    //     spotlit: boolean;
    //   }>
    // ) => {
    //   state.spotlit = action.payload.spotlit;
    // },
  },
  extraReducers: (builder) => {},
});

export const {
  setAutoStartingZone,
  setLeftStartingZone,
  setEndgameType,
} = scoresSlice.actions;
export default scoresSlice.reducer;
