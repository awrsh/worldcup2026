"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Clock, MapPin, Lock } from "lucide-react";
import type { Fixture } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { getVenueById } from "@/data/mock/venues";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import { PointsBadge } from "@/components/shared/PointsBadge";
import { MatchWinnerPicker } from "@/components/matches/MatchWinnerPicker";
import { TiltCard } from "@/components/animations";
import { usePredictionStore, getWinnerPickFromPrediction } from "@/lib/store/prediction-store";
import { isPredictionLocked } from "@/lib/utils/match-status";
import { calculatePredictionPoints } from "@/lib/utils/scoring";
import { translateFixtureBadge } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";
import { spring, livePulse } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MatchCardProps {
  fixture: Fixture;
  index?: number;
}

function LiveBadge({ label }: { label: string }) {
  const reduced = useReducedMotion();
  return (
    <Badge variant="destructive" className="relative overflow-hidden">
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full bg-destructive/40"
          variants={livePulse}
          animate="animate"
        />
      )}
      <span className="relative flex items-center gap-1">
        {!reduced && (
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
        {label}
      </span>
    </Badge>
  );
}

function AnimatedScore({ score, flash }: { score: number | string; flash?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={String(score)}
        initial={flash && !reduced ? { scale: 1.4, color: "var(--primary)" } : false}
        animate={{ scale: 1, color: "var(--card-foreground)" }}
        transition={spring.snappy}
        className="text-2xl font-bold text-card-foreground"
      >
        {score}
      </motion.span>
    </AnimatePresence>
  );
}

export function MatchCard({ fixture, index = 0 }: MatchCardProps) {
  const { t, locale } = useTranslation();
  const reduced = useReducedMotion();
  const prediction = usePredictionStore((s) => s.predictions[fixture.id]);
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const venue = getVenueById(fixture.venueId);
  const locked = isPredictionLocked(fixture);
  const winnerPick = getWinnerPickFromPrediction(prediction);
  const isLive = fixture.state === "live";

  let points = 0;
  if (prediction && fixture.state === "finished" && fixture.homeScore !== undefined && fixture.awayScore !== undefined) {
    points = calculatePredictionPoints(prediction, fixture.homeScore, fixture.awayScore).points;
  }

  const badgeLabel = translateFixtureBadge(locale, fixture);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="h-full" glow={false}>
        <article className="glass-card-light group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-xl">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, oklch(68% 0.21 22 / 0.06), transparent 55%, oklch(65% 0.2 5 / 0.04))",
            }}
          />

          <Link href={`/matches/${fixture.id}`} className="relative block flex-1">
            <div className="mb-4 flex items-center justify-between">
              {isLive ? (
                <LiveBadge label={badgeLabel} />
              ) : (
                <Badge variant="secondary">{badgeLabel}</Badge>
              )}
              {locked && (
                <motion.span
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                  animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span animate={reduced ? undefined : { rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                    <Lock className="h-3 w-3" />
                  </motion.span>
                  {t("common.locked")}
                </motion.span>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-1 flex-col items-center gap-2">
                <FlagAvatar code={home?.flagCode} fallback={home?.shortCode} />
                <span className="text-sm font-semibold text-card-foreground">{home?.shortCode ?? t("common.tbd")}</span>
                {fixture.state !== "not_started" && (
                  <AnimatedScore score={fixture.homeScore ?? t("common.dash")} flash={isLive} />
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">{t("common.vs")}</span>
              <div className="flex flex-1 flex-col items-center gap-2">
                <FlagAvatar code={away?.flagCode} fallback={away?.shortCode} />
                <span className="text-sm font-semibold text-card-foreground">{away?.shortCode ?? t("common.tbd")}</span>
                {fixture.state !== "not_started" && (
                  <AnimatedScore score={fixture.awayScore ?? t("common.dash")} flash={isLive} />
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex justify-end"
              >
                <PointsBadge points={points} />
              </motion.div>
            )}
          </Link>

          {!fixture.placeholder && <MatchWinnerPicker fixture={fixture} locked={locked} />}

          {winnerPick && (
            <p className="relative mt-2 text-center text-[10px] text-muted-foreground">
              {prediction?.homeScore}-{prediction?.awayScore} ·{" "}
              <Link href={`/matches/${fixture.id}`} className="text-primary hover:underline">
                {t("prediction.detailLink")}
              </Link>
            </p>
          )}
        </article>
      </TiltCard>
    </motion.div>
  );
}
