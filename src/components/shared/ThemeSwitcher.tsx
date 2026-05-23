"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";
import { useThemeStore } from "@/lib/store/theme-store";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function ThemeSwitcher({ className, compact }: ThemeSwitcherProps) {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        compact ? "h-8 w-8" : "gap-2 px-3 py-1.5 text-xs font-medium",
        className
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {!compact && <span>{isDark ? t("theme.light") : t("theme.dark")}</span>}
    </button>
  );
}
