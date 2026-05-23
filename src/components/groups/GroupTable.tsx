"use client";

import type { Standing } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/i18n/I18nProvider";

interface GroupTableProps {
  standings: Standing[];
}

export function GroupTable({ standings }: GroupTableProps) {
  const { t } = useTranslation();
  const sorted = [...standings].sort((a, b) => a.position - b.position);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-8 text-muted-foreground">#</TableHead>
            <TableHead className="text-muted-foreground">{t("standings.team")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("standings.played")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("standings.won")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("standings.drawn")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("standings.lost")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("standings.goalDiff")}</TableHead>
            <TableHead className="text-center font-semibold text-card-foreground">{t("standings.points")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => {
            const team = getTeamById(row.teamId);
            const qualifies = row.position <= 2;
            return (
              <TableRow
                key={row.teamId}
                className={qualifies ? "border-l-2 border-l-primary bg-primary/5" : ""}
              >
                <TableCell className="font-medium text-muted-foreground">{row.position}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FlagAvatar code={team?.flagCode} fallback={team?.shortCode} size="sm" />
                    <span className="font-medium text-card-foreground">{team?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">{row.played}</TableCell>
                <TableCell className="text-center text-muted-foreground">{row.won}</TableCell>
                <TableCell className="text-center text-muted-foreground">{row.drawn}</TableCell>
                <TableCell className="text-center text-muted-foreground">{row.lost}</TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </TableCell>
                <TableCell className="text-center font-bold text-card-foreground">{row.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
