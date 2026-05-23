"use client";

import { Lock } from "lucide-react";
import type { Prediction, Team } from "@/lib/api/types";
import { useTranslation } from "@/i18n/I18nProvider";

interface LockedPredictionBannerProps {
  prediction?: Prediction;
  home?: Team;
  away?: Team;
}

export function LockedPredictionBanner({ prediction, home, away }: LockedPredictionBannerProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card-light space-y-4 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <Lock className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-card-foreground">{t("prediction.lockedTitle")}</h2>
      <p className="text-sm text-muted-foreground">{t("prediction.lockedDescription")}</p>
      {prediction && (
        <div className="rounded-xl bg-muted p-4">
          <p className="text-sm text-muted-foreground">{t("prediction.yourPredictionLabel")}</p>
          <p className="text-2xl font-bold text-card-foreground">
            {home?.shortCode} {prediction.homeScore} - {prediction.awayScore} {away?.shortCode}
          </p>
        </div>
      )}
    </div>
  );
}
