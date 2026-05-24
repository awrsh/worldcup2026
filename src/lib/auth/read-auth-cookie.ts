export function readAuthUserCookieClient(): string | undefined {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie.match(/(?:^|;\s*)auth_user=([^;]*)/);
  if (!match?.[1]) return undefined;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
