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
  firstPicklist: boolean;
  secondPicklist: boolean;
  mobility: number;
  CoralDropped: number;
  AlgaeDropped: number;
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
