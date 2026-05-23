"use client";

import type { LeaderboardEntry } from "@/lib/api/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const { t } = useTranslation();
  const currentUserId = useUserStore((s) => s.user.id);

  return (
    <div className="glass-card-light overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12 text-muted-foreground">{t("leaderboard.rank")}</TableHead>
            <TableHead className="text-muted-foreground">{t("leaderboard.player")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("leaderboard.exact")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("leaderboard.winners")}</TableHead>
            <TableHead className="text-center text-muted-foreground">{t("leaderboard.streak")}</TableHead>
            <TableHead className="text-right text-muted-foreground">{t("standings.points")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const isMe = entry.userId === currentUserId;
            return (
              <TableRow
                key={entry.userId}
                className={cn(isMe && "bg-primary/10 border-l-2 border-l-primary")}
              >
                <TableCell>
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      entry.rank <= 3 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {entry.rank}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{entry.avatarInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {entry.username}
                        {isMe && (
                          <Badge variant="outline" className="ml-2 text-[10px]">
                            {t("common.you")}
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{entry.countryCode}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">{entry.correctScores}</TableCell>
                <TableCell className="text-center text-muted-foreground">{entry.correctWinners}</TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {entry.streak > 0 ? `🔥 ${entry.streak}` : t("common.dash")}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="gold">{entry.totalPoints}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
