"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MatchState } from "@/lib/api/types";
import { useTranslation } from "@/i18n/I18nProvider";

interface StageTabsProps {
  value: MatchState;
  onChange: (value: MatchState) => void;
  counts?: Partial<Record<MatchState, number>>;
}

export function StageTabs({ value, onChange, counts }: StageTabsProps) {
  const { t } = useTranslation();

  const tabs: { id: MatchState; labelKey: string }[] = [
    { id: "live", labelKey: "matchTabs.live" },
    { id: "not_started", labelKey: "matchTabs.upcoming" },
    { id: "finished", labelKey: "matchTabs.completed" },
  ];

  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as MatchState)}>
      <TabsList className="w-full sm:w-auto">
        {tabs.map(({ id, labelKey }) => (
          <TabsTrigger key={id} value={id} className="flex-1 sm:flex-none">
            {t(labelKey)}
            {counts?.[id] !== undefined && (
              <span className="ml-1.5 rounded-full bg-muted px-1.5 text-xs">{counts[id]}</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
