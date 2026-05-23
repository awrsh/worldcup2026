"use client";

import { useEffect, useState } from "react";
import { Lock, Save } from "lucide-react";
import type { Fixture } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { MatchWinnerPicker } from "@/components/matches/MatchWinnerPicker";
import {
  getWinnerPickFromPrediction,
  usePredictionStore,
} from "@/lib/store/prediction-store";
import { isPredictionLocked } from "@/lib/utils/match-status";
import { getPredictedWinner } from "@/lib/utils/scoring";
import { LockedPredictionBanner } from "./LockedPredictionBanner";
import { useTranslation } from "@/i18n/I18nProvider";

interface PredictionFormProps {
  fixture: Fixture;
}

export function PredictionForm({ fixture }: PredictionFormProps) {
  const { t } = useTranslation();
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const existing = usePredictionStore((s) => s.predictions[fixture.id]);
  const savePrediction = usePredictionStore((s) => s.savePrediction);
  const locked = isPredictionLocked(fixture);

  const [homeScore, setHomeScore] = useState(existing?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(existing?.awayScore ?? 0);

  useEffect(() => {
    if (existing) {
      setHomeScore(existing.homeScore);
      setAwayScore(existing.awayScore);
    }
  }, [existing]);

  const winner = getPredictedWinner(homeScore, awayScore);
  const winnerLabel =
    winner === "draw" ? t("prediction.drawLabel") : winner === "home" ? home?.name : away?.name;

  const handleSave = () => {
    const winnerPick = getWinnerPickFromPrediction({
      fixtureId: fixture.id,
      homeScore,
      awayScore,
      savedAt: new Date().toISOString(),
    });

    savePrediction({
      fixtureId: fixture.id,
      homeScore,
      awayScore,
      savedAt: new Date().toISOString(),
      winnerPick: winnerPick ?? undefined,
    });
  };

  if (locked) {
    return <LockedPredictionBanner prediction={existing} home={home} away={away} />;
  }

  return (
    <div className="glass-card-light space-y-6 p-6">
      <h2 className="text-lg font-semibold text-card-foreground">{t("prediction.yourPrediction")}</h2>

      <MatchWinnerPicker fixture={fixture} locked={locked} className="mt-0 border-t-0 pt-0" />

      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <FlagAvatar code={home?.flagCode} fallback={home?.shortCode} size="lg" />
          <Label htmlFor="home-score">{home?.name}</Label>
          <Input
            id="home-score"
            type="number"
            min={0}
            max={20}
            className="w-20 text-center text-2xl font-bold"
            value={homeScore}
            onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </div>
        <span className="text-3xl font-light text-muted-foreground">-</span>
        <div className="flex flex-col items-center gap-2">
          <FlagAvatar code={away?.flagCode} fallback={away?.shortCode} size="lg" />
          <Label htmlFor="away-score">{away?.name}</Label>
          <Input
            id="away-score"
            type="number"
            min={0}
            max={20}
            className="w-20 text-center text-2xl font-bold"
            value={awayScore}
            onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {t("prediction.predictedWinner")}: <strong className="text-card-foreground">{winnerLabel}</strong>
      </p>

      {existing && (
        <p className="text-center text-xs text-muted-foreground">
          {t("common.previousScore", { home: existing.homeScore, away: existing.awayScore })}
        </p>
      )}

      <Button onClick={handleSave} className="w-full" size="lg">
        <Save className="h-4 w-4" />
        {t("prediction.save")}
      </Button>
      <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> {t("prediction.lockNotice")}
      </p>
    </div>
  );
}
