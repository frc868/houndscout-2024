//A bunch of enums used throughout the program.
import {
  TeamScore,
  CoralScoringEvent,
  AlgaeScoringEvent,
  IncapSegment,
  DrivetrainType,
  WheelType,
  IntakeType,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export enum Alliance {
  RED,
  BLUE,
}

//UPDATE CYCLE: Ensure this interface reflects the rankings API. Update imports as needed as well.
export interface Ranking {
  teamnumber: number;
  teamname: string;
  teamScores: (TeamScore & {
    CoralScoringEvents: CoralScoringEvent[];
    AlgaeScoringEvents: AlgaeScoringEvent[];
    incapSegments: IncapSegment[];
  })[];
  firstpicklist: boolean;
  secondpicklist: boolean;
  mobility: number;
  coraldropped: number;
  algaedropped: number;
  endgameparked: number;
  endgameshallow: number;
  endgamedeep: number;
  incap: number;
  defense: number;
  driverskill: number;
  totalgames: number;
  drivetrain?: DrivetrainType | null;
  wheels?: WheelType | null;
  intake?: IntakeType | null;
  weight?: Decimal | null;
  hasauton?: boolean | null;
  comments?: string | null;
  robotimage?: string | null;
  canintakegroundcoral?: boolean | null;
  canintakestationcoral?: boolean | null;
  canintakegroundalgae?: boolean | null;
  canintakereefalgae?: boolean | null;
  canremovereefalgaewithoutintake?: boolean | null;
  canscorereefl1?: boolean | null;
  canscorereefl2?: boolean | null;
  canscorereefl3?: boolean | null;
  canscorereefl4?: boolean | null;
  canscorenet?: boolean | null;
  canscoreprocessor?: boolean | null;
  canpark?: boolean | null;
  canshallow?: boolean | null;
  candeep?: boolean | null;
  coralpermatch?: number | null;
  coralaccuracy?: number | null;
  coralcycletime?: number | null;
  algaepermatch?: number | null;
  algaeaccuracy?: number | null;
  algaecycletime?: number | null;
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
  active: boolean;
}

export interface Team {
  id: number;
  number: number;
  name: string;
  location: string;
  events?: Event[];
  teamScores: (TeamScore & {
    CoralScoringEvents: CoralScoringEvent[];
    AlgaeScoringEvents: AlgaeScoringEvent[];
    incapSegments: IncapSegment[];
  })[];
  firstPicklist: boolean;
  secondPicklist: boolean;
}

export interface Heartbeat {
  time: number;
  section: string;
}


export interface DetailedTeamScore extends TeamScore {
  teamNumber: number;
  scouterName: string;
  station: string;
  matchName: string;
  coralLevel1: number;
  coralLevel1Scored: number;
  coralLevel2: number;
  coralLevel2Scored: number;
  coralLevel3: number;
  coralLevel3Scored: number;
  coralLevel4: number;
  coralLevel4Scored: number;
  algaeNet: number;
  algaeNetScored: number;
  algaeProcessor: number;
  algaeProcessorScored: number;
  coralDropped: number;
  algaeDropped: number;
  totalIncapTime: number;
}