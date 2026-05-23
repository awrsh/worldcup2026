"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Fixture } from "@/lib/api/types";
import { getTeamById } from "@/data/mock/teams";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Badge } from "@/components/ui/badge";
import { translateStage } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";

interface BracketMatchNodeProps {
  fixture: Fixture;
  compact?: boolean;
}

export function BracketMatchNode({ fixture, compact }: BracketMatchNodeProps) {
  const { t, locale } = useTranslation();
  const home = fixture.placeholder ? undefined : getTeamById(fixture.homeTeamId);
  const away = fixture.placeholder ? undefined : getTeamById(fixture.awayTeamId);
  const label = fixture.name ?? (fixture.stage ? translateStage(locale, fixture.stage) : t("common.tbd"));

  const content = (
    <div
      className={`glass-card-light w-full transition-all hover:ring-2 hover:ring-primary/30 ${
        compact ? "p-2 text-xs" : "p-3"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-1">
        <Badge variant="secondary" className="text-[10px]">
          {fixture.stage ? translateStage(locale, fixture.stage) : fixture.roundName}
        </Badge>
        {!compact && (
          <span className="text-[10px] text-muted-foreground">
            {format(parseISO(fixture.kickoffAt), "MMM d")}
          </span>
        )}
      </div>
      {fixture.placeholder ? (
        <p className="line-clamp-2 text-center text-xs text-muted-foreground">{label}</p>
      ) : (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <FlagAvatar code={home?.flagCode} fallback={home?.shortCode} size="sm" />
              <span className="truncate font-medium text-card-foreground">{home?.shortCode ?? t("common.tbd")}</span>
            </div>
            {fixture.state !== "not_started" && (
              <span className="font-bold text-card-foreground">{fixture.homeScore ?? t("common.dash")}</span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <FlagAvatar code={away?.flagCode} fallback={away?.shortCode} size="sm" />
              <span className="truncate font-medium text-card-foreground">{away?.shortCode ?? t("common.tbd")}</span>
            </div>
            {fixture.state !== "not_started" && (
              <span className="font-bold text-card-foreground">{fixture.awayScore ?? t("common.dash")}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (fixture.placeholder) {
    return <div className="w-44 sm:w-52">{content}</div>;
  }

  return (
    <Link href={`/matches/${fixture.id}`} className="block w-44 sm:w-52">
      {content}
    </Link>
  );
}
