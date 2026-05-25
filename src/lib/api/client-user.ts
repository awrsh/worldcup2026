const STORAGE_KEY = "wc2026-client-user-id";

export function getClientUserId(): string {
  if (typeof window === "undefined") return "local-dev-user";

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `user-${Date.now()}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
