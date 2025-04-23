// src/controllers/match.controller.ts
import { Request, Response, NextFunction } from "express";
import Team from "../models/Team";
import Match from "../models/Match";
import Batsman from "../models/batsman";
import Bowler from "../models/bowler";
import { addScoreEvent, getMatch, getEvents } from "../services/score.service";
import ScoreEvent from "../models/ScoreEvent";

// creating team by name
export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const team = await Team.create({ name });
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

// help to get all Teams
export const getTeams = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

// finding team by id
export const getTeamById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });
    return res.json(team);
  } catch (err) {
    next(err);
  }
};

// creating match by providing two team name
export const createMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { teamA, teamB } = req.body;

    // Step 1: Find both teams by name
    const teamAData = await Team.findOne({ name: teamA });
    const teamBData = await Team.findOne({ name: teamB });

    if (!teamAData || !teamBData) {
      return res.status(404).json({
        message: "One or both teams not found",
      });
    }

    // Step 2: Create match using ObjectIds
    const match = await Match.create({
      teamA: teamAData._id,
      teamB: teamBData._id,
    });

    res.status(201).json(match);
  } catch (err) {
    next(err);
  }
};

export const getMatches = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { teamA, teamB } = req.body;

    // Step 1: Find both teams by name
    const teamAData = await Team.findOne({ name: teamA });
    const teamBData = await Team.findOne({ name: teamB });

    if (!teamAData || !teamBData) {
      return res.status(404).json({ message: "One or both teams not found" });
    }

    // Step 2: Find the match using team IDs
    const match = await Match.findOne({
      teamA: teamAData._id,
      teamB: teamBData._id,
    })
      .populate("teamA", "name")
      .populate("teamB", "name");

    if (!match) {
      return res
        .status(404)
        .json({ message: "Match not found between the specified teams" });
    }

    res.json(match);
  } catch (err) {
    next(err);
  }
};

export const getMatchById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // 1. Fetch & populate the match
    const match = await getMatch(req.params.id);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    await match.populate("teamA", "name");
    await match.populate("teamB", "name");

    // 2. Get first two batsmen of Team A
    const batsmen = await Batsman.find({
      teamId: match.teamA._id,
      // matchId: match._id      // uncomment if you track per‑match
    })
      .select("_id name runs balls")
      .limit(2);

    // 3. Get one bowler of Team B
    const bowler = await Bowler.find({
      teamId: match.teamB._id,
      // matchId: match._id      // uncomment if you track per‑match
    }).select("_id name overs balls wickets runsConceded");

    // 4. Return everything together
    return res.json({
      match,
      batsmen,
      bowler,
    });
  } catch (err) {
    next(err);
  }
};

// creating batsman belong to particular team
export const createBatsman = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { teamName, batsmanName } = req.body;

    //  Find the team by name
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    //  Create the batsman with the teamId
    const batsman = await Batsman.create({
      teamId: team._id,
      name: batsmanName,
    });

    res.status(201).json(batsman);
  } catch (err) {
    next(err);
  }
};

export const getBatsmen = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const batsman = await Batsman.findById(req.params.batsmanId);
    if (!batsman) {
      return res.status(404).json({ message: "Batsman not found" });
    }
    res.json(batsman);
  } catch (err) {
    next(err);
  }
};

// // creating bowler belong to particular team
export const createBowler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { teamName, bowlerName } = req.body;

    // Find the team by name
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    //  Create the bowler with the teamId
    const bowler = await Bowler.create({
      teamId: team._id,
      name: bowlerName,
    });

    res.status(201).json(bowler);
  } catch (err) {
    next(err);
  }
};

export const getBowlers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const bowler = await Bowler.findById(req.params.bowlerId);
    if (!bowler) {
      return res.status(404).json({ message: "Bowler not found" });
    }
    res.json(bowler);
  } catch (err) {
    next(err);
  }
};

// ScoreEvent Controllers
export const recordEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await addScoreEvent(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getEventList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getEvents(req.params.matchId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

export async function updateScoreEvent(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // updating commentry record
    const updated = await ScoreEvent.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json({ event: updated });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
