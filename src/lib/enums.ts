export enum Alliance {
  RED,
  BLUE,
}

export interface Ranking {
  team: number;
  mobility: number;
  autoSpeaker: number;
  autoMisses: number;
  speaker: number;
  speakerMisses: number;
  amp: number;
  ampMisses: number;
  climb: number;
  ensemble: number;
  trap: number;
  incap: number;
  defense: number;
}
