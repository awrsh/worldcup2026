"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { CountdownCard } from "@/components/home/CountdownCard";
import { FeaturedMatches } from "@/components/home/FeaturedMatches";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { GroupPreview } from "@/components/home/GroupPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { useTranslation } from "@/i18n/I18nProvider";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
            <span className="text-2xl">⚽</span>
            {t("nav.brand")}
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcher compact />
            <LanguageSwitcher compact />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/rules">{t("nav.rules")}</Link>
            </Button>
            <Button asChild className="shadow-md shadow-primary/20">
              <Link href="/dashboard">{t("nav.dashboard")}</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      <main>
        <Hero />
        <CountdownCard />
        <FeaturedMatches />
        <HowItWorks />
        <GroupPreview />
        <LeaderboardPreview />
        <FinalCTA />
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>{t("footer.tagline")}</p>
        <p className="mt-1">{t("footer.disclaimer")}</p>
      </footer>
    </div>
  );
}
