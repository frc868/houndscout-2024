import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";

export interface Scores {
  autoStartingZone?: number;
}

export const setAutoStartingZoneAsync = createAsyncThunk(
  "scores/setAutoStartingZoneAsync",
  async ({ zone }: { zone: number }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setAutoStartingZone({ zone }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${mainData.activeMatchName}/scores/${mainData.station}`,
      {
        autoStartingZone: ["ONE", "TWO", "THREE"][zone - 1],
      }
    );
  }
);

//still need to adjust.
export const sendAutoEvent = createAsyncThunk(
  "scores/sendAutoEvent",
  async (
    data: {
      intakeType: "PRELOAD" | "PRESET";
      gamePiece: "CONE" | "CUBE";
      scoringPosition?: "HIGH" | "MID" | "HYBRID";
      failed: boolean;
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    (data as any).timestampScored = 0;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEventCode}/matches/${mainData.activeMatchName}/scores/${mainData.station}/autoEvent`,
      data
    );
  }
);
export const sendTeleopEvent = createAsyncThunk(
  "scores/sendAutoEvent",
  async (
    data: {
      intakeLocation: "GROUND" | "CHUTE" | "SHELF";
      gamePiece: "CONE" | "CUBE";
      scoringPosition?: "HIGH" | "MID" | "HYBRID";
      dropped?: boolean;
      failed?: boolean;
    },
    { getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    (data as any).timestampPickedUp = 0;
    (data as any).timestampScored = 0;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEventCode}/matches/${mainData.activeMatchName}/scores/${mainData.station}/teleopEvent`,
      data
    );
  }
);

const initialState: Scores = {
  presetPieces: ["CONE", "CONE", "CONE", "CONE"],
  preloadPiece: "CONE",
  autoStartingZone: undefined,
};

export const scoresSlice = createSlice({
  name: "applicationData",
  initialState: initialState,
  reducers: {
    setPresetPieces: (
      state,
      action: PayloadAction<{
        pieces: ("CONE" | "CUBE")[];
      }>
    ) => {
      state.presetPieces = action.payload.pieces;
    },
    setPreloadPiece: (
      state,
      action: PayloadAction<{
        piece: "CONE" | "CUBE";
      }>
    ) => {
      state.preloadPiece = action.payload.piece;
    },
    setAutoStartingZone: (
      state,
      action: PayloadAction<{
        zone: number;
      }>
    ) => {
      state.autoStartingZone = action.payload.zone;
    },
  },
  extraReducers: (builder) => {},
});

export const { setPresetPieces, setPreloadPiece, setAutoStartingZone } =
  scoresSlice.actions;
export default scoresSlice.reducer;
