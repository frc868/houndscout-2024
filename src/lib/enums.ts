//A bunch of enums used throughout the program
import { TeamScore, AutoCoralScoringEvent, AutoAlgaeScoringEvent, TeleopCoralScoringEvent, TeleopAlgaeScoringEvent, IncapSegment } from "@prisma/client";

export enum Alliance {
  RED,
  BLUE,
}

export interface Ranking {
  teamNumber: number;
  teamName: string;
  teamScores: (TeamScore & {
    autoCoralScoringEvents: AutoCoralScoringEvent[];
    autoAlgaeScoringEvents: AutoAlgaeScoringEvent[];
    teleopCoralScoringEvents: TeleopCoralScoringEvent[];
    teleopAlgaeScoringEvents: TeleopAlgaeScoringEvent[];
    incapSegments: IncapSegment[];
  })[];
  mobility: number;
  autoCoralLevel1Scored: number;
  autoCoralLevel2Scored: number;
  autoCoralLevel3Scored: number;
  autoCoralLevel4Scored: number;
  autoAlgaeNetScored: number;
  autoAlgaeProcessorScored: number;
  teleopCoralLevel1Scored: number;
  teleopCoralLevel2Scored: number;
  teleopCoralLevel3Scored: number;
  teleopCoralLevel4Scored: number;
  teleopAlgaeNetScored: number;
  teleopAlgaeProcessorScored: number;
  parked: number;
  shallow: number;
  deep: number;
  incap: number;
  defense: number;
  total: number;
}

export interface Match {
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
  events?: Event[];
}

export interface Heartbeat {
  time: number;
  section: string;
}