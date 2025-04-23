// models/Batsman.ts
import { Schema, model, Types } from "mongoose";

interface Batsman {
  teamId: Types.ObjectId;
  name: string;
  runs: number;
  balls: number;
  out: boolean;
}

const BatsmanSchema = new Schema<Batsman>({
  teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  name: { type: String, required: true },
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  out: { type: Boolean, default: false },
});

export default model<Batsman>("Batsman", BatsmanSchema);
