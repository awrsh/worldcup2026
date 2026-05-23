"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FixtureFilters, Stage } from "@/lib/api/types";
import { GROUP_IDS } from "@/data/mock/teams";
import { MOCK_TEAMS } from "@/data/mock/teams";
import { useTranslation } from "@/i18n/I18nProvider";

interface MatchFiltersProps {
  filters: FixtureFilters;
  onChange: (filters: FixtureFilters) => void;
}

const STAGE_KEYS: Stage[] = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_final",
  "semi_final",
  "final",
];

export function MatchFiltersBar({ filters, onChange }: MatchFiltersProps) {
  return <MatchFiltersContent filters={filters} onChange={onChange} />;
}

export function MatchFilters({ filters, onChange }: MatchFiltersProps) {
  return <MatchFiltersContent filters={filters} onChange={onChange} />;
}

function MatchFiltersContent({ filters, onChange }: MatchFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("matchFilters.searchTeams")}
          className="pl-9"
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value || undefined })}
        />
      </div>
      <Select value={filters.groupId ?? "all"} onValueChange={(v) => onChange({ ...filters, groupId: v === "all" ? undefined : v })}>
        <SelectTrigger><SelectValue placeholder={t("matchFilters.group")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("matchFilters.allGroups")}</SelectItem>
          {GROUP_IDS.map((g) => (
            <SelectItem key={g} value={g}>{t("common.group", { id: g })}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filters.stage ?? "all"} onValueChange={(v) => onChange({ ...filters, stage: v === "all" ? undefined : (v as Stage) })}>
        <SelectTrigger><SelectValue placeholder={t("matchFilters.stage")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("matchFilters.allStages")}</SelectItem>
          {STAGE_KEYS.map((stage) => (
            <SelectItem key={stage} value={stage}>{t(`stages.${stage}`)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.teamId?.toString() ?? "all"}
        onValueChange={(v) => onChange({ ...filters, teamId: v === "all" ? undefined : Number(v) })}
      >
        <SelectTrigger><SelectValue placeholder={t("matchFilters.team")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("matchFilters.allTeams")}</SelectItem>
          {MOCK_TEAMS.map((team) => (
            <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={filters.date?.slice(0, 10) ?? ""}
        onChange={(e) => onChange({ ...filters, date: e.target.value ? `${e.target.value}T00:00:00Z` : undefined })}
      />
    </div>
  );
}
