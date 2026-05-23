"use client";

import type { Team } from "@/lib/api/types";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/I18nProvider";

interface TeamCardProps {
  team: Team;
  onSelect: (team: Team) => void;
}

export function TeamCard({ team, onSelect }: TeamCardProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => onSelect(team)}
      className="glass-card-light w-full cursor-pointer p-5 text-left transition-all hover:ring-2 hover:ring-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="flex items-center gap-4">
        <FlagAvatar code={team.flagCode} fallback={team.shortCode} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-card-foreground">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.shortCode}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {team.groupId && (
          <Badge variant="secondary">{t("common.group", { id: team.groupId })}</Badge>
        )}
        {team.fifaRanking && (
          <Badge variant="outline" className="text-muted-foreground">
            {t("teams.fifaRanking", { rank: team.fifaRanking })}
          </Badge>
        )}
      </div>
    </button>
  );
}
