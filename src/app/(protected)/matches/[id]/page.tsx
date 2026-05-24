"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Clock, MapPin, BarChart3 } from "lucide-react";
import type { Fixture } from "@/lib/api/types";
import { getMatchById } from "@/lib/api";
import { getTeamById } from "@/data/mock/teams";
import { getVenueById } from "@/data/mock/venues";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { PredictionForm } from "@/components/predictions/PredictionForm";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { Separator } from "@/components/ui/separator";
import { translateFixtureBadge } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";

export default function MatchDetailPage() {
  const { t, locale } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const [fixture, setFixture] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(id)) {
      setLoading(false);
      return;
    }
    getMatchById(id).then((data) => {
      setFixture(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <LoadingState rows={4} />
      </AppShell>
    );
  }

  if (!fixture) {
    return (
      <AppShell>
        <EmptyState title={t("matchDetail.notFoundTitle")} description={t("matchDetail.notFoundDescription")} />
        <Link href="/dashboard" className="mt-4 inline-flex text-primary">
          {t("matchDetail.backToDashboard")}
        </Link>
      </AppShell>
    );
  }

  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const venue = getVenueById(fixture.venueId);
  const badgeLabel = translateFixtureBadge(locale, fixture);

  const statKeys = [
    "matchDetail.stats.possession",
    "matchDetail.stats.shots",
    "matchDetail.stats.onTarget",
    "matchDetail.stats.corners",
  ] as const;

  return (
    <AppShell>
      <PageContent>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("matchDetail.backToMatches")}
        </Link>

        <div className="glass-card p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant={fixture.state === "live" ? "destructive" : "secondary"}>
              {badgeLabel}
            </Badge>
            {fixture.roundName && !fixture.groupId && fixture.stage && (
              <Badge variant="outline">{t(`stages.${fixture.stage}`)}</Badge>
            )}
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-1 flex-col items-center gap-3">
              <FlagAvatar code={home?.flagCode} fallback={home?.shortCode} size="lg" />
              <h2 className="text-center text-lg font-bold text-foreground">{home?.name ?? t("common.tbd")}</h2>
              {fixture.state !== "not_started" && (
                <span className="text-4xl font-bold text-foreground">{fixture.homeScore ?? 0}</span>
              )}
            </div>
            <span className="text-2xl text-muted-foreground">{t("common.vs")}</span>
            <div className="flex flex-1 flex-col items-center gap-3">
              <FlagAvatar code={away?.flagCode} fallback={away?.shortCode} size="lg" />
              <h2 className="text-center text-lg font-bold text-foreground">{away?.name ?? t("common.tbd")}</h2>
              {fixture.state !== "not_started" && (
                <span className="text-4xl font-bold text-foreground">{fixture.awayScore ?? 0}</span>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {format(parseISO(fixture.kickoffAt), "EEEE, MMM d · HH:mm")}
            </span>
            {venue && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {venue.name}, {venue.city}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2  ">
          <PredictionForm fixture={fixture} />

          <div className="space-y-4">
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">{t("matchDetail.matchStats")}</h3>
              </div>
              <Separator className="mb-4 bg-border" />
              <div className="grid grid-cols-2 gap-4 text-center">
                {statKeys.map((statKey) => (
                  <div key={statKey} className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground">{t(statKey)}</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{t("common.dash")}</p>
                    <p className="text-xs text-muted-foreground">{t("common.comingSoon")}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-foreground">{t("matchDetail.headToHead")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("matchDetail.headToHeadDescription")}</p>
            </div>
          </div>
        </div>
      </PageContent>
    </AppShell>
  );
}
