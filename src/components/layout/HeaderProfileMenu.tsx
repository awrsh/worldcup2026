"use client";

import * as FlagIcons from "country-flag-icons/react/3x2";
import { Globe, Moon, Sun } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_CONFIG, type Locale } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";
import { useLocaleStore } from "@/lib/store/locale-store";
import { useThemeStore } from "@/lib/store/theme-store";
import { useUserStore } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";

function LocaleFlag({ code }: { code: Locale }) {
  const Flag = FlagIcons[LOCALE_CONFIG[code].flagCode as keyof typeof FlagIcons];

  return Flag ? (
    <Flag className="h-full w-full object-cover" aria-hidden />
  ) : (
    <span className="text-[10px] font-bold uppercase">{code}</span>
  );
}

export function HeaderProfileMenu() {
  const { t, locale } = useTranslation();
  const user = useUserStore((s) => s.user);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const setLocale = useLocaleStore((s) => s.setLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t("header.profileMenu")}
        >
          <UserAvatar
            className="h-8 w-8"
            name={user.username}
            initials={user.avatarInitials}
            avatarUrl={user.avatarUrl}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2 left-3 top-1 relative " >
        <div className="flex items-center justify-between gap-2 px-2 py-1.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{user.username}</p>
            <p className="text-xs text-muted-foreground">{t("header.yourPoints")}</p>
          </div>
          <Badge variant="gold" className="shrink-0">
            {user.totalPoints} {t("common.pts")}
          </Badge>
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuLabel className="px-2 pb-1.5 pt-0">{t("theme.label")}</DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-1 px-1 pb-1">
          {(["light", "dark"] as const).map((value) => {
            const isActive = theme === value;
            const Icon = value === "light" ? Sun : Moon;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(`theme.${value}`)}
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuLabel className="flex items-center gap-1.5 px-2 pb-1.5 pt-0">
          <Globe className="h-3.5 w-3.5" aria-hidden />
          {t("language.label")}
        </DropdownMenuLabel>
        <div className="flex gap-1 px-1 pb-1" role="group" aria-label={t("language.label")}>
          {LOCALES.map((code) => {
            const isActive = locale === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={cn(
                  "flex h-9 flex-1 items-center justify-center overflow-hidden rounded-lg border transition-colors",
                  isActive
                    ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                    : "border-border bg-secondary/40 hover:bg-secondary"
                )}
                aria-label={t(`language.${code}`)}
                aria-pressed={isActive}
                title={t(`language.${code}`)}
              >
                <span className="h-5 w-7 overflow-hidden rounded-sm">
                  <LocaleFlag code={code} />
                </span>
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
