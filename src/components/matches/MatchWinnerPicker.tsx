"use client";

import { motion } from "framer-motion";
import type { Fixture, WinnerPick } from "@/lib/api/types";
import {
  getWinnerPickFromPrediction,
  usePredictionStore,
} from "@/lib/store/prediction-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";
import { spring } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MatchWinnerPickerProps {
  fixture: Fixture;
  locked?: boolean;
  className?: string;
}

export function MatchWinnerPicker({ fixture, locked, className }: MatchWinnerPickerProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const prediction = usePredictionStore((s) => s.predictions[fixture.id]);
  const saveWinnerPick = usePredictionStore((s) => s.saveWinnerPick);
  const selected = getWinnerPickFromPrediction(prediction);

  const options: { pick: WinnerPick; labelKey: string }[] = [
    { pick: "home", labelKey: "prediction.home" },
    { pick: "draw", labelKey: "prediction.draw" },
    { pick: "away", labelKey: "prediction.away" },
  ];

  const handlePick = async (pick: WinnerPick, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (locked) return;
    await saveWinnerPick(fixture.id, pick);
  };

  return (
    <div
      className={cn("mt-4 border-t border-border pt-4", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="mb-2 text-center text-xs text-muted-foreground">{t("prediction.winnerPickTitle")}</p>
      <motion.div layout className="relative grid grid-cols-3 gap-2">
        {options.map(({ pick, labelKey }) => {
          const isActive = selected === pick;

          return (
            <motion.button
              key={pick}
              type="button"
              disabled={locked}
              onClick={(e) => handlePick(pick, e)}
              whileHover={locked || reduced ? undefined : { scale: 1.03, y: -2 }}
              whileTap={locked || reduced ? undefined : { scale: 0.95 }}
              transition={spring.snappy}
              className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                locked && "cursor-not-allowed opacity-50",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border-border bg-secondary/60 text-secondary-foreground hover:border-primary/40 hover:bg-secondary"
              )}
            >
              {isActive && !reduced && (
                <motion.span
                  layoutId={`winner-pick-${fixture.id}`}
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={spring.soft}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative">{t(labelKey)}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
