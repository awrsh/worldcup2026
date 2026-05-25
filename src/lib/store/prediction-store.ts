import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prediction, WinnerPick } from "@/lib/api/types";
import { fetchMyPredictions, saveWinnerPick } from "@/lib/api/predictions-api";
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
  _syncing: boolean;
  setHasHydrated: (v: boolean) => void;
  syncFromServer: () => Promise<void>;
  savePrediction: (prediction: Prediction) => Promise<boolean>;
  saveWinnerPick: (fixtureId: number, pick: WinnerPick) => Promise<boolean>;
  getPrediction: (fixtureId: number) => Prediction | undefined;
  getAllPredictions: () => Prediction[];
}

export const usePredictionStore = create<PredictionStore>()(
  persist(
    (set, get) => ({
      predictions: {},
      _hasHydrated: false,
      _syncing: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      syncFromServer: async () => {
        if (get()._syncing) return;
        set({ _syncing: true });
        try {
          const fromApi = await fetchMyPredictions();
          set((state) => ({
            predictions: { ...state.predictions, ...fromApi },
          }));
        } catch {
          // API offline — keep local persisted picks
        } finally {
          set({ _syncing: false });
        }
      },
      savePrediction: async (prediction) => {
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
      saveWinnerPick: async (fixtureId, pick) => {
        const fixture = ALL_FIXTURES.find((f) => f.id === fixtureId);
        if (fixture && isPredictionLocked(fixture)) {
          toast.error(translate(getLocale(), "prediction.lockedError"));
          return false;
        }

        const { homeScore, awayScore } = QUICK_PICK_SCORES[pick];
        const optimistic: Prediction = {
          fixtureId,
          homeScore,
          awayScore,
          winnerPick: pick,
          savedAt: new Date().toISOString(),
        };

        set((state) => ({
          predictions: { ...state.predictions, [fixtureId]: optimistic },
        }));

        try {
          const saved = await saveWinnerPick(fixtureId, pick);
          set((state) => ({
            predictions: {
              ...state.predictions,
              [fixtureId]: { ...saved, winnerPick: pick },
            },
          }));
          toast.success(translate(getLocale(), "prediction.saved"));
          return true;
        } catch (error) {
          set((state) => {
            const next = { ...state.predictions };
            delete next[fixtureId];
            return { predictions: next };
          });
          const message = error instanceof Error ? error.message : "Failed to save prediction";
          toast.error(message);
          return false;
        }
      },
      getPrediction: (fixtureId) => get().predictions[fixtureId],
      getAllPredictions: () => Object.values(get().predictions),
    }),
    {
      name: "wc2026-predictions",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        void state?.syncFromServer();
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
