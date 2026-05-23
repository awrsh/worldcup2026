import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "wc2026-locale",
    }
  )
);

export function getLocale(): Locale {
  const stored = useLocaleStore.getState().locale;
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}
