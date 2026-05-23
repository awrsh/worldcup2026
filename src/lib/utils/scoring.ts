import type { Prediction } from "@/lib/api/types";

export interface ScoreResult {
  points: number;
  exactScore: boolean;
  correctWinner: boolean;
  correctDraw: boolean;
  correctGoalDifference: boolean;
}

export function calculatePredictionPoints(
  prediction: Prediction,
  actualHome: number,
  actualAway: number
): ScoreResult {
  const predDiff = prediction.homeScore - prediction.awayScore;
  const actualDiff = actualHome - actualAway;

  const exactScore = prediction.homeScore === actualHome && prediction.awayScore === actualAway;
  const isDraw = actualHome === actualAway;
  const predDraw = prediction.homeScore === prediction.awayScore;
  const correctDraw = isDraw && predDraw && !exactScore;
  const correctWinner =
    !exactScore &&
    !correctDraw &&
    ((predDiff > 0 && actualDiff > 0) || (predDiff < 0 && actualDiff < 0));
  const correctGoalDifference =
    !exactScore &&
    !correctDraw &&
    !correctWinner &&
    predDiff === actualDiff;

  let points = 0;
  if (exactScore) points = 5;
  else if (correctDraw || correctWinner) points = 3;
  else if (correctGoalDifference) points = 2;

  return { points, exactScore, correctWinner, correctDraw, correctGoalDifference };
}

export function getPredictedWinner(homeScore: number, awayScore: number): "home" | "away" | "draw" {
  if (homeScore > awayScore) return "home";
  if (awayScore > homeScore) return "away";
  return "draw";
}
