"use client";

import { useEffect, useState } from "react";
import type { LeaderboardEntry, LeaderboardScope } from "@/lib/api/types";
import { getLeaderboard } from "@/lib/api";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { LeaderboardFilters } from "@/components/leaderboard/LeaderboardFilters";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { LoadingState } from "@/components/shared/LoadingState";
import { useUserStore } from "@/lib/store/user-store";
import { useTranslation } from "@/i18n/I18nProvider";

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const countryCode = useUserStore((s) => s.user.countryCode);
  const [scope, setScope] = useState<LeaderboardScope>("global");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLeaderboard(scope, countryCode).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, [scope, countryCode]);

  return (
    <AppShell>
      <PageContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("leaderboard.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("leaderboard.subtitle")}</p>
          </div>
          <LeaderboardFilters scope={scope} onChange={setScope} />
        </div>

        {loading ? <LoadingState rows={8} /> : <LeaderboardTable entries={entries} />}
      </PageContent>
    </AppShell>
  );
}
