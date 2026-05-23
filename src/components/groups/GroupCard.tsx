"use client";

import type { Group, Standing } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { GroupTable } from "./GroupTable";
import { useTranslation } from "@/i18n/I18nProvider";

interface GroupCardProps {
  group: Group;
  standings: Standing[];
}

export function GroupCard({ group, standings }: GroupCardProps) {
  const { t } = useTranslation();
  const groupStandings = standings.filter((s) => s.groupId === group.id);

  return (
    <div className="glass-card-light overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <h2 className="text-xl font-bold text-card-foreground">{t("common.group", { id: group.id })}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {group.teamIds.map((id) => {
            const team = getTeamById(id);
            return (
              <div key={id} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FlagAvatar code={team?.flagCode} fallback={team?.shortCode} size="sm" />
                <span>{team?.shortCode}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-2">
        {groupStandings.length > 0 ? (
          <GroupTable standings={groupStandings} />
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("groups.noResults")}</p>
        )}
      </div>
    </div>
  );
}
