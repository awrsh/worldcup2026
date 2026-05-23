"use client";

import { Globe } from "lucide-react";
import { LOCALES, LOCALE_CONFIG, type Locale } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";
import { useLocaleStore } from "@/lib/store/locale-store";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ className, compact }: LanguageSwitcherProps) {
  const { locale, t } = useTranslation();
  const setLocale = useLocaleStore((s) => s.setLocale);

  const handleChange = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn("flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1", className)}
    >
      {!compact && <Globe className="mx-1 h-4 w-4 text-muted-foreground" aria-hidden />}
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={locale === code}
        >
          {LOCALE_CONFIG[code].label}
        </button>
      ))}
    </div>
  );
}
