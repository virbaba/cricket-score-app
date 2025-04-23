// models/Team.ts
import { Schema, model } from 'mongoose';

interface Team {
  name: string;
}

const TeamSchema = new Schema<Team>({
  name: { type: String, required: true },
});

export default model<Team>('Team', TeamSchema);