import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prediction, WinnerPick } from "@/lib/api/types";
import { toast } from "sonner";
import { translate } from "@/i18n";
import { getLocale } from "@/lib/store/locale-store";
import { isPredictionLocked } from "@/lib/utils/match-status";
import { ALL_FIXTURES } from "@/data/mock/fixtures";

const QUICK_PICK_SCORES: Record<WinnerPick, { homeScore: number; awayScore: number }> = {
  home: { homeScore: 1, awayScore: 0 },
  away: { homeScore: 0, awayScore: 1 },
  draw: { homeScore: 1, awayScore: 1 },
};

interface PredictionStore {
  predictions: Record<number, Prediction>;
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  savePrediction: (prediction: Prediction) => boolean;
  saveWinnerPick: (fixtureId: number, pick: WinnerPick) => boolean;
  getPrediction: (fixtureId: number) => Prediction | undefined;
  getAllPredictions: () => Prediction[];
}

export const usePredictionStore = create<PredictionStore>()(
  persist(
    (set, get) => ({
      predictions: {},
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      savePrediction: (prediction) => {
        const fixture = ALL_FIXTURES.find((f) => f.id === prediction.fixtureId);
        if (fixture && isPredictionLocked(fixture)) {
          toast.error(translate(getLocale(), "prediction.lockedError"));
          return false;
        }
        set((state) => ({
          predictions: {
            ...state.predictions,
            [prediction.fixtureId]: { ...prediction, savedAt: new Date().toISOString() },
          },
        }));
        toast.success(translate(getLocale(), "prediction.saved"));
        return true;
      },
      saveWinnerPick: (fixtureId, pick) => {
        const { homeScore, awayScore } = QUICK_PICK_SCORES[pick];
        return get().savePrediction({
          fixtureId,
          homeScore,
          awayScore,
          winnerPick: pick,
          savedAt: new Date().toISOString(),
        });
      },
      getPrediction: (fixtureId) => get().predictions[fixtureId],
      getAllPredictions: () => Object.values(get().predictions),
    }),
    {
      name: "wc2026-predictions",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export function getWinnerPickFromPrediction(
  prediction?: Prediction
): WinnerPick | undefined {
  if (!prediction) return undefined;
  if (prediction.winnerPick) return prediction.winnerPick;
  if (prediction.homeScore > prediction.awayScore) return "home";
  if (prediction.awayScore > prediction.homeScore) return "away";
  return "draw";
}
