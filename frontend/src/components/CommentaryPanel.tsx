import React from "react";
import axios from "axios";
import { ScoreEvent, ExtraType } from "../types/ScoreEvent";

interface Props {
  matchId: string;
  ballCount: number;
  strikerId: string | null;
  bowlerId: string | null;
  onEvent: () => void;
}
const defaultExtras: ExtraType = {
  wide: 0,
  noBall: 0,
  bye: 0,
  legBye: 0,
  overthrow: 0,
};

const buttons = [
  { label: "0", type: "normal", extras: defaultExtras },
  { label: "1", type: "normal", extras: defaultExtras },
  { label: "2", type: "normal", extras: defaultExtras },
  { label: "3", type: "normal", extras: defaultExtras },
  { label: "4", type: "normal", extras: defaultExtras },
  { label: "6", type: "normal", extras: defaultExtras },
  { label: "Wicket", type: "wicket", extras: defaultExtras },
  {
    label: "Wide",
    type: "wide",
    extras: { wide: 1, noBall: 0, bye: 0, legBye: 0, overthrow: 0 },
  },
  {
    label: "NoBall",
    type: "noball",
    extras: { wide: 0, noBall: 1, bye: 0, legBye: 0, overthrow: 0 },
  },
  {
    label: "Bye",
    type: "bye",
    extras: { wide: 0, noBall: 0, bye: 1, legBye: 0, overthrow: 0 },
  },
  {
    label: "LegBye",
    type: "legbye",
    extras: { wide: 0, noBall: 0, bye: 0, legBye: 1, overthrow: 0 },
  },
  {
    label: "Overthrow",
    type: "overthrow",
    extras: { wide: 0, noBall: 0, bye: 0, legBye: 0, overthrow: 1 },
  },
];

export default function CommentaryPanel({
  matchId,
  ballCount,
  strikerId,
  bowlerId,
  onEvent,
}: Props) {
  const API = import.meta.env.VITE_API_URL;

  const send = async (btn: any) => {
    if (!strikerId || !bowlerId) {
      alert("Striker or bowler not set.");
      return;
    }

    const payload: ScoreEvent = {
      matchId,
      ballNumber: ballCount,
      type: btn.type,
      runs:
        btn.type === "normal"
          ? Number(btn.label)
          : btn.extras.overthrow ||
            btn.extras.noball ||
            btn.extras.wide ||
            btn.extras.bye ||
            btn.extras.legBye ||
            0,
      extras: btn.extras,
      batsmanId: strikerId,
      bowlerId: bowlerId,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${API}/event`, payload);
      onEvent(); // Callback only after successful post
    } catch (error) {
      console.error("Failed to post event:", error);
    }
  };

  return (
    <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {buttons.map((b) => (
        <button
          key={b.label}
          onClick={() => send(b)}
          className="w-full py-4 bg-gray-200 rounded text-center cursor-pointer"
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
