"use client";

import type { LeaderboardEntry } from "@/lib/api/types";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
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
import { CountUpNumber } from "@/components/animations";
import { useUserStore } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";
import { podiumFloat, rowSlideIn, spring } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const podiumStyles = [
  "bg-gradient-to-b from-amber-400/20 to-transparent border-amber-400/40 gold-glow",
  "bg-gradient-to-b from-slate-300/15 to-transparent border-slate-300/30",
  "bg-gradient-to-b from-amber-700/15 to-transparent border-amber-700/30",
];

function PodiumCard({ entry, index }: { entry: LeaderboardEntry; index: number }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const heights = ["h-28", "h-36", "h-24"];
  const order = [1, 0, 2];
  const displayIndex = order[index];

  return (
    <motion.div
      variants={podiumFloat(displayIndex * 0.12)}
      initial="hidden"
      animate="visible"
      whileHover={reduced ? undefined : { y: -8, scale: 1.02 }}
      transition={spring.soft}
      className={cn(
        "flex flex-1 flex-col items-center rounded-2xl border p-4 text-center",
        podiumStyles[entry.rank - 1]
      )}
    >
      <motion.span
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: entry.rank * 0.3 }}
      >
        <Trophy className={cn("mb-2 h-6 w-6", entry.rank === 1 ? "text-amber-400" : entry.rank === 2 ? "text-slate-300" : "text-amber-700")} />
      </motion.span>
      <Avatar className="mb-2 h-10 w-10 ring-2 ring-primary/30">
        <AvatarFallback className="text-xs">{entry.avatarInitials}</AvatarFallback>
      </Avatar>
      <p className="truncate text-sm font-semibold text-foreground">{entry.username}</p>
      <Badge variant="gold" className="mt-2">
        <CountUpNumber value={entry.totalPoints} /> {t("common.pts")}
      </Badge>
    </motion.div>
  );
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const { t } = useTranslation();
  const currentUserId = useUserStore((s) => s.user.id);
  const reduced = useReducedMotion();
  const topThree = entries.filter((e) => e.rank <= 3).sort((a, b) => a.rank - b.rank);
  const rest = entries.filter((e) => e.rank > 3);

  return (
    <div className="space-y-6">
      {topThree.length >= 3 && (
        <div className="flex items-end gap-3 px-2">
          {[topThree[1], topThree[0], topThree[2]].map((entry, i) => (
            <PodiumCard key={entry.userId} entry={entry} index={i} />
          ))}
        </div>
      )}

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
            {rest.map((entry, i) => {
              const isMe = entry.userId === currentUserId;
              return (
                <motion.tr
                  key={entry.userId}
                  variants={rowSlideIn(i)}
                  initial="hidden"
                  animate="visible"
                  whileHover={reduced ? undefined : { backgroundColor: "oklch(68% 0.21 22 / 0.06)", x: 4 }}
                  className={cn(
                    "border-b border-border transition-colors",
                    isMe && "bg-primary/10 border-l-2 border-l-primary"
                  )}
                >
                  <TableCell>
                    <motion.span
                      className={cn(
                        "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full text-xs font-bold",
                        entry.rank <= 3 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {!reduced && entry.rank <= 3 && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                      )}
                      {entry.rank}
                    </motion.span>
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
                    <Badge variant="gold">
                      <CountUpNumber value={entry.totalPoints} />
                    </Badge>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
