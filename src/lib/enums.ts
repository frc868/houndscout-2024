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
  driverSkill: number;
  total: number;
  drivetrain?: DrivetrainType | null;
  wheels?: WheelType | null;
  intake?: IntakeType | null;
  weight?: Decimal | null;
  hasAuton?: boolean | null;
  comments?: string | null;
  canIntakeGroundCoral?: boolean | null;
  canIntakeStationCoral?: boolean | null;
  canIntakeGroundAlgae?: boolean | null;
  canIntakeReefAlgae?: boolean | null;
  canRemoveReefAlgaeWithoutIntake?: boolean | null;
  canScoreReefL1?: boolean | null;
  canScoreReefL2?: boolean | null;
  canScoreReefL3?: boolean | null;
  canScoreReefL4?: boolean | null;
  canScoreNet?: boolean | null;
  canScoreProcessor?: boolean | null;
  canPark?: boolean | null;
  canShallow?: boolean | null;
  canDeep?: boolean | null;
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
