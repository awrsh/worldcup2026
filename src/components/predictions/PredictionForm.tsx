"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import type { Fixture } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { MatchWinnerPicker } from "@/components/matches/MatchWinnerPicker";
import { ScoreSelector, MorphSaveButton } from "@/components/animations";
import {
  getWinnerPickFromPrediction,
  usePredictionStore,
} from "@/lib/store/prediction-store";
import { isPredictionLocked } from "@/lib/utils/match-status";
import { getPredictedWinner } from "@/lib/utils/scoring";
import { LockedPredictionBanner } from "./LockedPredictionBanner";
import { useTranslation } from "@/i18n/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, transition } from "@/lib/motion";

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

  const handleSave = async () => {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={transition.premium}
      className="glass-card-light space-y-6 p-6"
    >
      <h2 className="text-lg font-semibold text-card-foreground">{t("prediction.yourPrediction")}</h2>

      <MatchWinnerPicker fixture={fixture} locked={locked} className="mt-0 border-t-0 pt-0" />

      <motion.div
        layout
        className="flex items-center justify-center gap-6"
      >
        <ScoreSelector
          label={home?.name ?? ""}
          value={homeScore}
          onChange={setHomeScore}
        />
        <motion.span
          key={`${homeScore}-${awayScore}`}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-light text-muted-foreground"
        >
          -
        </motion.span>
        <ScoreSelector
          label={away?.name ?? ""}
          value={awayScore}
          onChange={setAwayScore}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={winnerLabel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center text-sm text-muted-foreground"
        >
          {t("prediction.predictedWinner")}: <strong className="text-card-foreground">{winnerLabel}</strong>
        </motion.p>
      </AnimatePresence>

      {existing && (
        <p className="text-center text-xs text-muted-foreground">
          {t("common.previousScore", { home: existing.homeScore, away: existing.awayScore })}
        </p>
      )}

      <MorphSaveButton
        onSave={handleSave}
        idleLabel={t("prediction.save")}
        successLabel={t("prediction.saved")}
      />

      <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> {t("prediction.lockNotice")}
      </p>
    </motion.div>
  );
}
