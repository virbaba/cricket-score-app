// models/Match.ts
import { Schema, model, Types } from 'mongoose';

interface Match {
  teamA: Types.ObjectId;
  teamB: Types.ObjectId;
  totalRuns: number;
  wickets: number;
  balls: number;
  extras: {
    wide: number;
    noBall: number;
    bye: number;
    legBye: number;
    overthrow: number;
  };
}

const MatchSchema = new Schema<Match>({
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalRuns: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  extras: {
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
    bye: { type: Number, default: 0 },
    legBye: { type: Number, default: 0 },
    overthrow: { type: Number, default: 0 }
  }
});

export default model<Match>('Match', MatchSchema);