import type { AuthUser, ParsedAuthUser } from "./types";

type AuthLogPayload = {
  raw?: string | null;
  parsed?: ParsedAuthUser | AuthUser | null;
  error?: unknown;
  cookieNames?: string[];
  extra?: Record<string, unknown>;
};

export function logAuthDebug(context: string, payload: AuthLogPayload) {
  const { raw, parsed, error, cookieNames, extra } = payload;

  console.log("[auth]", context, {
    ...extra,
    hasRaw: Boolean(raw),
    rawLength: raw?.length ?? 0,
    rawPreview: raw ? raw.slice(0, 300) : null,
    parsed,
    parseError: error instanceof Error ? error.message : error ?? null,
    cookieNames,
  });
}

export function hasAuthIdentity(parsed: ParsedAuthUser): boolean {
  return Boolean(parsed.username) || Boolean(parsed.displayName.trim());
}
