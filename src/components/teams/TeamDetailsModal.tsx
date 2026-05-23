"use client";

import type { Team } from "@/lib/api/types";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SquadPreview } from "./SquadPreview";
import { useTranslation } from "@/i18n/I18nProvider";

interface TeamDetailsModalProps {
  team: Team | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamDetailsModal({ team, open, onOpenChange }: TeamDetailsModalProps) {
  const { t } = useTranslation();

  if (!team) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card-light max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FlagAvatar code={team.flagCode} fallback={team.shortCode} size="lg" />
            <span>{team.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {team.groupId && <Badge>{t("common.group", { id: team.groupId })}</Badge>}
          {team.fifaRanking && (
            <Badge variant="outline">{t("teams.fifaRankingFull", { rank: team.fifaRanking })}</Badge>
          )}
          {team.countryCode && <Badge variant="secondary">{team.countryCode}</Badge>}
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("teams.squadHighlights")}
          </h4>
          <SquadPreview players={team.squad ?? []} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
