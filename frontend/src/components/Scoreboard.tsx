import React, { useEffect, useState } from "react";
import axios from "axios";

interface Batsman {
  _id: string;
  name: string;
  runs: number;
  balls: number;
}

interface Bowler {
  _id: string;
  name: string;
  overs?: number;
  balls?: number;
  runsConceded?: number;
  wickets?: number;
}

interface MatchProps {
  match: {
    teamA: { _id: string; name: string };
    teamB: { _id: string; name: string };
    totalRuns: number;
    wickets: number;
    balls: number;
    extras: {
      wide: number;
      noBall: number;
      bye: number;
      legBye: number;
    };
  } | null;
  strikerPlayer: Batsman | null;
  nonStrikerPlayer: Batsman | null;
  currentBowler: Bowler | null;
}

const API = import.meta.env.VITE_API_URL;

export default function Scoreboard({
  match,
  strikerPlayer,
  nonStrikerPlayer,
  currentBowler,
}: MatchProps) {
  

  if (!match) {
    return (
      <div className="border p-4 rounded-lg shadow-sm bg-white text-center">
        Loading score…
      </div>
    );
  }

  const battingTeam = match.teamA.name;
  const bowlingTeam = match.teamB.name;
  const overs = `${Math.floor(match.balls / 6)}.${match.balls % 6}`;
  const bOvers = `${Math.floor(currentBowler?.balls / 6)}.${currentBowler.balls % 6}`;

  const rpo =
    match.balls > 0 ? (match.totalRuns / (match.balls / 6)).toFixed(2) : "0.00";

  return (
    <div className="border p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center">Scorecard</h2>

      <div className="flex justify-between items-center mb-3 p-3 bg-green-50 rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">
              Batting
            </span>
            <span className="text-lg font-semibold">{battingTeam}</span>
          </div>
          <div className="text-sm text-gray-700">
            🧢 {strikerPlayer?.name}* &nbsp; &nbsp; {strikerPlayer?.runs} /{" "}
            {strikerPlayer?.balls} <br /> {nonStrikerPlayer?.name} &nbsp; &nbsp;{" "}
            {nonStrikerPlayer?.runs} / {nonStrikerPlayer?.balls}
          </div>
        </div>
        <div className="text-xl font-mono">
          {match.totalRuns} / {match.wickets}
        </div>
        <div className="text-sm text-gray-600">{overs} overs</div>
      </div>

      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-sm">
              Bowling
            </span>
            <span className="text-lg font-semibold">{bowlingTeam}</span>
          </div>
          <div className="text-sm text-gray-700">
            🎯 {currentBowler?.name} &nbsp; &nbsp; {currentBowler?.wickets} /{" "}
            {currentBowler?.runsConceded} &nbsp; &nbsp; ( {bOvers}{" "}
            )
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Extras: W {match.extras.wide}, NB {match.extras.noBall}, B{" "}
          {match.extras.bye}, LB {match.extras.legBye}
        </div>
        <div className="text-sm text-gray-700">RR: {rpo}</div>
      </div>
    </div>
  );
}
