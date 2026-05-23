"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Clock, MapPin, Lock } from "lucide-react";
import type { Fixture } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { getVenueById } from "@/data/mock/venues";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import { PointsBadge } from "@/components/shared/PointsBadge";
import { MatchWinnerPicker } from "@/components/matches/MatchWinnerPicker";
import { usePredictionStore } from "@/lib/store/prediction-store";
import { getWinnerPickFromPrediction } from "@/lib/store/prediction-store";
import { isPredictionLocked } from "@/lib/utils/match-status";
import { calculatePredictionPoints } from "@/lib/utils/scoring";
import { translateFixtureBadge } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";

interface MatchCardProps {
  fixture: Fixture;
  index?: number;
}

export function MatchCard({ fixture, index = 0 }: MatchCardProps) {
  const { t, locale } = useTranslation();
  const prediction = usePredictionStore((s) => s.predictions[fixture.id]);
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const venue = getVenueById(fixture.venueId);
  const locked = isPredictionLocked(fixture);
  const winnerPick = getWinnerPickFromPrediction(prediction);

  let points = 0;
  if (prediction && fixture.state === "finished" && fixture.homeScore !== undefined && fixture.awayScore !== undefined) {
    points = calculatePredictionPoints(prediction, fixture.homeScore, fixture.awayScore).points;
  }

  const badgeLabel = translateFixtureBadge(locale, fixture);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <article className="glass-card-light group flex flex-col p-5 transition-all hover:shadow-xl hover:ring-2 hover:ring-primary/30">
        <Link href={`/matches/${fixture.id}`} className="block flex-1">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant={fixture.state === "live" ? "destructive" : "secondary"}>
              {badgeLabel}
            </Badge>
            {locked && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> {t("common.locked")}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-col items-center gap-2">
              <FlagAvatar code={home?.flagCode} fallback={home?.shortCode} />
              <span className="text-sm font-semibold text-card-foreground">{home?.shortCode ?? t("common.tbd")}</span>
              {fixture.state !== "not_started" && (
                <span className="text-2xl font-bold text-card-foreground">{fixture.homeScore ?? t("common.dash")}</span>
              )}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{t("common.vs")}</span>
            <div className="flex flex-1 flex-col items-center gap-2">
              <FlagAvatar code={away?.flagCode} fallback={away?.shortCode} />
              <span className="text-sm font-semibold text-card-foreground">{away?.shortCode ?? t("common.tbd")}</span>
              {fixture.state !== "not_started" && (
                <span className="text-2xl font-bold text-card-foreground">{fixture.awayScore ?? t("common.dash")}</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex  items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {format(parseISO(fixture.kickoffAt), "MMM d, HH:mm")} {t("common.utc")}
            </span>
            {venue && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {venue.name}
              </span>
            )}
          </div>

          {points > 0 && (
            <div className="mt-3 flex justify-end">
              <PointsBadge points={points} />
            </div>
          )}
        </Link>

        {!fixture.placeholder && <MatchWinnerPicker fixture={fixture} locked={locked} />}

        {winnerPick && (
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            {prediction?.homeScore}-{prediction?.awayScore} ·{" "}
            <Link href={`/matches/${fixture.id}`} className="text-primary hover:underline">
              {t("prediction.detailLink")}
            </Link>
          </p>
        )}
      </article>
    </motion.div>
  );
}
