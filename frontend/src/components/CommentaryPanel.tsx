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

const generateButtons = () => {
  const buttons: {
    label: string;
    type: string;
    runs: number;
    extras: ExtraType;
  }[] = [];

  const runOptions = [0, 1, 2, 3, 4, 6];

  // Normal deliveries and with overthrow
  runOptions.forEach((run) => {
    buttons.push({
      label: `${run}`,
      type: "normal",
      runs: run,
      extras: { wide: 0, noBall: 0, bye: 0, legBye: 0, overthrow: 0 },
    });

    buttons.push({
      label: `${run} + Overthrow`,
      type: "normal",
      runs: run + 1,
      extras: { wide: 0, noBall: 0, bye: 0, legBye: 0, overthrow: 1 },
    });
  });

  // Complex extras
  const flags = [0, 1];
  flags.forEach((w) => {
    flags.forEach((nb) => {
      flags.forEach((bye) => {
        flags.forEach((legBye) => {
          flags.forEach((ot) => {
            const total = w + nb + bye + legBye + ot;
            if (total === 0) return; // skip plain zero
            const extras: ExtraType = {
              wide: w,
              noBall: nb,
              bye,
              legBye,
              overthrow: ot,
            };

            let type = "normal";
            if (w) type = "wide";
            else if (nb) type = "noball";
            else if (bye) type = "bye";
            else if (legBye) type = "legbye";

            const parts = [];
            if (nb) parts.push("NoBall");
            if (w) parts.push("Wide");
            if (bye) parts.push("Bye");
            if (legBye) parts.push("LegBye");
            if (ot) parts.push("Overthrow");

            buttons.push({
              label: parts.join(" + "),
              type,
              runs: 1,
              extras,
            });
          });
        });
      });
    });
  });

  // Wicket
  buttons.push({
    label: "Wicket",
    type: "wicket",
    runs: 0,
    extras: { wide: 0, noBall: 0, bye: 0, legBye: 0, overthrow: 0 },
  });

  return buttons;
};

export default function CommentaryPanel({
  matchId,
  ballCount,
  strikerId,
  bowlerId,
  onEvent,
}: Props) {
  const API = import.meta.env.VITE_API_URL;
  const buttons = generateButtons();

  const send = async (btn: {
    label: string;
    type: string;
    runs: number;
    extras: ExtraType;
  }) => {
    if (!strikerId || !bowlerId) {
      alert("Striker or bowler not set.");
      return;
    }

    const payload: ScoreEvent = {
      matchId,
      ballNumber: ballCount,
      type: btn.type,
      runs: btn.runs,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[80vh] overflow-y-auto p-2">
      {buttons.map((b) => (
        <button
          key={b.label + JSON.stringify(b.extras)}
          onClick={() => send(b)}
          className="w-full py-3 px-4 bg-blue-100 hover:bg-blue-200 rounded-xl shadow text-center font-semibold cursor-pointer"
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
