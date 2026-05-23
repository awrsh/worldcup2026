"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/data/mock/leaderboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";

const topFive = MOCK_LEADERBOARD.slice(0, 5);

export function LeaderboardPreview() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("home.leaderboardTitle")}</h2>
          <p className="mt-1 text-muted-foreground">{t("home.leaderboardSubtitle")}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          {topFive.map((entry, i) => (
            <div
              key={entry.userId}
              className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-0"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i === 0 ? "bg-accent text-accent-foreground gold-glow" : "bg-muted text-foreground"
                }`}
              >
                {entry.rank}
              </span>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/30 text-xs text-primary-foreground">
                  {entry.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{entry.username}</p>
                <p className="text-xs text-muted-foreground">
                  {t("common.exactScores", { count: entry.correctScores })}
                </p>
              </div>
              <Badge variant="gold">
                {entry.totalPoints} {t("common.pts")}
              </Badge>
            </div>
          ))}
        </motion.div>
        <div className="mt-6 text-center">
          <Button asChild variant="ghost" className="text-primary">
            <Link href="/leaderboard">
              {t("home.fullLeaderboard")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
