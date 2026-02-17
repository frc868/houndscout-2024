import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";
import {
  AutoStartingZone,
  FuelIntakeSource,
  Accuracy,
  HumanPlayerUsage,
  Playstyle,
  Result,
  TowerLevel,
  TowerPosition,
  Segment,
  DrivetrainType,
  WheelType,
  IntakeType,
} from "@prisma/client";

// UPDATE CYCLE (Client): Update this interface for each new game.
export interface Scores {
  autoStartingZone?: AutoStartingZone;
  preloaded: boolean;
  leftStartingZone: boolean;

  // Auto
  autoFuelScored: number;
  autoFuelIntakeSource?: FuelIntakeSource;
  autoFuelAccuracy?: Accuracy;
  wonAuto?: boolean;

  // Teleop - fuel per shift
  teleopShift1Fuel: number;
  teleopShift2Fuel: number;
  teleopShift3Fuel: number;
  teleopShift4Fuel: number;
  teleopEndgameFuel: number;
  teleopFuelSource?: FuelIntakeSource;
  humanPlayerUsage?: HumanPlayerUsage;
  humanPlayerValuable?: boolean;

  // Incap tracking (local state only, segments are sent via API)
  incapOn: boolean;
  incapStartTime: number;
  incapEndTime: number;
}

// ==================== PREMATCH ASYNC THUNKS ====================

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

export const setPreloadedAsync = createAsyncThunk(
  "scores/setPreloadedAsync",
  async ({ preloaded }: { preloaded: boolean }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setPreloaded({ preloaded }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        preloaded,
      }
    );
  }
);

// ==================== AUTO ASYNC THUNKS ====================

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

// ==================== GENERIC SCORE FIELD UPDATE ====================
// UPDATE CYCLE (Client): Use this for simple field updates (fuel counts, enums, booleans).
// For anything more complex, create a dedicated thunk.

export const updateScoreFieldAsync = createAsyncThunk(
  "scores/updateScoreFieldAsync",
  async (
    { field, value }: { field: string; value: any },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(updateScoreField({ field, value }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        [field]: value,
      }
    );
  }
);

// ==================== TOWER ATTEMPT ====================
// UPDATE CYCLE (Client): Update this to match the current game's climbing/endgame mechanic.

export const sendTowerAttempt = createAsyncThunk(
  "scores/sendTowerAttempt",
  async (
    data: {
      segment: Segment;
      level: TowerLevel;
      succeeded: boolean;
      towerPosition?: TowerPosition;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/towerAttempt`,
      {
        ...data,
        timestampStarted: Date.now(),
        timestampEnded: Date.now(),
      }
    );
  }
);

// ==================== INCAP HANDLING ====================

export const sendIncapSegment = createAsyncThunk(
  "scores/sendIncapSegment",
  async (
    data: {
      timestampStarted: number;
      timestampEnded: number;
      full: boolean;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/incapSegment`,
      data
    );
    dispatch(resetIncap());
  }
);

export const handleIncap = createAsyncThunk(
  "scores/handleIncap",
  async (
    _,
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const {
      incapOn,
      incapStartTime,
    } = state.scores;
    if (incapOn) {
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: true,
      };
      await dispatch(sendIncapSegment(event));
    } else {
      dispatch(enableIncap());
    }
  }
);

// ==================== POSTMATCH / SUBMIT / CANCEL ====================

//This may need to be updated if postmatch data changes.
//If so, ensure all arguments match the postmatch part of the teamScore model in the schema.
// UPDATE CYCLE (Client): Update postmatch fields for the current game.
export const sendPostMatchData = createAsyncThunk(
  "scores/sendPostMatchData",
  async (
    {
      driverSkillRating,
      playstyle,
      playedDefense,
      defensePlayedAgainst,
      robotBrokeDown,
      result,
      comments,
    }: {
      driverSkillRating: number;
      playstyle?: Playstyle;
      playedDefense: boolean;
      defensePlayedAgainst: boolean;
      robotBrokeDown: boolean;
      result: Result;
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
        playstyle,
        playedDefense,
        defensePlayedAgainst,
        robotBrokeDown,
        result,
        comments,
        submitted: true,
      }
    );
  }
);

export const cancelScore = createAsyncThunk(
  "scores/cancelScore",
  async (
    data: {},
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`,
      {
        cancelled: true,
      }
    );
  }
);

export const cleanForPostmatch = createAsyncThunk(
  "scores/cleanForPostmatch",
  async (
    _,
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const { incapOn, incapStartTime } = state.scores;

    // Maturely ends any in-progress incap segment when switching to postmatch.
    if (incapOn) {
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: false,
      };
      await dispatch(sendIncapSegment(event));
    }
  }
);

export const clearEvents = createAsyncThunk(
  "scores/clearEvents",
  async (
    data: {},
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.delete(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}`
    );
  }
);

// ==================== PIT SCOUTING ====================

//UPDATE CYCLE (Pit): Ensure all of this matches the pitData model.
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
      robotImage,
      hasShooter,
      shooterType,
      ballCapacity,
      canCrossObstacle,
      canScoreHub,
      canScoreHighHub,
      canClimbLevel1,
      canClimbLevel2,
      canClimbLevel3,
      canPlayHumanPlayer,
    }: {
      teamNumber: number;
      drivetrain?: DrivetrainType;
      wheels?: WheelType;
      intake?: IntakeType;
      weight?: number;
      hasAuton?: boolean;
      comments?: string;
      robotImage?: string;
      hasShooter?: boolean;
      shooterType?: string;
      ballCapacity?: number;
      canCrossObstacle?: boolean;
      canScoreHub?: boolean;
      canScoreHighHub?: boolean;
      canClimbLevel1?: boolean;
      canClimbLevel2?: boolean;
      canClimbLevel3?: boolean;
      canPlayHumanPlayer?: boolean;
    },
    { dispatch, getState }
  ) => {
    const drivetrainInput = drivetrain == undefined ? null : drivetrain;
    const wheelsInput = wheels == undefined ? null : wheels;
    const intakeInput = intake == undefined ? null : intake;
    const res = await axios.patch(
      `/api/v1/teams/pitData/${teamNumber}`,
      {
        drivetrain: drivetrainInput,
        wheels: wheelsInput,
        intake: intakeInput,
        weight,
        hasAuton,
        comments,
        robotImage,
        hasShooter,
        shooterType,
        ballCapacity,
        canCrossObstacle,
        canScoreHub,
        canScoreHighHub,
        canClimbLevel1,
        canClimbLevel2,
        canClimbLevel3,
        canPlayHumanPlayer,
      }
    );
  }
);

// ==================== INITIAL STATE ====================

const initialState: Scores = {
  autoStartingZone: undefined,
  preloaded: true,
  leftStartingZone: false,
  autoFuelScored: 0,
  autoFuelIntakeSource: undefined,
  autoFuelAccuracy: undefined,
  wonAuto: undefined,
  teleopShift1Fuel: 0,
  teleopShift2Fuel: 0,
  teleopShift3Fuel: 0,
  teleopShift4Fuel: 0,
  teleopEndgameFuel: 0,
  teleopFuelSource: undefined,
  humanPlayerUsage: undefined,
  humanPlayerValuable: undefined,
  incapOn: false,
  incapStartTime: 0,
  incapEndTime: 0,
};

// ==================== SLICE ====================

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
    setPreloaded: (
      state,
      action: PayloadAction<{
        preloaded: boolean;
      }>
    ) => {
      state.preloaded = action.payload.preloaded;
    },
    setLeftStartingZone: (
      state,
      action: PayloadAction<{
        leftStartingZone: boolean;
      }>
    ) => {
      state.leftStartingZone = action.payload.leftStartingZone;
    },
    // Generic field updater for fuel counts, enums, booleans, etc.
    // UPDATE CYCLE (Client): This handles most simple score field updates.
    updateScoreField: (
      state,
      action: PayloadAction<{
        field: string;
        value: any;
      }>
    ) => {
      (state as any)[action.payload.field] = action.payload.value;
    },
    enableIncap: (state) => {
      state.incapOn = true;
      state.incapStartTime = Date.now();
    },
    resetIncap: (state) => {
      state.incapOn = false;
      state.incapStartTime = 0;
    },
    resetScores: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const {
  setAutoStartingZone,
  setPreloaded,
  setLeftStartingZone,
  updateScoreField,
  enableIncap,
  resetIncap,
  resetScores,
} = scoresSlice.actions;
export default scoresSlice.reducer;