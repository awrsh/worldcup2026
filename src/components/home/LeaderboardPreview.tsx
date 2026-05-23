"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/data/mock/leaderboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUpNumber, AnimatedSection, AnimatedItem } from "@/components/animations";
import { useTranslation } from "@/i18n/I18nProvider";
import { fadeUp, staggerContainer, transition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const topFive = MOCK_LEADERBOARD.slice(0, 5);

export function LeaderboardPreview() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <AnimatedItem className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("home.leaderboardTitle")}</h2>
          <p className="mt-1 text-muted-foreground">{t("home.leaderboardSubtitle")}</p>
        </AnimatedItem>

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          {topFive.map((entry, i) => (
            <motion.div
              key={entry.userId}
              variants={fadeUp}
              transition={transition.premium}
              whileHover={reduced ? undefined : { x: 6, backgroundColor: "oklch(68% 0.21 22 / 0.05)" }}
              className="relative flex items-center gap-4 border-b border-border px-6 py-4 last:border-0"
            >
              {i === 0 && !reduced && (
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                />
              )}
              <motion.span
                whileHover={reduced ? undefined : { scale: 1.1 }}
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  i === 0 ? "bg-accent text-accent-foreground gold-glow" : "bg-muted text-foreground"
                )}
              >
                {i === 0 && !reduced ? (
                  <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Trophy className="h-3.5 w-3.5" />
                  </motion.span>
                ) : (
                  entry.rank
                )}
              </motion.span>
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
                <CountUpNumber value={entry.totalPoints} /> {t("common.pts")}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedItem className="mt-6 text-center">
          <Button asChild variant="ghost" className="text-primary">
            <Link href="/leaderboard">
              {t("home.fullLeaderboard")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
