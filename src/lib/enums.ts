//A bunch of enums used throughout the program.
import {
  TeamScore,
  CoralScoringEvent,
  AlgaeScoringEvent,
  IncapSegment
} from "@prisma/client";

export enum Alliance {
  RED,
  BLUE,
}

//UPDATE CYCLE: Ensure this interface reflects the rankings API. Update imports as needed as well.
export interface Ranking {
  teamNumber: number;
  teamName: string;
  teamScores: (TeamScore & {
    CoralScoringEvents: CoralScoringEvent[];
    AlgaeScoringEvents: AlgaeScoringEvent[];
    incapSegments: IncapSegment[];
  })[];
  mobility: number;
  CoralLevel1Scored: number;
  CoralLevel2Scored: number;
  CoralLevel3Scored: number;
  CoralLevel4Scored: number;
  AlgaeNetScored: number;
  AlgaeProcessorScored: number;
  CoralLevel1Attempted: number;
  CoralLevel2Attempted: number;
  CoralLevel3Attempted: number;
  CoralLevel4Attempted: number;
  AlgaeNetAttempted: number;
  AlgaeProcessorAttempted: number;
  CoralDropped: number;
  AlgaeDropped: number;
  CoralAutoStation1Intaked: number;
  CoralAutoGround1Intaked: number;
  CoralAutoGround2Intaked: number;
  CoralAutoGround3Intaked: number;
  CoralAutoStation2Intaked: number;
  CoralTeleopGroundIntaked: number;
  CoralTeleopStationIntaked: number;
  AlgaeAutoGround1Intaked: number;
  AlgaeAutoGround2Intaked: number;
  AlgaeAutoGround3Intaked: number;
  AlgaeAutoReef1Intaked: number;
  AlgaeAutoReef2Intaked: number;
  AlgaeAutoReef3Intaked: number;
  AlgaeAutoReef4Intaked: number;
  AlgaeAutoReef5Intaked: number;
  AlgaeAutoReef6Intaked: number;
  AlgaeTeleopGroundIntaked: number;
  AlgaeTeleopReefIntaked: number;
  CoralAutoSide1Scored: number;
  CoralAutoSide2Scored: number;
  CoralAutoSide3Scored: number;
  CoralAutoSide4Scored: number;
  CoralAutoSide5Scored: number;
  CoralAutoSide6Scored: number;
  CoralAutoSide1Attempted: number;
  CoralAutoSide2Attempted: number;
  CoralAutoSide3Attempted: number;
  CoralAutoSide4Attempted: number;
  CoralAutoSide5Attempted: number;
  CoralAutoSide6Attempted: number;
  parked: number;
  shallow: number;
  deep: number;
  incap: number;
  defense: number;
  total: number;
}

export interface Match {
  id: number;
  name: string;
  number: number;
  teamNumbers: {
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number;
  };
  scouters: {
    red1: Scouter;
    red2: Scouter;
    red3: Scouter;
    blue1: Scouter;
    blue2: Scouter;
    blue3: Scouter;
  };
}

export interface Scouter {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  number: number;
  name: string;
  location: string;
  events?: Event[];
}

export interface Heartbeat {
  time: number;
  section: string;
}
