// src/routes/score.routes.ts
import { Router } from "express";
import {
  createTeam,
  getTeams,
  getTeamById,

  createMatch,
  getMatches,
  getMatchById,

  createBatsman,
  getBatsmen,

  createBowler,
  getBowlers,
  
  recordEvent,
  getEventList,
  updateScoreEvent,
} from "../controllers/match.controller";

const router = Router();

// Team
router.post("/team", createTeam);
router.get("/teams", getTeams);
router.get("/team/:id", getTeamById);

// Match
router.post("/match", createMatch);
router.post("/matches", getMatches);
router.get("/match/:id", getMatchById);

// Batsman
router.post("/batsman", createBatsman);
router.get("/batsmen/:batsmanId", getBatsmen);

// Bowler
router.post("/bowler", createBowler);
router.get("/bowlers/:bowlerId", getBowlers);

// ScoreEvent
router.post("/event", recordEvent);
router.get("/events/:matchId", getEventList);
// update a single event
router.put("/event/:id", updateScoreEvent);

export default router;
