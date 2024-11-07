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
