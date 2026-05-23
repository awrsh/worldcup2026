"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LeaderboardScope } from "@/lib/api/types";
import { useTranslation } from "@/i18n/I18nProvider";

interface LeaderboardFiltersProps {
  scope: LeaderboardScope;
  onChange: (scope: LeaderboardScope) => void;
}

export function LeaderboardFilters({ scope, onChange }: LeaderboardFiltersProps) {
  const { t } = useTranslation();

  const scopes: { value: LeaderboardScope; labelKey: string }[] = [
    { value: "global", labelKey: "leaderboard.scopeGlobal" },
    { value: "friends", labelKey: "leaderboard.scopeFriends" },
    { value: "country", labelKey: "leaderboard.scopeCountry" },
  ];

  return (
    <Tabs value={scope} onValueChange={(v) => onChange(v as LeaderboardScope)}>
      <TabsList>
        {scopes.map(({ value, labelKey }) => (
          <TabsTrigger key={value} value={value}>
            {t(labelKey)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
