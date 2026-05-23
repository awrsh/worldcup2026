"use client";

import { useMemo, useState } from "react";
import type { FixtureFilters, MatchState } from "@/lib/api/types";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchFilters } from "@/components/matches/MatchFilters";
import { StageTabs } from "@/components/matches/StageTabs";
import { useFixtures } from "@/hooks/use-fixtures";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ALL_FIXTURES } from "@/data/mock/fixtures";
import { useTranslation } from "@/i18n/I18nProvider";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [matchState, setMatchState] = useState<MatchState>("not_started");
  const { fixtures, loading, filters, setFilters } = useFixtures({ state: matchState });

  const counts = useMemo(() => {
    const base = ALL_FIXTURES.filter((f) => !f.placeholder);
    return {
      live: base.filter((f) => f.state === "live").length,
      not_started: base.filter((f) => f.state === "not_started").length,
      finished: base.filter((f) => f.state === "finished").length,
    };
  }, []);

  const handleFiltersChange = (next: FixtureFilters) => {
    setFilters({ ...next, state: matchState });
  };

  const handleStateChange = (state: MatchState) => {
    setMatchState(state);
    setFilters({ ...filters, state });
  };

  return (
    <AppShell>
      <PageContent>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("dashboard.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        <StageTabs value={matchState} onChange={handleStateChange} counts={counts} />
        <MatchFilters filters={filters ?? { state: matchState }} onChange={handleFiltersChange} />

        {loading ? (
          <LoadingState rows={6} />
        ) : fixtures.length === 0 ? (
          <EmptyState
            title={t("dashboard.noMatchesTitle")}
            description={t("dashboard.noMatchesDescription")}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fixtures
              .filter((f) => !f.placeholder)
              .map((fixture, i) => (
                <MatchCard key={fixture.id} fixture={fixture} index={i} />
              ))}
          </div>
        )}
      </PageContent>
    </AppShell>
  );
}
