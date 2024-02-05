import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "./store";

export interface Scores {
  presetPieces: ("RING" | "")[];
  preloadPiece: "RING" | "";
  autoStartingZone?: number;
}

export const setPresetPiecesAsync = createAsyncThunk(
  "scores/setPresetPiecesAsync",
  async (
    { pieces }: { pieces: ("RING" | "")[] },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setPresetPieces({ pieces }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${mainData.activeMatchName}`,
      {
        presetPiece1: pieces[0],
        presetPiece2: pieces[1],
        presetPiece3: pieces[2],
      }
    );
  }
);
export const setPreloadPieceAsync = createAsyncThunk(
  "scores/setPreloadPieceAsync",
  async ({ piece }: { piece: "RING" | "" }, { dispatch, getState }) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    dispatch(setPreloadPiece({ piece }));
    const res = await axios.patch(
      `/api/v1/events/${mainData.activeEventCode}/matches/${mainData.activeMatchName}/scores/${mainData.station}`,
      {
        preloadPiece: piece,
      }
    );
  }
);
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

export const sendAutoEvent = createAsyncThunk(
  "scores/sendAutoEvent",
  async (
    data: {
      intakeType: "PRELOAD" | "PRESET";
      scoringPosition?: "SPEAKER" | "AMP" | "";
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
  "scores/sendTeleopEvent",
  async (
    data: {
      intakeLocation: "GROUND" | "SOURCE" | "PRELOAD" | "PRESET" | "";
      scoringPosition?: "SPEAKER" | "AMP" | "";
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
  presetPieces: ["RING", "RING", "RING"],
  preloadPiece: "RING",
  autoStartingZone: undefined,
};

export const scoresSlice = createSlice({
  name: "applicationData",
  initialState: initialState,
  reducers: {
    setPresetPieces: (
      state,
      action: PayloadAction<{
        pieces: ("RING" | "")[];
      }>
    ) => {
      state.presetPieces = action.payload.pieces;
    },
    setPreloadPiece: (
      state,
      action: PayloadAction<{
        piece: "RING" | "";
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
