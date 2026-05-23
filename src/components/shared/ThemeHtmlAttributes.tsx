"use client";

import { useEffect } from "react";
import { applyThemeClass, useThemeStore } from "@/lib/store/theme-store";

export function ThemeHtmlAttributes() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  return null;
}
