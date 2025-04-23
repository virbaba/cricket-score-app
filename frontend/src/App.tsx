import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentaryPanel from "./components/CommentaryPanel";
import Scoreboard from "./components/Scoreboard";
import PlayerStats from "./components/PlayerStats";
import BowlerStats from "./components/BowlerStats";
import BallByBall from "./components/BallByBall";
import { ScoreEvent } from "./types/ScoreEvent";

const API = import.meta.env.VITE_API_URL;

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

function App() {
  const [matchId, setMatchId] = useState<string>("");
  const [events, setEvents] = useState<ScoreEvent[]>([]);
  const [match, setMatch] = useState<any>(null);
  const [strikerPlayer, setStrikerPlayer] = useState<string | null>(null);
  const [nonStrikerPlayer, setNonStrikerPlayer] = useState<string | null>(null);
  const [currentBowler, setCurrentBowler] = useState<string | null>(null);
  const [batsmans, setBatsmans] = useState<Batsman[] | null>(null);
  const [bowlers, setBowlers] = useState<Bowler[] | null>(null);

  const teamA = "Royal Challanger Banglore";
  const teamB = "Sunrise Hyderabad";

  const fullStriker =
    batsmans?.find((b) => b._id === strikerPlayer?._id) || null;
  const fullNonStriker =
    batsmans?.find((b) => b._id === nonStrikerPlayer?._id) || null;
  const fullBowler = bowlers?.find((b) => b._id === currentBowler?._id) || null;

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.post(`${API}/matches`, { teamA, teamB });
        setMatchId(res.data._id);
      } catch (err) {
        console.error("Failed to fetch match by team names:", err);
      }
    };

    fetchMatch();
  }, []);

  useEffect(() => {
    if (!matchId) return;

    const fetchData = async () => {
      try {
        const [matchRes, eventsRes] = await Promise.all([
          axios.get(`${API}/match/${matchId}`),
          axios.get(`${API}/events/${matchId}`),
        ]);

        const matchData = matchRes.data;
        const eventsData = eventsRes.data;

        setBatsmans(matchData.batsmen);
        setBowlers(matchData.bowler);
        // Logic to determine striker, non-striker, and current bowler
        if (matchData?.batsmen?.length >= 2) {
          setStrikerPlayer(matchData.batsmen[0]);
          setNonStrikerPlayer(matchData.batsmen[1]);
        }

        if (matchData?.bowler) {
          setCurrentBowler(matchData.bowler[0]);
        }

        setMatch(matchData);
        setEvents(eventsData);
      } catch (err) {
        console.error("Failed to fetch match or events:", err);
      }
    };

    fetchData();
  }, [matchId]);

  const refresh = async () => {
    try {
      const [matchRes, eventsRes] = await Promise.all([
        axios.get(`${API}/match/${matchId}`),
        axios.get(`${API}/events/${matchId}`),
      ]);

      const matchData = matchRes.data;
      const eventsData = eventsRes.data;

      setMatch(matchData);
      setEvents(eventsData);
      setBatsmans(matchData.batsmen);
      setBowlers(matchData.bowler);

      // fetching last balls event
      const lastBall = eventsData[eventsData.length - 1];
      

      if (!lastBall) return;

      // Handle strike rotation only for legal deliveries
      const isLegal =
        lastBall.extras.noBall === 0 && lastBall.extras.wide === 0;

      if (isLegal && lastBall.runs % 2 === 1) {
        setStrikerPlayer((prev) => {
          const temp = strikerPlayer;
          setStrikerPlayer(nonStrikerPlayer);
          setNonStrikerPlayer(temp);
          return nonStrikerPlayer;
        });
      }
    } catch (err) {
      console.error("Failed to refresh data:", err);
    }
  };

  return (
    <div className="p-2 mx-auto  space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        {teamA} <span className="text-gray-500">vs</span> {teamB}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {matchId && (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Add Ball Commentary
              </h2>
              <CommentaryPanel
                matchId={matchId}
                ballCount={events.length + 1}
                strikerId={strikerPlayer}
                bowlerId={currentBowler}
                onEvent={refresh}
              />
            </div>
          )}
        </div>

        <div className=" space-y-4">
          <Scoreboard
            match={match?.match}
            strikerPlayer={fullStriker}
            nonStrikerPlayer={fullNonStriker}
            currentBowler={fullBowler}
          />

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <PlayerStats batsmen={batsmans} />
            <BowlerStats bowlers={bowlers} />
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <BallByBall events={events} onEdit={refresh} />
      </div>
    </div>
  );
}

export default App;
