"use client";

import type { Fixture, WinnerPick } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import {
  getWinnerPickFromPrediction,
  usePredictionStore,
} from "@/lib/store/prediction-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";

interface MatchWinnerPickerProps {
  fixture: Fixture;
  locked?: boolean;
  className?: string;
}

export function MatchWinnerPicker({ fixture, locked, className }: MatchWinnerPickerProps) {
  const { t } = useTranslation();
  const prediction = usePredictionStore((s) => s.predictions[fixture.id]);
  const saveWinnerPick = usePredictionStore((s) => s.saveWinnerPick);
  const selected = getWinnerPickFromPrediction(prediction);
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);

  const options: { pick: WinnerPick; labelKey: string }[] = [
    { pick: "home", labelKey: "prediction.home" },
    { pick: "draw", labelKey: "prediction.draw" },
    { pick: "away", labelKey: "prediction.away" },
  ];

  const handlePick = (pick: WinnerPick, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (locked) return;
    saveWinnerPick(fixture.id, pick);
  };

  return (
    <div
      className={cn("mt-4 border-t border-border pt-4", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="mb-2 text-center text-xs text-muted-foreground">{t("prediction.winnerPickTitle")}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map(({ pick, labelKey }) => {
          const isActive = selected === pick;
          const teamLabel =
            pick === "home" ? home?.shortCode : pick === "away" ? away?.shortCode : undefined;

          return (
            <button
              key={pick}
              type="button"
              disabled={locked}
              onClick={(e) => handlePick(pick, e)}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border px-2 py-2.5 text-xs font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                locked && "cursor-not-allowed opacity-50",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-secondary/60 text-secondary-foreground hover:border-primary/40 hover:bg-secondary"
              )}
            >
              <span>{t(labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
