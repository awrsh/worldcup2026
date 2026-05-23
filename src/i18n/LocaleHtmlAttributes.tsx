"use client";

import { useEffect } from "react";
import { LOCALE_CONFIG } from "@/i18n";
import { useLocaleStore } from "@/lib/store/locale-store";

export function LocaleHtmlAttributes() {
  const locale = useLocaleStore((s) => s.locale);
  const config = LOCALE_CONFIG[locale];

  useEffect(() => {
    const html = document.documentElement;
    html.lang = config.htmlLang;
    html.dir = config.dir;
    html.classList.toggle("locale-fa", locale === "fa");
  }, [config.dir, config.htmlLang, locale]);

  return null;
}
