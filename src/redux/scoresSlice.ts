import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import {
  AutoStartingZone,
  EndgameType,
  CoralIntakeLocation,
  AlgaeIntakeLocation,
  CoralScoringLevel,
  CoralScoringSide,
  AlgaeScoringLocation,
  Result,
  DrivetrainType,
  WheelType,
  IntakeType,
} from "@prisma/client";

export interface Scores {
  autoStartingZone?: AutoStartingZone;
  leftStartingZone: boolean;
  endgameType?: EndgameType;
  endgameSuccess: boolean;
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

//UPDATE CYCLE: This may need to be updated if pit scouting data changes.
//If so, ensure all arguments match the pit part of the Team model in the schema. 
//Note to Michael: Make sure you update all of this to match the state on the pit page.
export const sendPitData = createAsyncThunk(
  "scores/sendPitData",
  async (
    {
      teamNumber,
      drivetrain,
      wheels,
      intake,
      weight,
      hasAuton,
      comments,
      canIntakeGroundCoral,
      canIntakeStationCoral,
      canIntakeGroundAlgae,
      canIntakeReefAlgae,
      canRemoveReefAlgaeWithoutIntake,
      canScoreReefL1,
      canScoreReefL2,
      canScoreReefL3,
      canScoreReefL4,
      canScoreNet,
      canScoreProcessor,
      canPark,
      canShallow,
      canDeep,
    }: {
      teamNumber: number;
      drivetrain?: DrivetrainType;
      wheels?: WheelType;
      intake?: IntakeType;
      weight?: number;
      hasAuton?: boolean;
      comments?: string;
      canIntakeGroundCoral?: boolean;
      canIntakeStationCoral?: boolean;
      canIntakeGroundAlgae?: boolean;
      canIntakeReefAlgae?: boolean;
      canRemoveReefAlgaeWithoutIntake?: boolean;
      canScoreReefL1?: boolean;
      canScoreReefL2?: boolean;
      canScoreReefL3?: boolean;
      canScoreReefL4?: boolean;
      canScoreNet?: boolean;
      canScoreProcessor?: boolean;
      canPark?: boolean;
      canShallow?: boolean;
      canDeep?: boolean;
    },
    { dispatch, getState }
  ) => {
    const drivetrainInput=drivetrain==undefined?null:drivetrain;
    const wheelsInput=wheels==undefined?null:wheels;
    const intakeInput=intake==undefined?null:intake;
    const res = await axios.patch(
      `/api/v1/teams/${teamNumber}`,
      {
        drivetrain: drivetrainInput,
        wheels: wheelsInput,
        intake: intakeInput,
        weight,
        hasAuton,
        comments,
        canIntakeGroundCoral,
        canIntakeStationCoral,
        canIntakeGroundAlgae,
        canIntakeReefAlgae,
        canRemoveReefAlgaeWithoutIntake,
        canScoreReefL1,
        canScoreReefL2,
        canScoreReefL3,
        canScoreReefL4,
        canScoreNet,
        canScoreProcessor,
        canPark,
        canShallow,
        canDeep,
      }
    );
  }
);

export const sendIncapSegment = createAsyncThunk(
  "scores/sendIncapSegment",
  async (
    data: {
      timestampStarted: number,
      timestampEnded: number,
      full: boolean
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/incapSegment`,
      data
    );
  }
);

//The following thunks create scoring events.
//UPDATE CYCLE: Please ensure all scoring event models are accounted for, matching the format of the schema in the arguments.
export const sendCoralEvent = createAsyncThunk(
  "scores/sendCoralEvent",
  async (
    data: {
      intakeLocation: CoralIntakeLocation;
      scoringLevel?: CoralScoringLevel;
      scoringSide?: CoralScoringSide;
      dropped?: boolean;
      failedScoring?: boolean;
      timestampPickedUp: number;
      timestampScored: number;
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/coralEvent`,
      data
    );
  }
);
export const sendAlgaeEvent = createAsyncThunk(
  "scores/sendAlgaeEvent",
  async (
    data: {
      intakeLocation: AlgaeIntakeLocation;
      scoringLocation?: AlgaeScoringLocation;
      dropped?: boolean;
      failedScoring?: boolean;
      timestampPickedUp: number;
      timestampScored: number;
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/algaeEvent`,
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
export const setEndgameSuccessAsync = createAsyncThunk(
  "scores/setEndgameSuccess",
  async ({ endgameSuccess }: { endgameSuccess: boolean }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setEndgameSuccess({ endgameSuccess }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      { endgameSuccess }
    );
  }
);

const initialState: Scores = {
  autoStartingZone: undefined,
  leftStartingZone: false,
  endgameType: undefined,
  endgameSuccess: false,
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
    setEndgameSuccess: (
      state,
      action: PayloadAction<{
        endgameSuccess: boolean;
      }>
    ) => {
      state.endgameSuccess = action.payload.endgameSuccess;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setAutoStartingZone,
  setLeftStartingZone,
  setEndgameType,
  setEndgameSuccess,
} = scoresSlice.actions;
export default scoresSlice.reducer;
