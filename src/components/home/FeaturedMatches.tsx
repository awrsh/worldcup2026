"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_FIXTURES } from "@/data/mock/fixtures";
import { MatchCard } from "@/components/matches/MatchCard";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/animations";
import { useTranslation } from "@/i18n/I18nProvider";

const featured = ALL_FIXTURES.filter((f) => f.state === "not_started" && !f.placeholder)
  .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())
  .slice(0, 4);

export function FeaturedMatches() {
  const { t } = useTranslation();

  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedItem className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("home.featuredTitle")}</h2>
            <p className="mt-1 text-muted-foreground">{t("home.featuredSubtitle")}</p>
          </div>
          <Button asChild variant="ghost" className="hidden text-primary sm:inline-flex">
            <Link href="/dashboard">
              {t("home.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </AnimatedItem>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((fixture, i) => (
            <MatchCard key={fixture.id} fixture={fixture} index={i} />
          ))}
        </div>
        <AnimatedItem className="mt-6 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/dashboard">{t("home.viewAllMatches")}</Link>
          </Button>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
