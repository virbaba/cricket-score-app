export type ExtraType = {
  wide: number;
  noBall: number;
  bye: number;
  legBye: number;
  overthrow: number;
};

export type ScoreEventType =
  | "normal"
  | "overthrow"
  | "bye"
  | "legbye"
  | "noball"
  | "wide"
  | "wicket";

export interface ScoreEvent {
  _id?: string;
  matchId: string;
  ballNumber: number;
  type: ScoreEventType;
  runs: number;
  extras: ExtraType;
  batsmanId?: string;
  bowlerId: string;
  timestamp: string;
  wicketInfo?: string;
}
