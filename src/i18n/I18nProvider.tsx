"use client";

import { createContext, useContext, useMemo } from "react";
import {
  LOCALE_CONFIG,
  translate,
  type Locale,
  type TranslationParams,
} from "@/i18n";
import { useLocaleStore } from "@/lib/store/locale-store";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string, params?: TranslationParams) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);
  const config = LOCALE_CONFIG[locale];

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: config.dir,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale, config.dir]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}
