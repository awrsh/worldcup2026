"use client";

import { useEffect, useState } from "react";
import type { BracketData, Fixture } from "@/lib/api/types";
import { getWorldCupBracket } from "@/lib/api";
import { getFixtureById } from "@/data/mock/fixtures";
import { BracketMatchNode } from "./BracketMatchNode";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { DragScrollArea } from "@/components/shared/DragScrollArea";
import { translateStage } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";

export function KnockoutBracket() {
  const { t, locale } = useTranslation();
  const [bracket, setBracket] = useState<BracketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorldCupBracket().then((data) => {
      setBracket(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState rows={4} />;
  if (!bracket) return <EmptyState title={t("bracket.unavailable")} />;

  return (
    <DragScrollArea className="pb-2">
      <div className="flex w-max min-w-full items-start gap-6 px-1">
        {bracket.stages.map((stage) => {
          const fixtures: Fixture[] = stage.fixtureIds
            .map((id) => getFixtureById(id))
            .filter((f): f is Fixture => f !== undefined);

          return (
            <div key={stage.stage} className="flex w-52 shrink-0 flex-col gap-3 sm:w-56">
              <h3 className="py-2 text-center text-sm font-semibold uppercase tracking-wider text-accent">
                {translateStage(locale, stage.stage)}
              </h3>
              <div className="flex min-h-[200px] flex-col justify-around gap-4">
                {fixtures.map((fixture) => (
                  <BracketMatchNode key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DragScrollArea>
  );
}
