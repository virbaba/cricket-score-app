import Match from "../models/Match";
import ScoreEvent from "../models/ScoreEvent";
import Batsman from "../models/batsman";
import Bowler from "../models/bowler";

// this service run on each ball mean track of each ball
export async function addScoreEvent(data: any) {
  //  Create the event record
  const event = await ScoreEvent.create(data);

  //  Fetch the match
  const match = await Match.findById(data.matchId);
  if (!match) throw new Error("Match not found");

  //  Determine if this was an illegal delivery
  const isIllegal = data.extras.noBall > 0 || data.extras.wide > 0;

  //  Increment match ball count on legal delivery
  if (!isIllegal) {
    match.balls++;
  }

  //  Tally extras into match
  match.extras.wide += data.extras.wide;
  match.extras.noBall += data.extras.noBall;
  match.extras.bye += data.extras.bye;
  match.extras.legBye += data.extras.legBye;
  match.extras.overthrow += data.extras.overthrow;

  //  Add total runs (bat runs + extras)
  const totalRuns =
    data.runs +
    data.extras.wide +
    data.extras.noBall +
    data.extras.bye +
    data.extras.legBye +
    data.extras.overthrow;
  match.totalRuns += totalRuns;

  //  If it was a wicket, increment match wickets
  if (data.type === "wicket") {
    match.wickets++;
  }

  //  Update the batsman record
  const batsman = await Batsman.findById(data.batsmanId);
  if (batsman) {
    const legalDelivery = !isIllegal;

    //  If a wicket, mark him out
    if (data.type === "wicket") {
      batsman.out = true;
    }

    //  Only update balls faced on legal or bat-contact no-balls
    if (data.extras.wide === 0) {
      if (legalDelivery || (data.extras.noBall && data.runs > 0)) {
        batsman.balls++;
      }
    }

    //  Add bat runs (excluding byes/leg byes)
    if (data.runs > 0 && data.extras.bye === 0 && data.extras.legBye === 0) {
      batsman.runs += data.runs;
    }

    await batsman.save();
  }

  //  Update the bowler record
  const bowler = await Bowler.findById(data.bowlerId);
  if (bowler) {
    const legalDelivery = !isIllegal;

    //  Concede all bat runs + wides + no-balls + overthrows
    bowler.runsConceded +=
      data.runs + data.extras.wide + data.extras.noBall + data.extras.overthrow;

    // Increment bowler balls/overs on legal delivery
    if (legalDelivery) {
      bowler.balls++;
      if (bowler.balls === 6) {
        bowler.overs++;
        bowler.balls = 0;
      }
    }

    //  If wicket, credit wicket of the bowler
    if (data.type === "wicket") {
      bowler.wickets++;
    }

    await bowler.save();
  }

  //  Save match and return
  await match.save();
  return { event, match };
}

export async function getMatch(matchId: string) {
  return await Match.findById(matchId);
}

// returning ball by ball event in lifo order
export async function getEvents(matchId: string) {
  return await ScoreEvent.find({ matchId }).sort({ ballNumber: 1 }); // LIFO: latest events first
}
