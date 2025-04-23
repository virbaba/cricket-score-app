// models/ScoreEvent.ts
import { Schema, model, Types } from 'mongoose';

interface ScoreEvent {
  matchId: Types.ObjectId;
  batsmanId: Types.ObjectId;
  bowlerId: Types.ObjectId;
  runs: number;
  type: 'normal' | 'wicket' | 'bye' | 'legbye' | 'noball' | 'wide' | 'overthrow';
  extras: {
    wide: number;
    noBall: number;
    bye: number;
    legBye: number;
    overthrow: number;
  };
  timestamp: Date;
}

const ScoreEventSchema = new Schema<ScoreEvent>({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  batsmanId: { type: Schema.Types.ObjectId, ref: 'Batsman', required: true },
  bowlerId: { type: Schema.Types.ObjectId, ref: 'Bowler', required: true },
  runs: { type: Number, required: true },
  type: { type: String, enum: ['normal', 'wicket', 'bye', 'legbye', 'noball', 'wide', 'overthrow'], required: true },
  extras: {
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
    bye: { type: Number, default: 0 },
    legBye: { type: Number, default: 0 },
    overthrow: { type: Number, default: 0 }
  },
  timestamp: { type: Date, default: Date.now }
});

export default model<ScoreEvent>('ScoreEvent', ScoreEventSchema);