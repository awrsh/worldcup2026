"use client";

import { getNextUpcomingFixture } from "@/data/mock/fixtures";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useUserStore } from "@/lib/store/user-store";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { HeaderProfileMenu } from "@/components/layout/HeaderProfileMenu";
import { useTranslation } from "@/i18n/I18nProvider";

export function StickyTournamentHeader() {
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);
  const nextMatch = getNextUpcomingFixture();

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-11 items-center justify-between gap-2 px-3 sm:h-12 sm:gap-3 sm:px-4 lg:px-6">
        <div className="min-w-0 flex-1">
          <h1
            className="truncate text-sm font-semibold leading-tight text-foreground sm:text-base"
            title={`${t("header.tournamentTitle")} — ${t("header.hostNations")}`}
          >
            <span className="sm:hidden">{t("header.tournamentShort")}</span>
            <span className="hidden sm:inline">{t("header.tournamentTitle")}</span>
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          {nextMatch && (
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-[11px] text-muted-foreground">{t("header.nextMatch")}</span>
              <CountdownTimer targetDate={nextMatch.kickoffAt} compact />
            </div>
          )}

          <div className="hidden items-center gap-1.5 lg:flex">
            <ThemeSwitcher compact className="h-8 w-8" />
            <LanguageSwitcher compact className="p-0.5 [&_button]:px-2 [&_button]:text-xs" />
            <Badge variant="gold" className="h-7 px-2 text-xs">
              {user.totalPoints} {t("common.pts")}
            </Badge>
            <UserAvatar
              className="h-8 w-8"
              name={user.username}
              initials={user.avatarInitials}
              avatarUrl={user.avatarUrl}
            />
          </div>

          <div className="lg:hidden">
            <HeaderProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
