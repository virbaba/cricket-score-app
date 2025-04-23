// models/Bowler.ts
import { Schema, model, Types } from 'mongoose';

interface Bowler {
  teamId: Types.ObjectId;
  name: string;
  overs: number;
  balls: number;
  wickets: number;
  runsConceded: number;
}

const BowlerSchema = new Schema<Bowler>({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  name: { type: String, required: true },
  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 }
});

export default model<Bowler>('Bowler', BowlerSchema);
