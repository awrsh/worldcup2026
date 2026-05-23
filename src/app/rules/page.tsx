"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/I18nProvider";

export default function RulesPage() {
  const { t } = useTranslation();

  const scoringRules = [
    { labelKey: "rules.exactScore", descKey: "rules.exactScoreDesc", points: 5 },
    { labelKey: "rules.correctWinner", descKey: "rules.correctWinnerDesc", points: 3 },
    { labelKey: "rules.correctDraw", descKey: "rules.correctDrawDesc", points: 3 },
    { labelKey: "rules.correctGoalDiff", descKey: "rules.correctGoalDiffDesc", points: 2 },
  ] as const;

  const sections = [
    {
      titleKey: "rules.makingPredictionsTitle",
      itemKeys: ["rules.makingPredictions1", "rules.makingPredictions2", "rules.makingPredictions3"],
    },
    {
      titleKey: "rules.leaderboardTitle",
      itemKeys: ["rules.leaderboard1", "rules.leaderboard2", "rules.leaderboard3", "rules.leaderboard4"],
    },
    {
      titleKey: "rules.formatTitle",
      itemKeys: ["rules.format1", "rules.format2", "rules.format3", "rules.format4"],
    },
  ] as const;

  return (
    <AppShell>
      <PageContent className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("rules.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("rules.subtitle")}</p>
        </div>

        <div className="glass-card space-y-6 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-accent">{t("rules.scoringTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("rules.scoringNote")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {scoringRules.map((rule) => (
              <div key={rule.labelKey} className="glass-card-light rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-card-foreground">{t(rule.labelKey)}</span>
                  <Badge variant="gold">
                    {rule.points} {t("common.pts")}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t(rule.descKey)}</p>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
            {t("rules.kickoffLock")}
          </p>
        </div>

        <div className="glass-card space-y-8 p-6 sm:p-8">
          {sections.map((section, i) => (
            <div key={section.titleKey}>
              {i > 0 && <Separator className="mb-8 bg-border" />}
              <h2 className="text-lg font-semibold text-accent">{t(section.titleKey)}</h2>
              <ul className="mt-4 space-y-2">
                {section.itemKeys.map((itemKey) => (
                  <li key={itemKey} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t(itemKey)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageContent>
    </AppShell>
  );
}
