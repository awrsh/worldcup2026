import type { Prediction, WinnerPick } from "@/lib/api/types";
import { apiFetch } from "./http";

type WinnerPickPayload = {
  fixtureId: number;
  pick: WinnerPick;
};

export type PredictionRow = {
  fixtureId: number;
  matchName: string;
  groupName: string | null;
  kickoffAt: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  savedAt: string;
};

function rowToPrediction(row: PredictionRow): Prediction {
  return {
    fixtureId: row.fixtureId,
    homeScore: row.predictedHomeScore,
    awayScore: row.predictedAwayScore,
    savedAt: row.savedAt,
  };
}

export async function saveWinnerPick(fixtureId: number, pick: WinnerPick): Promise<Prediction> {
  const row = await apiFetch<PredictionRow>("/predictions/winner-pick", {
    method: "POST",
    body: JSON.stringify({ fixtureId, pick } satisfies WinnerPickPayload),
  });
  return rowToPrediction(row);
}

export async function fetchMyPredictions(): Promise<Record<number, Prediction>> {
  const rows = await apiFetch<PredictionRow[]>("/predictions/me");
  return Object.fromEntries(rows.map((row) => [row.fixtureId, rowToPrediction(row)]));
}
