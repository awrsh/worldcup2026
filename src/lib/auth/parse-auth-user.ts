import { logAuthDebug } from "./log-auth-debug";
import type { AuthUser, ParsedAuthUser } from "./types";

type LocalizedName = { en?: string; fa?: string };

type AuthUserPayload = {
  username?: string;
  email?: string;
  name?: LocalizedName[];
  lastname?: LocalizedName[];
  avatar?: string;
};

function pickLocalizedValue(items: LocalizedName[] | undefined): string {
  if (!items?.length) return "";
  return items.find((x) => x.fa)?.fa ?? items.find((x) => x.en)?.en ?? "";
}

export function parseAuthUser(authUser: string | null | undefined): ParsedAuthUser {
  const empty: ParsedAuthUser = { username: null, displayName: "", avatar: null };
  if (!authUser || typeof authUser !== "string") return empty;

  const trimmed = authUser.trim();
  if (!trimmed) return empty;

  try {
    const raw = trimmed.startsWith("%") ? decodeURIComponent(trimmed) : trimmed;
    const p = JSON.parse(raw) as AuthUserPayload;
    const first = pickLocalizedValue(p.name);
    const last = pickLocalizedValue(p.lastname);
    const displayName = `${first} ${last}`.trim();
    const username = p.username?.trim() || null;

    const result = {
      username,
      displayName,
      avatar: p.avatar ?? null,
    };

    logAuthDebug("parseAuthUser:ok", { raw: trimmed, parsed: result });
    return result;
  } catch (error) {
    logAuthDebug("parseAuthUser:error", { raw: trimmed, parsed: empty, error });
    return empty;
  }
}

export function parseAuthUserCookie(value: string | undefined): AuthUser | null {
  const parsed = parseAuthUser(value);
  const hasIdentity = Boolean(parsed.username) || Boolean(parsed.displayName.trim());

  if (!hasIdentity) {
    logAuthDebug("parseAuthUserCookie:empty", { raw: value, parsed });
    return null;
  }

  const id = parsed.username ?? parsed.displayName.trim();
  const authUser: AuthUser = {
    id,
    username: parsed.username,
    displayName: parsed.displayName.trim() || parsed.username || "User",
    avatar: parsed.avatar,
    email: undefined,
  };

  logAuthDebug("parseAuthUserCookie:ok", { raw: value, parsed: authUser });
  return authUser;
}
