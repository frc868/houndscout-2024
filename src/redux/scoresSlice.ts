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
  Section,
} from "@prisma/client";

export interface Scores {
  autoStartingZone?: AutoStartingZone;
  leftStartingZone: boolean;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  coralScoringSide?: CoralScoringSide;
  coralActiveSide: 'intaking'|'level'|'side'|'result';
  coralStartTime: number;
  coralEndTime: number;
  algaeIntakeLocation?: AlgaeIntakeLocation;
  algaeScoringLocation?: AlgaeScoringLocation;
  algaeActiveSide: 'intaking'|'scoring'|'result';
  algaeStartTime: number;
  algaeEndTime: number;
  incapOn: boolean;
  incapStartTime: number;
  incapEndTime: number;
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
//This may need to be updated if postmatch data changes.
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
    const {
      incapOn,
      incapStartTime,
      coralActiveSide,
      coralStartTime,
      coralIntakeLocation,
      algaeActiveSide,
      algaeStartTime,
      algaeIntakeLocation,
    } = state.scores;

    //maturely ends any in-progress scoring events and incap segments when switching to postmatch
    if(incapOn){
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: false
      }; //incapSegment creation.
      await dispatch(sendIncapSegment(event));
    }
    // UPDATE CYCLE (Client): Make sure all scoring events are covered here.
    if(coralActiveSide!="intaking"){
      const event = {
        intakeLocation: coralIntakeLocation as CoralIntakeLocation,
        scoringLevel: undefined,
        scoringSide: undefined,
        failedScoring: true,
        dropped: true,
        timestampPickedUp: coralStartTime,
        timestampScored: Date.now(),
      }; //scoring event creation.
      await dispatch(sendCoralEvent(event));
    }
    if(algaeActiveSide!="intaking"){
      const event = {
        intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
        scoringLocation: undefined,
        failedScoring: true,
        dropped: true,
        timestampPickedUp: algaeStartTime,
        timestampScored: Date.now(),
      }; //scoring event creation.
      await dispatch(sendAlgaeEvent(event));
    }
  }
)

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
    if(incapOn){
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: true
      }; //incapSegment creation.
      await dispatch(sendIncapSegment(event));
    } else {
      dispatch(enableIncap());   
    }   
  }
)

export const handleCoral = createAsyncThunk(
  "scores/handleCoral",
  async (
    {
      tab, phrase, data
    }: {
      tab: Section;
      phrase: 'intaking'|'level'|'side'|'result';
      data:{
        intakeSelection?: CoralIntakeLocation,
        scoringLevel?: CoralScoringLevel,
        dropped?: boolean,
        scoringSide?: CoralScoringSide,
        failedScoring?: boolean,
      };
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const {
      coralActiveSide,
      coralIntakeLocation,
      coralScoringLevel,
      coralScoringSide,
      coralStartTime,
      coralEndTime,
    } = state.scores;

    if(phrase==coralActiveSide){
      if (phrase=="intaking"){
        dispatch(setCoralIntakeLocation({ coralIntakeLocation: data.intakeSelection }));
        dispatch(setCoralActiveSide({ coralActiveSide: "level" }));
        // if (coralStartTime == 0) setCoralStartTime(Date.now());
      } else if (phrase=="level"){
        if(data.dropped){
          const event = {
            intakeLocation: coralIntakeLocation as CoralIntakeLocation,
            scoringLevel: undefined,
            scoringSide: undefined,
            failedScoring: true,
            dropped: true,
            timestampPickedUp: coralStartTime,
            timestampScored: Date.now(),
          }; //teleopScoringEvent creation.
          await dispatch(sendCoralEvent(event));
        } else {
          // if (coralEndTime == 0) setCoralEndTime(Date.now());
          dispatch(setCoralScoringLevel({ coralScoringLevel: data.scoringLevel }));
          if(tab==Section.AUTO){
            dispatch(setCoralActiveSide({ coralActiveSide: "side" }));
          } else {
            dispatch(setCoralActiveSide({ coralActiveSide: "result" }));
          }
        }
      } else if (phrase == "side") {
        dispatch(setCoralScoringSide({ coralScoringSide: data.scoringSide }));
        dispatch(setCoralActiveSide({ coralActiveSide: "result" }));
      } else if (phrase == "result") {
        const event = {
          intakeLocation: coralIntakeLocation as CoralIntakeLocation,
          scoringLevel: coralScoringLevel as CoralScoringLevel,
          scoringSide: coralScoringSide as CoralScoringSide,
          failedScoring: data.failedScoring,
          dropped: false,
          timestampPickedUp: coralStartTime,
          timestampScored: coralEndTime,
        }; //teleopScoringEvent creation.
        await dispatch(sendCoralEvent(event));
      }
    }  
  }
)

export const handleCoralCancel = createAsyncThunk(
  "scores/handleCoralCancel",
  async (
    {
      tab, phrase
    }: {
      tab: Section;
      phrase: 'intaking'|'level'|'side'|'result';
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const {
      coralActiveSide,
    } = state.scores;

    if(phrase==coralActiveSide){
      if (phrase=="level"){
        dispatch(setCoralIntakeLocation({ coralIntakeLocation: undefined }));
        dispatch(setCoralActiveSide({ coralActiveSide: "intaking" }));  
      } else if (phrase=="side"){
        dispatch(setCoralScoringLevel({ coralScoringLevel: undefined }));
        dispatch(setCoralActiveSide({ coralActiveSide: "level" }));  
      } else if (phrase=="result"){
        if(tab==Section.AUTO){
        dispatch(setCoralScoringSide({ coralScoringSide: undefined }));
        dispatch(setCoralActiveSide({ coralActiveSide: "side" }));  
        } else {
        dispatch(setCoralScoringLevel({ coralScoringLevel: undefined }));
        dispatch(setCoralActiveSide({ coralActiveSide: "level" })); 
        }
      }
    }  
  }
)

export const handleAlgae = createAsyncThunk(
  "scores/handleAlgae",
  async (
    {
      phrase, data
    }: {
      phrase: 'intaking'|'scoring'|'result';
      data:{
        intakeSelection?: AlgaeIntakeLocation,
        scoringLocation?: AlgaeScoringLocation,
        dropped?: boolean,
        failedScoring?: boolean,
      };
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const {
      algaeActiveSide,
      algaeIntakeLocation,
      algaeScoringLocation,
      algaeStartTime,
      algaeEndTime,
    } = state.scores;

    if(phrase==algaeActiveSide){
      if (phrase=="intaking"){
        dispatch(setAlgaeIntakeLocation({ algaeIntakeLocation: data.intakeSelection }));
        dispatch(setAlgaeActiveSide({ algaeActiveSide: "scoring" }));
        // if (coralStartTime == 0) setCoralStartTime(Date.now());
      } else if (phrase=="scoring"){
        if(data.dropped){
          const event = {
            intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
            scoringLocation: undefined,
            failedScoring: true,
            dropped: true,
            timestampPickedUp: algaeStartTime,
            timestampScored: Date.now(),
          }; //scoring event creation.
          await dispatch(sendAlgaeEvent(event));
        } else {
          // if (coralEndTime == 0) setCoralEndTime(Date.now());
          dispatch(setAlgaeScoringLocation({ algaeScoringLocation: data.scoringLocation }));
          dispatch(setAlgaeActiveSide({ algaeActiveSide: "result" }));
        }
      } else if (phrase == "result") {
        const event = {
          intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
          scoringLocation: algaeScoringLocation as AlgaeScoringLocation,
          failedScoring: data.failedScoring,
          dropped: false,
          timestampPickedUp: algaeStartTime,
          timestampScored: algaeEndTime,
        }; //scoring event creation.
          await dispatch(sendAlgaeEvent(event));
      }
    }  
  }
)

export const handleAlgaeCancel = createAsyncThunk(
  "scores/handleAlgaeCancel",
  async (
    {
      phrase
    }: {
      phrase: 'intaking'|'scoring'|'result';
    },
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const {
      algaeActiveSide,
    } = state.scores;

    if(phrase==algaeActiveSide){
      if (phrase=="scoring"){
        dispatch(setAlgaeIntakeLocation({ algaeIntakeLocation: undefined }));
        dispatch(setAlgaeActiveSide({ algaeActiveSide: "intaking" }));   
      } else if (phrase=="result"){
        dispatch(setAlgaeScoringLocation({ algaeScoringLocation: undefined }));
        dispatch(setAlgaeActiveSide({ algaeActiveSide: "scoring" }));  
      }
    }  
  }
)

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
      canIntakeGroundCoral,
      canIntakeLollipopCoral,
      canIntakeStationCoral,
      canIntakeGroundAlgae,
      canIntakeLollipopAlgae,
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
      robotImage?: string;
      canIntakeGroundCoral?: boolean;
      canIntakeLollipopCoral?: boolean;
      canIntakeStationCoral?: boolean;
      canIntakeGroundAlgae?: boolean;
      canIntakeLollipopAlgae?: boolean;
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
      `/api/v1/teams/pitData/${teamNumber}`,
      {
        drivetrain: drivetrainInput,
        wheels: wheelsInput,
        intake: intakeInput,
        weight,
        hasAuton,
        comments,
        robotImage,
        canIntakeGroundCoral,
        canIntakeLollipopCoral,
        canIntakeStationCoral,
        canIntakeGroundAlgae,
        canIntakeLollipopAlgae,
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

//The following thunks create scoring events.
//UPDATE CYCLE (Client): Please ensure all scoring event models are accounted for, matching the format of the schema in the arguments.
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
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/coralEvent`,
      data
    );
    dispatch(resetCoral());
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
    { dispatch, getState }
  ) => {
    const state = getState() as ReduxState;
    const mainData = state.mainData;
    const res = await axios.post(
      `/api/v1/events/${mainData.activeEvent?.code}/matches/${
        mainData.activeMatchName
      }/scores/${mainData.station?.toLowerCase()}/algaeEvent`,
      data
    );
    dispatch(resetAlgae());
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
      }/scores/${mainData.station?.toLowerCase()}`);
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
  coralIntakeLocation: undefined,
  coralScoringLevel: undefined,
  coralScoringSide: undefined,
  coralActiveSide: 'level',
  coralStartTime: 0,
  coralEndTime: 0,
  algaeIntakeLocation: undefined,
  algaeScoringLocation: undefined,
  algaeActiveSide: 'intaking',
  algaeStartTime: 0,
  algaeEndTime: 0,
  incapOn: false,
  incapStartTime: 0,
  incapEndTime: 0,
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
    setCoralIntakeLocation: (
      state,
      action: PayloadAction<{
        coralIntakeLocation?: CoralIntakeLocation;
      }>
    ) => {
      state.coralIntakeLocation = action.payload.coralIntakeLocation;
    },
    setCoralScoringLevel: (
      state,
      action: PayloadAction<{
        coralScoringLevel?: CoralScoringLevel;
      }>
    ) => {
      state.coralScoringLevel = action.payload.coralScoringLevel;
    },
    setCoralScoringSide: (
      state,
      action: PayloadAction<{
        coralScoringSide?: CoralScoringSide;
      }>
    ) => {
      state.coralScoringSide = action.payload.coralScoringSide;
    },
    //Also sets start and end time if applicable.
    setCoralActiveSide: (
      state,
      action: PayloadAction<{
        coralActiveSide: 'intaking'|'level'|'side'|'result';
      }>
    ) => {
      state.coralActiveSide = action.payload.coralActiveSide;
      if(action.payload.coralActiveSide=='level'){
        state.coralStartTime = Date.now();
      }
      if((action.payload.coralActiveSide=='side'||action.payload.coralActiveSide=='result')&&state.coralEndTime==0){
        state.coralEndTime = Date.now();
      }
    },
    setAlgaeIntakeLocation: (
      state,
      action: PayloadAction<{
        algaeIntakeLocation?: AlgaeIntakeLocation;
      }>
    ) => {
      state.algaeIntakeLocation = action.payload.algaeIntakeLocation;
    },
    setAlgaeScoringLocation: (
      state,
      action: PayloadAction<{
        algaeScoringLocation?: AlgaeScoringLocation;
      }>
    ) => {
      state.algaeScoringLocation = action.payload.algaeScoringLocation;
    },
    //Also sets start and end time if applicable.
    setAlgaeActiveSide: (
      state,
      action: PayloadAction<{
        algaeActiveSide: 'intaking'|'scoring'|'result';
      }>
    ) => {
      state.algaeActiveSide = action.payload.algaeActiveSide;
      if(action.payload.algaeActiveSide=='intaking'){
        state.algaeStartTime = Date.now();
      }
      if(action.payload.algaeActiveSide=='result'){
        state.algaeEndTime = Date.now();
      }
    },
    //Also sets start and end time.
    enableIncap: (
      state
    ) => {
      state.incapOn = true;
      state.incapStartTime = Date.now();
    },
    resetIncap: (
      state
    ) => {
      state.incapOn = false;
      state.incapStartTime = 0;
    },
    resetCoral: (
      state
    ) => {
      state.coralActiveSide = "intaking";
      state.coralStartTime = 0;
      state.coralEndTime = 0;
      state.coralIntakeLocation = undefined;
      state.coralScoringLevel = undefined;
      state.coralScoringSide = undefined;
    },
    resetAlgae: (
      state
    ) => {
      state.algaeActiveSide = "intaking";
      state.algaeStartTime = 0;
      state.algaeIntakeLocation = undefined;
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
  setCoralIntakeLocation,
  setCoralScoringLevel,
  setCoralScoringSide,
  setCoralActiveSide,
  setAlgaeIntakeLocation,
  setAlgaeScoringLocation,
  setAlgaeActiveSide,
  enableIncap,
  resetIncap,
  resetCoral,
  resetAlgae,
  setEndgameType,
  setEndgameSuccess,
} = scoresSlice.actions;
export default scoresSlice.reducer;
