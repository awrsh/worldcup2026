import en from "./locales/en.json";
import fa from "./locales/fa.json";

export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_CONFIG: Record<
  Locale,
  { label: string; dir: "ltr" | "rtl"; htmlLang: string; flagCode: string }
> = {
  en: { label: "English", dir: "ltr", htmlLang: "en", flagCode: "US" },
  fa: { label: "فارسی", dir: "rtl", htmlLang: "fa", flagCode: "IR" },
};

const dictionaries: Record<Locale, typeof en> = { en, fa };

export type TranslationDictionary = typeof en;

export type TranslationParams = Record<string, string | number>;

const UNSAFE_OBJECT_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (
      UNSAFE_OBJECT_KEYS.has(key) ||
      current === null ||
      typeof current !== "object" ||
      !Object.hasOwn(current, key)
    ) {
      return undefined;
    }
    current = Reflect.get(current, key);
  }

  return typeof current === "string" ? current : undefined;
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value)),
    template
  );
}

export function translate(
  locale: Locale,
  key: string,
  params?: TranslationParams
): string {
  const value = getNestedValue(dictionaries[locale] as Record<string, unknown>, key);
  if (value === undefined) {
    const fallback = getNestedValue(dictionaries.en as Record<string, unknown>, key);
    if (fallback === undefined) return key;
    return interpolate(fallback, params);
  }
  return interpolate(value, params);
}

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export type StageKey = keyof TranslationDictionary["stages"];

export function translateStage(locale: Locale, stage: string): string {
  const key = `stages.${stage}`;
  const translated = translate(locale, key);
  return translated === key ? stage : translated;
}

export function translateFixtureBadge(
  locale: Locale,
  fixture: { state: string; groupId?: string; stage?: string; roundName?: string }
): string {
  if (fixture.state === "live") return translate(locale, "common.live");

  if (fixture.groupId) {
    return translate(locale, "common.group", { id: fixture.groupId });
  }

  if (fixture.roundName?.startsWith("Matchday")) {
    const day = fixture.roundName.replace("Matchday ", "");
    return translate(locale, "common.matchday", { day });
  }

  if (fixture.stage) {
    return translateStage(locale, fixture.stage);
  }

  return fixture.roundName ?? translate(locale, "common.tbd");
}
