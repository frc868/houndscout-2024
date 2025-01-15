import { TeamScore, TeleopScoringEvent, IncapSegment } from "@prisma/client";

export enum Alliance {
  RED,
  BLUE,
}

export interface Ranking {
  teamNumber: number;
  teamName: string;
  teamScores: (TeamScore & {
    teleopScoringEvents: TeleopScoringEvent[];
    incapSegments: IncapSegment[];
  })[];
  mobility: number;
  autoSpeaker: number;
  autoMisses: number;
  speaker: number;
  speakerMisses: number;
  amp: number;
  ampMisses: number;
  pass: number;
  passMisses: number;
  climb: number;
  ensemble: number;
  trap: number;
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